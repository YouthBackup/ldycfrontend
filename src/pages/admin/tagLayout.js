import jsPDF from "jspdf";

const tagImage = require("@/assets/images/Ignitetag.png");

export const TAG_IMAGE = tagImage;

// The artwork (1205 x 854 @ 300dpi) maps onto an A6 landscape page.
export const TAG_W = 148;
export const TAG_H = 105;

// Measured off the artwork pixels, in mm. Each `y` is a text baseline aligned
// with the printed label's own baseline (0.37mm above its rule, a constant the
// artwork holds on every row), so values sit on the line exactly like the
// labels do. `x` starts just after the label, `maxX` stops just short of the
// rule's end. `photo` is inset to sit inside the printed frame's stroke.
export const LAYOUT = {
  photo: { x: 5.4, y: 43.5, w: 39.6, h: 53.2 },
  name: { x: 66.7, y: 51.3, maxX: 139.9 },
  nameOverflow: { x: 51.6, y: 61.6, maxX: 140.4 },
  archdeaconry: { x: 85.6, y: 71.8, maxX: 141.0 },
  parish: { x: 67.4, y: 82.1, maxX: 140.6 },
  registrationCode: { x: 94.7, y: 92.5, maxX: 141.2 },
};

const NAME_SIZES = [13, 12, 11, 10, 9];
// The artwork gives names a second rule of their own, so a long name is better
// wrapped at a readable size than squeezed onto one line. Only a slight shrink
// is allowed before wrapping wins.
const SINGLE_LINE_SIZES = [13, 12];
const FIELD_SIZES = [11, 10, 9, 8];

// A throwaway document used only for text measurement, so the SVG preview and
// the PDF agree on where a name wraps.
let measureDoc = null;
function measurer() {
  if (!measureDoc) {
    measureDoc = new jsPDF({ unit: "mm", format: [TAG_W, TAG_H] });
  }
  return measureDoc;
}

function widthOf(text, font, style, size) {
  const doc = measurer();
  doc.setFont(font, style);
  doc.setFontSize(size);
  return doc.getTextWidth(text);
}

function removeEmojis(str) {
  return String(str ?? "").replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\u24C2|\uD83E[\uDD00-\uDDFF])/g,
    ""
  );
}

export function fullNameOf(user) {
  return [user.title, user.firstName, user.surname]
    .map((part) => removeEmojis(part).trim())
    .filter(Boolean)
    .join(" ");
}

// Greedily pack `words` into a line no wider than `maxWidth`, returning the
// consumed text and whatever is left over.
function packLine(words, maxWidth, size) {
  const taken = [];
  let rest = [...words];
  while (rest.length) {
    const candidate = [...taken, rest[0]].join(" ");
    if (taken.length && widthOf(candidate, "helvetica", "bold", size) > maxWidth) {
      break;
    }
    taken.push(rest.shift());
  }
  return { line: taken.join(" "), rest };
}

// Resolves a name into one or two positioned lines. Shrinks the type before it
// wraps, and wraps before it overflows the rule.
export function layoutName(user) {
  const name = fullNameOf(user);
  const one = LAYOUT.name;
  const two = LAYOUT.nameOverflow;
  const oneWidth = one.maxX - one.x;
  const twoWidth = two.maxX - two.x;

  if (!name) return [];

  for (const size of SINGLE_LINE_SIZES) {
    if (widthOf(name, "helvetica", "bold", size) <= oneWidth) {
      return [{ text: name, x: one.x, y: one.y, size }];
    }
  }

  const words = name.split(/\s+/);
  for (const size of NAME_SIZES) {
    const { line, rest } = packLine(words, oneWidth, size);
    const tail = rest.join(" ");
    if (line && (!tail || widthOf(tail, "helvetica", "bold", size) <= twoWidth)) {
      const lines = [{ text: line, x: one.x, y: one.y, size }];
      if (tail) lines.push({ text: tail, x: two.x, y: two.y, size });
      return lines;
    }
  }

  const size = NAME_SIZES[NAME_SIZES.length - 1];
  const { line, rest } = packLine(words, oneWidth, size);
  const lines = [{ text: line, x: one.x, y: one.y, size }];
  if (rest.length) {
    lines.push({ text: rest.join(" "), x: two.x, y: two.y, size });
  }
  return lines;
}

// Single-line fields shrink to fit; they never wrap.
export function layoutField(slot, value) {
  const text = removeEmojis(value).trim() || "N/A";
  const maxWidth = slot.maxX - slot.x;
  const size =
    FIELD_SIZES.find(
      (s) => widthOf(text, "helvetica", "normal", s) <= maxWidth
    ) ?? FIELD_SIZES[FIELD_SIZES.length - 1];
  return { text, x: slot.x, y: slot.y, size };
}

export function layoutTag(user) {
  return {
    name: layoutName(user),
    fields: [
      layoutField(LAYOUT.archdeaconry, user.archdeaconry),
      layoutField(LAYOUT.parish, user.parish),
      layoutField(LAYOUT.registrationCode, user.registrationCode),
    ],
  };
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load image: ${src}`));
    img.src = src;
  });
}

// Scales and centre-crops to fill `w` x `h` mm, the way `object-fit: cover` would.
async function coverCrop(src, w, h) {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  const pxPerMm = 300 / 25.4; // render at print resolution
  canvas.width = Math.round(w * pxPerMm);
  canvas.height = Math.round(h * pxPerMm);

  const target = w / h;
  const source = img.width / img.height;
  let sw, sh;
  if (source > target) {
    sh = img.height;
    sw = img.height * target;
  } else {
    sw = img.width;
    sh = img.width / target;
  }
  const sx = (img.width - sw) / 2;
  const sy = (img.height - sh) / 2;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.92);
}

let backgroundPromise = null;
export function loadTagBackground() {
  if (!backgroundPromise) {
    backgroundPromise = loadImage(TAG_IMAGE).catch((err) => {
      backgroundPromise = null;
      throw err;
    });
  }
  return backgroundPromise;
}

// Resolves each user's photo up front so a single unreachable image can't take
// down the whole batch. A missing photo leaves the printed box empty.
export async function preparePhotos(users, onProgress) {
  const results = new Map();
  const failures = [];
  const batchSize = 5;

  for (let i = 0; i < users.length; i += batchSize) {
    const batch = users.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (user) => {
        if (!user.photoUrl) {
          failures.push({ user, reason: "No photo on file" });
          return;
        }
        try {
          results.set(
            user._id,
            await coverCrop(user.photoUrl, LAYOUT.photo.w, LAYOUT.photo.h)
          );
        } catch (err) {
          failures.push({ user, reason: err.message });
        }
      })
    );
    onProgress?.(Math.min(i + batchSize, users.length), users.length);
  }

  return { photos: results, failures };
}

// Draws one tag with its top-left corner at (ox, oy) on the current page.
export function drawTag(doc, user, background, photo, ox = 0, oy = 0) {
  doc.addImage(background, "PNG", ox, oy, TAG_W, TAG_H);

  if (photo) {
    const { x, y, w, h } = LAYOUT.photo;
    doc.addImage(photo, "JPEG", ox + x, oy + y, w, h);
  }

  const { name, fields } = layoutTag(user);

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  for (const line of name) {
    doc.setFontSize(line.size);
    doc.text(line.text, ox + line.x, oy + line.y);
  }

  doc.setFont("helvetica", "normal");
  for (const field of fields) {
    doc.setFontSize(field.size);
    doc.text(field.text, ox + field.x, oy + field.y);
  }
}

export function newSingleDoc() {
  return new jsPDF({ orientation: "landscape", unit: "mm", format: [TAG_W, TAG_H] });
}

// One A6 tag per page, so each sheet comes off the printer as a finished card.
export function buildBatch(users, background, photos) {
  const doc = newSingleDoc();

  users.forEach((user, index) => {
    if (index > 0) {
      doc.addPage([TAG_W, TAG_H], "landscape");
    }
    drawTag(doc, user, background, photos.get(user._id));
  });

  return doc;
}
