<template>
  <!-- The viewBox is the tag in millimetres, so every coordinate below is the
       same number the PDF renderer uses. -->
  <svg
    :viewBox="`0 0 ${TAG_W} ${TAG_H}`"
    class="block w-full h-auto rounded-md ring-1 ring-gray-200 bg-white"
    font-family="Helvetica, Arial, sans-serif"
  >
    <image
      :href="TAG_IMAGE"
      x="0"
      y="0"
      :width="TAG_W"
      :height="TAG_H"
    />

    <image
      v-if="user.photoUrl"
      :href="user.photoUrl"
      :x="LAYOUT.photo.x"
      :y="LAYOUT.photo.y"
      :width="LAYOUT.photo.w"
      :height="LAYOUT.photo.h"
      preserveAspectRatio="xMidYMid slice"
    />
    <text
      v-else
      :x="LAYOUT.photo.x + LAYOUT.photo.w / 2"
      :y="LAYOUT.photo.y + LAYOUT.photo.h / 2"
      text-anchor="middle"
      font-size="3.5"
      fill="#9ca3af"
    >
      No photo
    </text>

    <text
      v-for="(line, index) in layout.name"
      :key="`name-${index}`"
      :x="line.x"
      :y="line.y"
      :font-size="ptToMm(line.size)"
      font-weight="bold"
      fill="#000"
    >
      {{ line.text }}
    </text>

    <text
      v-for="field in layout.fields"
      :key="`field-${field.y}`"
      :x="field.x"
      :y="field.y"
      :font-size="ptToMm(field.size)"
      fill="#000"
    >
      {{ field.text }}
    </text>
  </svg>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { TAG_IMAGE, TAG_W, TAG_H, LAYOUT, layoutTag } from "./tagLayout";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const layout = computed(() => layoutTag(props.user));

// SVG user units are millimetres here; jsPDF sizes text in points.
function ptToMm(pt) {
  return pt * (25.4 / 72);
}
</script>
