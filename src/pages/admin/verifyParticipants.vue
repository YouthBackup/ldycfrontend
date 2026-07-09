<template>
  <div class="px-4 sm:px-6 lg:px-8 py-6 container mx-auto">
    <!-- Filters -->
    <div class="flex flex-wrap justify-start gap-4 mb-6">
      <!-- User Type Filter -->
      <div class="w-full xs:w-1/2 sm:w-1/3 md:w-1/4">
        <label class="block text-sm font-medium text-gray-700 mb-1">User Type</label>
        <select
          v-model="filters.userType"
          class="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
      <div class="w-full xs:w-1/2 sm:w-1/3 md:w-1/4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          v-model="filters.status"
          class="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
      <div class="w-full xs:w-1/2 sm:w-1/3 md:w-1/4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Archdeaconry</label>
        <select
          v-model="filters.archdeaconry"
          class="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
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
              class="px-3 py-2 text-left text-xsını
System: font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell"
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
                class="bg-green-600 text-white px-2 sm:px-3 py-1.5 rounded-md hover:bg-green-700 text-xs font-medium transition-colors duration-200 w-full"
                @click="openModal(user._id)"
              >
                View Participant
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
        v-if="isLoading"
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
        <span class="text-lg font-medium text-white">Loading...</span>
      </div>
    </transition>

    <!-- Modal -->
    <verify-participant-modal
      v-if="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { onMounted, watch, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import archdeaconryData from "@/assets/data/archdeaconries.json";
import useParticipants from "./useParticipants";
import verifyParticipantModal from "./verifyParticipantModal.vue";

const router = useRouter();
const route = useRoute();

// Composable for participants
const {
  participants,
  isLoading,
  currentPage,
  filters,
  getParticipants,
  totalPages,
} = useParticipants();

// Load archdeaconries
const archdeaconries = ref([]);
const hasMoreData = ref(true);
const isModalOpen = ref(false);

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

function openModal(participantId) {
  isModalOpen.value = true;
  router.push(`/admin/verify/participant/${participantId}`);
}

function closeModal() {
  isModalOpen.value = false;
  router.push("/admin/verify/participant");
}

// Handle route-based modal state
onMounted(() => {
  archdeaconries.value = [
    ...archdeaconryData.map((item) => item.archdeaconry),
    "Other Denominations",
  ];
  getParticipants();

  // Check if the route contains a participant ID (e.g., from QR code scan)
  if (route.params.id) {
    isModalOpen.value = true;
  }
});

// Watch for route changes to handle modal state
watch(
  () => route.params.id,
  (newId) => {
    isModalOpen.value = !!newId; // Open modal if ID exists, close if it doesn't
  }
);

// Watch for filter changes to refetch
watch(
  filters,
  () => {
    currentPage.value = 1; // Reset to first page on filter change
    getParticipants();
  },
  { deep: true }
);

// Watch for changes in participants to update hasMoreData
watch(participants, (newData) => {
  hasMoreData.value = newData.length > 0;
});
</script>

<style scoped>
.loader {
  border-top-color: #3b82f6; /* Tailwind blue-600 */
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

/* Improve touch targets for buttons */
button {
  min-height: 40px;
  touch-action: manipulation;
}
</style>