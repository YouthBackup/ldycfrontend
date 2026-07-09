<template>
  <div class="px-4 sm:px-6 lg:px-8 py-6">
    <!-- Filters Section -->
    <div class="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
      <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
        Filters
      </h3>
      <div
        class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
      >
        <!-- User Type Filter -->
        <div>
          <label
            for="userType"
            class="block text-sm font-medium text-gray-700 mb-1"
          >User Type</label>
          <select
            id="userType"
            v-model="filters.userType"
            class="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          >
            <option value="">
              All Types
            </option>
            <option value="camper">
              Camper
            </option>
            <option value="chaplain">
              Chaplain
            </option>
          </select>
        </div>

        <!-- Status Filter -->
        <div>
          <label
            for="status"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Status</label>
          <select
            id="status"
            v-model="filters.status"
            class="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          >
            <option value="">
              All Statuses
            </option>
            <option value="registered">
              Registered
            </option>
            <option value="passed">
              Passed
            </option>
            <option value="stopped">
              Stopped
            </option>
          </select>
        </div>

        <!-- Archdeaconry Filter -->
        <div>
          <label
            for="archdeaconry"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Archdeaconry</label>
          <select
            id="archdeaconry"
            v-model="filters.archdeaconry"
            class="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          >
            <option value="">
              All Archdeaconries
            </option>
            <option
              v-for="arch in archdeaconries"
              :key="arch"
              :value="arch"
            >
              {{ arch }}
            </option>
          </select>
        </div>
      </div>
      <!-- Bulk Download Button -->
      <div class="mt-3 sm:mt-4 flex justify-end">
        <button
          class="bg-indigo-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium w-full xs:w-auto"
          :disabled="selectedUsers.length === 0"
          @click="downloadBulkPDF"
        >
          Download Selected ID Cards ({{ selectedUsers.length }})
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-12"
            >
              <input
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                :checked="isAllSelected"
                aria-label="Select all participants"
                @change="toggleSelectAll"
              >
            </th>
            <th
              class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell"
            >
              Email
            </th>
            <th
              class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell"
            >
              Phone
            </th>
            <th
              class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell"
            >
              Reg. Code
            </th>
            <th
              class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Payment Status
            </th>
            <th
              class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="user in participants"
            :key="user._id"
            class="hover:bg-gray-50 transition-colors duration-150"
          >
            <td class="px-3 py-3 whitespace-nowrap w-12">
              <input
                v-model="selectedUsers"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                :value="user"
                aria-label="Select participant"
              >
            </td>
            <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
              {{ user.title }} {{ user.firstName }} {{ user.surname }}
            </td>
            <td
              class="px-3 py-3 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell"
            >
              {{ user.email }}
            </td>
            <td
              class="px-3 py-3 whitespace-nowrap text-sm text-gray-600 hidden xl:table-cell"
            >
              {{ user.phoneNumber }}
            </td>
            <td
              class="px-3 py-3 whitespace-nowrap text-sm text-gray-600 hidden xl:table-cell"
            >
              {{ user.registrationCode }}
            </td>
            <td class="px-3 py-3 whitespace-nowrap">
              <span
                :class="{
                  'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium capitalize':
                    user.paymentStatus.toLowerCase() === 'pending',
                  'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium capitalize':
                    user.paymentStatus.toLowerCase() !== 'pending',
                }"
              >
                {{ user.paymentStatus }}
              </span>
            </td>
            <td class="px-3 py-3 whitespace-nowrap">
              <button
                class="bg-blue-600 text-white px-2 sm:px-4 py-1.5 rounded-md hover:bg-blue-700 text-sm font-medium transition-colors duration-200 w-full"
                @click="openModal(user)"
              >
                Print ID Card
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      class="flex flex-col sm:flex-row justify-between items-center mt-6 p-3 bg-white shadow-lg rounded-lg"
    >
      <button
        class="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium w-full xs:w-auto mb-3 sm:mb-0"
        :disabled="currentPage === 1"
        @click="updatePage(currentPage - 1)"
      >
        Previous
      </button>

      <div class="flex items-center gap-1 flex-wrap justify-center">
        <!-- Show first page -->
        <button
          v-if="totalPages > 1"
          class="px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200"
          :class="
            currentPage === 1
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="updatePage(1)"
        >
          1
        </button>

        <!-- Show ellipsis if needed -->
        <span
          v-if="currentPage > 4"
          class="text-gray-500 text-sm"
        >...</span>

        <!-- Show page numbers around current page -->
        <button
          v-for="page in pageRange"
          :key="page"
          class="px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200"
          :class="
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="updatePage(page)"
        >
          {{ page }}
        </button>

        <!-- Show ellipsis if needed -->
        <span
          v-if="currentPage < totalPages - 3"
          class="text-gray-500 text-sm"
        >...</span>

        <!-- Show last page -->
        <button
          v-if="totalPages > 1 && totalPages !== currentPage"
          class="px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200"
          :class="
            currentPage === totalPages
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="updatePage(totalPages)"
        >
          {{ totalPages }}
        </button>
      </div>

      <button
        class="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium w-full xs:w-auto mt-3 sm:mt-0"
        :disabled="currentPage === totalPages"
        @click="updatePage(currentPage + 1)"
      >
        Next
      </button>
    </div>

    <!-- Loading Overlay -->
    <transition name="fade">
      <div
        v-if="isLoading || isGenerating"
        class="flex items-center justify-center space-x-3 text-gray-600 fixed inset-0 bg-black bg-opacity-30"
      >
        <svg
          class="animate-spin h-8 w-8 text-teal-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
          />
        </svg>
        <span class="text-lg font-medium text-white">
          {{ isGenerating ? "Generating PDF..." : "Loading..." }}
        </span>
      </div>
    </transition>

    <!-- Modal -->
    <div
      v-if="selectedUser"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 px-4 sm:px-0"
    >
      <div
        class="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg relative transform transition-all duration-300 scale-100"
      >
        <button
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Close modal"
          @click="selectedUser = null"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
          ID Card Preview
        </h3>

        <div class="text-sm text-gray-600 space-y-2 sm:space-y-3 mb-6 sm:mb-8">
          <p class="text-base sm:text-lg">
            <strong class="font-medium text-gray-900">Name:</strong>
            {{ selectedUser.title }} {{ selectedUser.firstName }}
            {{ selectedUser.surname }}
          </p>
          <p class="text-base sm:text-lg">
            <strong class="font-medium text-gray-900">Email:</strong>
            {{ selectedUser.email }}
          </p>
          <p class="text-base sm:text-lg">
            <strong class="font-medium text-gray-900">Phone:</strong>
            {{ selectedUser.phoneNumber }}
          </p>
          <p class="text-base sm:text-lg">
            <strong class="font-medium text-gray-900">Reg Code:</strong>
            {{ selectedUser.registrationCode }}
          </p>
          <p class="text-base sm:text-lg">
            <strong class="font-medium text-gray-900">Archdeaconry:</strong>
            {{ selectedUser.archdeaconry }}
          </p>
          <p class="text-base sm:text-lg">
            <strong class="font-medium text-gray-900">Parish:</strong>
            {{ selectedUser.parish || "N/A" }}
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3">
          <button
            class="w-full bg-white text-black border border-blue-600 hover:text-white px-3 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            @click="
              router.push(`/admin/verify/participant/${selectedUser._id}`)
            "
          >
            View Participant
          </button>
          <button
            class="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            @click="downloadPDF(selectedUser)"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import jsPDF from "jspdf";
// import backgroundImage from "../../assets/images/tag.png"; // TODO: tag.png is missing, needs replacement
const backgroundImage = require('../../assets/images/doylogo.png'); // placeholder
import archdeaconryData from "@/assets/data/archdeaconries.json";
import useParticipants from "./useParticipants";
import { useRouter } from "vue-router";

const router = useRouter();

// Composable for participants
const {
  participants,
  isLoading,
  currentPage,
  filters,
  getParticipants,
  totalPages,
} = useParticipants();

const archdeaconries = ref([]);
const hasMoreData = ref(true);
const selectedUser = ref(null);
const isGenerating = ref(false);
const error = ref(null);
const selectedUsers = ref([]);

// Computed property to check if all visible participants are selected
const isAllSelected = computed(() => {
  return (
    participants.value.length > 0 &&
    selectedUsers.value.length === participants.value.length
  );
});

// Toggle select all participants
function toggleSelectAll(event) {
  if (event.target.checked) {
    selectedUsers.value = [...participants.value];
  } else {
    selectedUsers.value = [];
  }
}

// Pagination control
function updatePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    getParticipants();
  }
}

const pageRange = computed(() => {
  const range = [];
  const start = Math.max(2, currentPage.value - 2);
  const end = Math.min(totalPages.value - 1, currentPage.value + 2);
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
});

function openModal(user) {
  selectedUser.value = user;
}

// Helper function to resize and crop image like object-fit: cover
async function resizeAndCropImage(imageUrl, targetWidth, targetHeight) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Handle CORS if needed
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas to target dimensions (in pixels, converted from mm)
      const dpr = window.devicePixelRatio || 1; // Adjust for device pixel ratio
      canvas.width = targetWidth * 3.78 * dpr; // Convert mm to pixels (1 mm ≈ 3.78 pixels at 96 DPI)
      canvas.height = targetHeight * 3.78 * dpr;

      // Calculate scaling to cover the target area
      const imgAspect = img.width / img.height;
      const canvasAspect = targetWidth / targetHeight;
      let sx, sy, sWidth, sHeight;

      if (imgAspect > canvasAspect) {
        // Image is wider than canvas: scale by height, crop width
        sHeight = img.height;
        sWidth = img.height * canvasAspect;
        sx = (img.width - sWidth) / 2; // Center crop
        sy = 0;
      } else {
        // Image is taller than canvas: scale by width, crop height
        sWidth = img.width;
        sHeight = img.width / canvasAspect;
        sx = 0;
        sy = (img.height - sHeight) / 2; // Center crop
      }

      // Draw cropped image to canvas
      ctx.drawImage(
        img,
        sx,
        sy,
        sWidth,
        sHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Convert canvas to base64
      resolve(canvas.toDataURL("image/jpeg", 0.9)); // 0.9 quality to balance size and quality
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

// Helper function to convert blob to base64
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Helper function to remove emojis from name
function removeEmojis(str) {
  return str.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\u24C2|\uD83E[\uDD00-\uDDFF])/g,
    ""
  );
}

async function downloadPDF(user) {
  isGenerating.value = true;
  error.value = null;

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [148, 105], // A6 size
  });

  try {
    // Load background image
    let bgBase64;
    try {
      const bgRes = await fetch(backgroundImage);
      if (!bgRes.ok) throw new Error("Failed to load background image");
      const bgBlob = await bgRes.blob();
      bgBase64 = await blobToBase64(bgBlob);
    } catch (bgError) {
      throw new Error("Error loading background image: " + bgError.message);
    }

    // Load and resize user passport photo
    let passportBase64;
    try {
      passportBase64 = await resizeAndCropImage(user.photoUrl, 40, 50); // Target 40x50 mm
    } catch (photoError) {
      throw new Error(
        `Error processing passport photo for ${user.registrationCode}: ${photoError.message}`
      );
    }

    // Draw the ID card layout
    doc.addImage(bgBase64, "PNG", 0, 0, 148, 105); // Full background
    doc.addImage(passportBase64, "JPEG", 5, 47, 40, 50); // Passport photo

    // Dynamic user text
    doc.setFont("helvetica", "medium");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `${user.title || ""} ${removeEmojis(
        user.firstName || ""
      ).trim()} ${removeEmojis(user.surname || "").trim()}`,
      68,
      57
    );
    doc.setFontSize(12);
    doc.text(`${user.archdeaconry || "N/A"}`, 88, 76);
    doc.text(`${user.parish || "N/A"}`, 68, 85);
    doc.text(`${user.registrationCode || "N/A"}`, 95, 94);

    // Download
    doc.save(`IDCard-${user.registrationCode || "unknown"}.pdf`);
    selectedUser.value = null; // Close modal after download
  } catch (error) {
    error.value = error.message;
    console.error("PDF generation failed:", error);
  } finally {
    isGenerating.value = false;
  }
}

async function downloadBulkPDF() {
  if (selectedUsers.value.length === 0) return;

  isGenerating.value = true;
  error.value = null;

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [148, 105], // A6 size
  });

  try {
    // Load background image once
    let bgBase64;
    try {
      const bgRes = await fetch(backgroundImage);
      if (!bgRes.ok) throw new Error("Failed to load background image");
      const bgBlob = await bgRes.blob();
      bgBase64 = await blobToBase64(bgBlob);
    } catch (bgError) {
      throw new Error("Error loading background image: " + bgError.message);
    }

    // Generate ID card for each selected user
    for (let index = 0; index < selectedUsers.value.length; index++) {
      const user = selectedUsers.value[index];

      if (index > 0) {
        doc.addPage([148, 105], "landscape");
      }

      // Load and resize user passport photo
      let passportBase64;
      try {
        passportBase64 = await resizeAndCropImage(user.photoUrl, 40, 50); // Target 40x50 mm
      } catch (photoError) {
        throw new Error(
          `Error processing passport photo for ${user.registrationCode}: ${photoError.message}`
        );
      }

      // Draw the ID card layout
      doc.addImage(bgBase64, "PNG", 0, 0, 148, 105); // Full background
      doc.addImage(passportBase64, "JPEG", 5, 47, 40, 50); // Passport photo

      // Dynamic user text
      doc.setFont("helvetica", "medium");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(
        `${user.title || ""} ${removeEmojis(user.firstName)} ${removeEmojis(
          user.surname
        )}`,
        68,
        57
      );
      doc.setFontSize(12);
      doc.text(`${user.archdeaconry || "N/A"}`, 88, 76);
      doc.text(`${user.parish || "N/A"}`, 68, 85);
      doc.text(`${user.registrationCode || "N/A"}`, 95, 94);
    }

    // Download
    doc.save(`IDCards-Bulk-${new Date().toISOString().split("T")[0]}.pdf`);
    selectedUsers.value = []; // Clear selection after download
  } catch (error) {
    error.value = error.message;
    console.error("Bulk PDF generation failed:", error);
  } finally {
    isGenerating.value = false;
  }
}

// Watch for changes in participants to update hasMoreData
watch(participants, (newData) => {
  hasMoreData.value = newData.length > 0;
});

// Watch for filter changes to refetch and clear selection
watch(
  filters,
  () => {
    currentPage.value = 1;
    selectedUsers.value = []; // Clear selection on filter change
    getParticipants();
  },
  { deep: true }
);

// Watch for page changes to clear selection
watch(currentPage, () => {
  selectedUsers.value = []; // Clear selection on page change
});

onMounted(() => {
  archdeaconries.value = [
    ...archdeaconryData.map((item) => item.archdeaconry),
    "Other Denominations",
  ];
  getParticipants();
});
</script>

<style scoped>
.loader {
  border-top-color: #4f46e5; /* Tailwind indigo-600 */
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Ensure table cells are readable on small screens */
@media (max-width: 640px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  thead,
  tbody,
  tr,
  td,
  th {
    display: table-cell;
  }
}

/* Adjust modal for small screens */
@media (max-width: 640px) {
  .max-w-md {
    max-width: 90%;
  }
}

/* Improve touch targets for buttons and checkboxes */
button,
input[type="checkbox"] {
  min-height: 40px;
  touch-action: manipulation;
}
</style>
