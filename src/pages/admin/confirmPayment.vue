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
                class="bg-green-600 text-white px-2 py-1.5 rounded-md hover:bg-green-700 text-xs font-medium transition-colors duration-200 w-full"
                @click="openModal(user)"
              >
                Confirm Payment
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
          Participant Preview
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
            {{ selectedUser.parish || 'N/A' }}
          </p>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-3">
          <button
            class="w-full bg-white text-black border border-blue-600 hover:text-white px-3 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            @click="router.push(`/admin/verify/participant/${selectedUser._id}`)"
          >
            View Participant
          </button>
          <button
            class="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            @click="confirmPayment(selectedUser._id)"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref, computed } from "vue";
import archdeaconryData from "@/assets/data/archdeaconries.json";
import useParticipants from "./useParticipants";
import { useStore } from "vuex";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";

const store = useStore();
const toast = useToast();
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

// Load archdeaconries
const archdeaconries = ref([]);
const hasMoreData = ref(true);
const selectedUser = ref(null);

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

// Confirm payment handler
async function confirmPayment(id) {
  try {
    await store.dispatch("confirmParticipantPayment", id);
    toast.success("Payment Verified", {
      position: "top-right",
      duration: 5000,
    });
    getParticipants();
    selectedUser.value = null; // Close modal after confirmation
  } catch (error) {
    console.error("Failed to confirm payment:", error);
    toast.error(
      error.response?.data?.message || "Failed to confirm payment. Please try again.",
      {
        position: "top-right",
        duration: 5000,
      }
    );
  }
}

// Watch for changes in participants to update hasMoreData
watch(participants, (newData) => {
  hasMoreData.value = newData.length > 0;
});

// Watch for filter changes to refetch
watch(
  filters,
  () => {
    currentPage.value = 1;
    getParticipants();
  },
  { deep: true }
);

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

/* Adjust modal for small screens */
@media (max-width: 640px) {
  .max-w-md {
    max-width: 90%;
  }
}

/* Improve touch targets for buttons */
button {
  min-height: 40px;
  touch-action: manipulation;
}
</style>