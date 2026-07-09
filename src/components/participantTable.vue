<template>
  <div class="overflow-x-auto mt-10 px-4">
    <div class="flex flex-wrap justify-end gap-4 mb-6">
      <!-- User Type Filter -->
      <div class="w-full sm:w-auto">
        <select
          id="userType"
          v-model="localFilters.userType"
          class="w-full sm:w-48 h-10 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
      <div class="w-full sm:w-auto">
        <select
          id="status"
          v-model="localFilters.status"
          class="w-full sm:w-48 h-10 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
      <div class="w-full sm:w-auto">
        <select
          id="archdeaconry"
          v-model="localFilters.archdeaconry"
          class="w-full sm:w-48 h-10 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        >
          <option
            disabled
            value=""
          >
            Select Archdeaconry
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

    <table class="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell"
          >
            Email
          </th>
          <th
            class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell"
          >
            Phone
          </th>
          <th
            class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell"
          >
            Reg Code
          </th>
          <th
            class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
          >
            Payment Status
          </th>
          <th
            class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(user, index) in users"
          :key="index"
          class="hover:bg-gray-50 transition-colors duration-150"
        >
          <td class="px-6 py-4 text-sm text-gray-900">
            {{ user.title }} {{ user.firstName }} {{ user.surname }}
          </td>
          <td class="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">
            {{ user.email }}
          </td>
          <td class="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
            {{ user.phoneNumber }}
          </td>
          <td class="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
            {{ user.registrationCode }}
          </td>
          <td class="px-6 py-4 text-sm capitalize text-gray-600">
            <span
              :class="{
                'text-yellow-500 bg-yellow-400/10 px-2 py-1 rounded-full':
                  user.paymentStatus.toLowerCase() === 'pending',
                'text-green-600 bg-green-100 px-2 py-1 rounded-full':
                  user.paymentStatus.toLowerCase() !== 'pending',
              }"
            >
              {{ user.paymentStatus }}
            </span>
          </td>
          <td class="px-6 py-4 flex flex-wrap gap-2">
            <button
              class="bg-green-500 text-white px-4 py-1.5 rounded-md hover:bg-green-600 text-sm font-medium transition-colors duration-200"
              @click="confirmPayment(user)"
            >
              Confirm Payment
            </button>
            <!-- <button
              class="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 text-sm font-medium transition-colors duration-200"
              @click="openModal(user)"
            >
              Print ID Card
            </button> -->
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Pagination Controls -->
    <div
      class="flex justify-between items-center mt-6 p-4 bg-white shadow-md rounded-lg"
    >
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
        :disabled="currentPage === 1"
        @click="emit('update-page', currentPage - 1)"
      >
        Previous
      </button>

      <div class="flex items-center gap-2">
        <!-- Show first page -->
        <button
          v-if="totalPages > 1"
          class="px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
          :class="
            currentPage === 1
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="emit('update-page', 1)"
        >
          1
        </button>

        <!-- Show ellipsis if needed -->
        <span
          v-if="currentPage > 4"
          class="text-gray-500"
        >...</span>

        <!-- Show page numbers around current page -->
        <button
          v-for="page in pageRange"
          :key="page"
          class="px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
          :class="
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="emit('update-page', page)"
        >
          {{ page }}
        </button>

        <!-- Show ellipsis if needed -->
        <span
          v-if="currentPage < totalPages - 3"
          class="text-gray-500"
        >...</span>

        <!-- Show last page -->
        <button
          v-if="totalPages > 1 && totalPages !== currentPage"
          class="px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
          :class="
            currentPage === totalPages
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          @click="emit('update-page', totalPages)"
        >
          {{ totalPages }}
        </button>
      </div>

      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
        :disabled="currentPage === totalPages"
        @click="emit('update-page', currentPage + 1)"
      >
        Next
      </button>
    </div>

    <!-- Modal -->
    <div
      v-if="selectedUser"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
    >
      <div
        class="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full relative transform transition-all duration-300 scale-100 sm:scale-95"
      >
        <button
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          @click="selectedUser = null"
        >
          <svg
            class="w-6 h-6"
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
        <h3 class="text-xl font-semibold text-gray-800 mb-6">
          ID Card Preview
        </h3>

        <div class="text-sm text-gray-600 space-y-3 mb-8">
          <p class="capitalize text-lg">
            <strong class="font-medium text-gray-900">Name:</strong>
            {{ selectedUser.title }} {{ selectedUser.firstName }}
            {{ selectedUser.surname }}
          </p>
          <p class="text-lg">
            <strong class="font-medium text-gray-900">Email:</strong>
            {{ selectedUser.email }}
          </p>
          <p class="text-lg">
            <strong class="font-medium text-gray-900">Phone:</strong>
            {{ selectedUser.phoneNumber }}
          </p>
          <p class="text-lg">
            <strong class="font-medium text-gray-900">Reg Code:</strong>
            {{ selectedUser.registrationCode }}
          </p>
          <p class="text-lg">
            <strong class="font-medium text-gray-900">Archdeaconry:</strong>
            {{ selectedUser.archdeaconry }}
          </p>
          <p class="text-lg">
            <strong class="font-medium text-gray-900">Parish:</strong>
            {{ selectedUser.parish }}
          </p>
        </div>

        <button
          class="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          @click="downloadPDF(selectedUser)"
        >
          Download PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, defineEmits, watch, onMounted } from "vue";
import jsPDF from "jspdf";
// import backgroundImage from "../assets/images/tag.png"; // TODO: tag.png is missing, needs replacement
const backgroundImage = require('../assets/images/doylogo.png'); // placeholder
import { useStore } from "vuex";
import debounce from "lodash.debounce";
import archdeaconryData from "@/assets/data/archdeaconries.json";

const store = useStore();

const props = defineProps({
  users: {
    type: Array,
    default: () => [],
  },
  currentPage: {
    type: Number,
    default: () => 1,
  },
});
const emit = defineEmits(["update-page", "update-search", "update-filters"]);
const debouncedEmitSearch = debounce((val) => {
  emit("update-search", val);
}, 500);

const selectedUser = ref(null);
const isGenerating = ref(false);
const error = ref(null);
const searchInput = ref("");
const archdeaconries = ref("");

const localFilters = ref({
  userType: "",
  archdeaconry: "",
  status: "",
});

// const itemsPerPage = computed(() => props.users.pagination?.limit);
const users = computed(() => props.users?.data);
const totalPages = computed(() => props.users.pagination?.pages);
const currentPage = computed(() => props.currentPage);
const pageRange = computed(() => {
  const range = [];
  const start = Math.max(2, currentPage.value - 2);
  const end = Math.min(totalPages.value - 1, currentPage.value + 2);
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
});

// const filteredUsers = computed(() => {
//   if (!searchQuery.value.trim()) return props.users?.data;
//   const query = searchQuery.value.toLowerCase();
//   return props.users?.data.filter((user) => {
//     const name =
//       `${user.title} ${user.firstName} ${user.surname}`.toLowerCase();
//     return (
//       name.includes(query) ||
//       user.email?.toLowerCase().includes(query) ||
//       user.phoneNumber?.toLowerCase().includes(query) ||
//       user.registrationCode?.toLowerCase().includes(query)
//     );
//   });
// });

async function confirmPayment(user) {
  console.log("Confirming payment for:", user);
  const res = await store.dispatch("confirmParticipantPayment", user._id);
  console.log(res);
}

// function openModal(user) {
//   selectedUser.value = user;
// }

async function downloadPDF(user) {
  isGenerating.value = true;
  error.value = null;

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [148, 105], // A6 size, adjust if your tags.pdf has different dimensions
  });

  try {
    // 1. Load background image
    let bgBase64;
    try {
      const bgRes = await fetch(backgroundImage);
      if (!bgRes.ok) throw new Error("Failed to load background image");
      const bgBlob = await bgRes.blob();
      bgBase64 = await blobToBase64(bgBlob);
    } catch (bgError) {
      throw new Error("Error loading background image: " + bgError.message);
    }

    // 2. Load user passport photo
    let passportBase64;
    try {
      const passportRes = await fetch(user.photoUrl);
      if (!passportRes.ok) throw new Error("Failed to load passport photo");
      const passportBlob = await passportRes.blob();
      passportBase64 = await blobToBase64(passportBlob);
    } catch (photoError) {
      throw new Error("Error loading passport photo: " + photoError.message);
    }

    // const roundedPassportBase64 = await createRoundedImage(passportBase64, 43, 75, 6);
    // 3. Draw the ID card layout
    doc.addImage(bgBase64, "PNG", 0, 0, 148, 105); // Full background
    //first number push right, second number push down, third number is width, last number is height
    doc.addImage(passportBase64, "JPEG", 5, 47, 40, 50); // Passport photo (adjust position/size)

    // 4. Dynamic user text
    doc.setFont("helvetica", "medium");
    doc.setFontSize(14); // Adjusted for A6 size
    doc.setTextColor(0, 0, 0); // Black

    // Adjust coordinates to match your template
    doc.text(`${user.title || ""} ${user.firstName} ${user.surname}`, 68, 57);
    doc.setFontSize(12);
    doc.text(`${user.archdeaconry || "N/A"}`, 88, 76);
    doc.text(`${user.parish || "N/A"}`, 68, 85);
    doc.text(`${user.registrationCode || "N/A"}`, 95, 94);

    // 5. Download
    doc.save(`IDCard-${user.registrationCode || "unknown"}.pdf`);
  } catch (error) {
    error.value = error.message;
    console.error("PDF generation failed:", error);
  } finally {
    isGenerating.value = false;
  }
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

watch(searchInput, (newVal) => {
  debouncedEmitSearch(newVal);
});
// Watch filters and emit immediately (or debounce if preferred)
watch(
  localFilters,
  (newFilters) => {
    emit("update-filters", { ...newFilters });
  },
  { deep: true }
);

onMounted(() => {
  archdeaconries.value = archdeaconryData.map((item) => item.archdeaconry);
});
</script>
