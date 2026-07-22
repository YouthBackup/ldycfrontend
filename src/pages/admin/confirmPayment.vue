<template>
  <div class="px-4 sm:px-6 lg:px-8 py-6 container mx-auto">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 class="text-xl font-semibold text-gray-800">
        Pending Payments
      </h2>
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isReconciling"
        @click="reconcilePayments"
      >
        {{ isReconciling ? "Reconciling..." : "Reconcile" }}
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Reference
            </th>
            <th
              class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell"
            >
              Payer Email
            </th>
            <th
              class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Amount
            </th>
            <th
              class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Participants
            </th>
            <th
              class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="payment in payments"
            :key="payment.reference"
            class="hover:bg-gray-50 transition-colors duration-150 align-top"
          >
            <td class="px-3 py-3 whitespace-nowrap text-sm font-mono text-gray-900">
              {{ payment.reference }}
            </td>
            <td
              class="px-3 py-3 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell"
            >
              {{ payment.email }}
            </td>
            <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
              {{ formatAmount(payment.amount) }}
            </td>
            <td class="px-3 py-3 text-sm text-gray-600">
              <ul class="space-y-1">
                <li
                  v-for="(participant, index) in payment.participants"
                  :key="index"
                  class="whitespace-nowrap"
                >
                  {{ participant.firstName }} {{ participant.surname }}
                  <span class="text-gray-400 capitalize">({{ participant.userType }})</span>
                </li>
                <li
                  v-if="!payment.participants || payment.participants.length === 0"
                  class="text-gray-400"
                >
                  —
                </li>
              </ul>
            </td>
            <td class="px-3 py-3 whitespace-nowrap">
              <span
                class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium capitalize"
              >
                {{ payment.status }}
              </span>
            </td>
          </tr>
          <tr v-if="!isLoading && payments.length === 0">
            <td
              colspan="5"
              class="px-3 py-8 text-center text-sm text-gray-500"
            >
              No pending payments.
            </td>
          </tr>
        </tbody>
      </table>
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
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toast-notification";

const store = useStore();
const toast = useToast();

const payments = ref([]);
const isLoading = ref(false);
const isReconciling = ref(false);

// Paystack amounts are stored in kobo — convert to naira for display.
function formatAmount(amount) {
  const naira = (Number(amount) || 0) / 100;
  return `₦${naira.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

async function getPendingPayments() {
  try {
    isLoading.value = true;
    const res = await store.dispatch("getPendingPayments");
    payments.value = res.data.data || res.data || [];
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong. Please try again.",
      {
        position: "top-right",
        duration: 5000,
      }
    );
  } finally {
    isLoading.value = false;
  }
}

// Reconcile all pending payments with Paystack, then refresh the list.
async function reconcilePayments() {
  try {
    isReconciling.value = true;
    await store.dispatch("reconcilePayments");
    toast.success("Payments reconciled", {
      position: "top-right",
      duration: 5000,
    });
    await getPendingPayments();
  } catch (error) {
    console.error("Failed to reconcile payments:", error);
    toast.error(
      error.response?.data?.message ||
        "Failed to reconcile payments. Please try again.",
      {
        position: "top-right",
        duration: 5000,
      }
    );
  } finally {
    isReconciling.value = false;
  }
}

onMounted(() => {
  getPendingPayments();
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
