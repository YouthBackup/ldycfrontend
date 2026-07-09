<template>
  <div>
    <div
      v-if="route.params.id"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="$emit('close')"
    >
      <transition name="modal-fade">
        <div
          v-if="!isLoading && !error"
          class="relative max-w-lg w-full bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-6 transition-all duration-300 max-h-[90vh] overflow-y-auto"
        >
          <!-- Close Button -->
          <button
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
            @click="$emit('close')"
          >
            <font-awesome-icon
              icon="times"
              class="text-xl"
            />
          </button>

          <h1
            class="text-2xl font-bold text-gray-900 text-center mb-6 font-inter tracking-tight"
          >
            Participant Details
          </h1>

          <!-- Error State -->
          <div
            v-if="error"
            class="text-center text-red-700 bg-red-50 p-3 rounded-lg font-medium text-sm"
          >
            {{ error }}
          </div>

          <!-- Participant Details -->
          <div
            v-else-if="singleParticipant"
            class="space-y-4"
          >
            <transition-group
              name="fade"
              tag="div"
              class="grid grid-cols-1 gap-4"
            >
              <!-- Image -->
              <div class="flex justify-between items-center">
                <div
                  key="image"
                  class="flex items-center space-x-2 group"
                >
                  <div>
                    <span
                      class="block text-xs font-semibold text-teal-600 tracking-wide"
                    >Profile Image</span>
                    <img
                      class="h-24 w-24 rounded-full object-cover border-2 border-teal-200 shadow-sm hover:scale-105 transition-transform duration-300"
                      :src="
                        singleParticipant.photoUrl ||
                          'https://via.placeholder.com/150'
                      "
                      alt="Profile Image"
                      aria-label="Participant profile image"
                    >
                  </div>
                </div>
                <div class="grid md:grid-cols-2 gap-3">
                  <button
                    class="bg-red-600/80 text-white px-2 sm:px-3 py-1.5 rounded-md hover:bg-red-700 text-xs font-medium transition-colors duration-200 w-fit"
                    @click="updateUser('stopped')"
                  >
                    Stop participant
                  </button>
                  <button
                    class="bg-green-600 text-white px-2 sm:px-3 py-3 rounded-md hover:bg-green-700 text-xs font-medium transition-colors duration-200 w-fit"
                    @click="updateUser('passed')"
                  >
                    Pass participant
                  </button>
                </div>
              </div>
              <!-- ID -->
              <div
                key="id"
                class="flex items-center space-x-2 group"
              >
                <font-awesome-icon
                  class="text-teal-500 text-lg transition-transform group-hover:scale-110"
                  icon="id-card"
                />
                <div>
                  <span
                    class="block text-xs font-semibold text-teal-600 tracking-wide"
                  >ID</span>
                  <span class="text-sm font-medium text-gray-900">{{
                    singleParticipant.registrationCode
                  }}</span>
                </div>
              </div>

              <!-- Name -->
              <div
                key="name"
                class="flex items-center space-x-2 group"
              >
                <font-awesome-icon
                  class="text-teal-500 text-lg transition-transform group-hover:scale-110"
                  icon="user"
                />
                <div>
                  <span
                    class="block text-xs font-semibold text-teal-600 tracking-wide"
                  >Name</span>
                  <span class="text-sm font-medium text-gray-900 capitalize">
                    {{ singleParticipant.surname }}
                    {{ singleParticipant.firstName }}
                    {{ singleParticipant.otherName }}
                  </span>
                </div>
              </div>

              <!-- Email -->
              <div
                key="email"
                class="flex items-center space-x-2 group"
              >
                <font-awesome-icon
                  class="text-teal-500 text-lg transition-transform group-hover:scale-110"
                  icon="envelope"
                />
                <div class="w-full">
                  <span
                    class="block text-xs font-semibold text-teal-600 tracking-wide"
                  >Email</span>
                  <span class="text-sm font-medium text-gray-900 break-all">
                    {{ singleParticipant.email }}
                  </span>
                </div>
              </div>

              <!-- Payment Status -->
              <div
                key="status"
                class="flex items-center space-x-2 group"
              >
                <font-awesome-icon
                  class="text-teal-500 text-lg transition-transform group-hover:scale-110"
                  icon="money-check-alt"
                />
                <div>
                  <span
                    class="block text-xs font-semibold text-teal-600 tracking-wide"
                  >Payment Status</span>
                  <span
                    :class="{
                      'bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-sm':
                        singleParticipant.paymentStatus.toLowerCase() ===
                        'pending',
                      'bg-gradient-to-r from-green-400 to-teal-400 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-sm':
                        singleParticipant.paymentStatus.toLowerCase() ===
                        'paid',
                      'bg-gradient-to-r from-red-400 to-pink-400 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-sm':
                        singleParticipant.paymentStatus.toLowerCase() ===
                        'failed',
                    }"
                  >
                    {{ singleParticipant.paymentStatus }}
                  </span>
                </div>
              </div>

              <!-- verification Status -->
              <div
                key="status"
                class="flex items-center space-x-2 group"
              >
                <font-awesome-icon
                  class="text-teal-500 text-lg transition-transform group-hover:scale-110"
                  icon="check-circle"
                />
                <div>
                  <span
                    class="block text-xs font-semibold text-teal-600 tracking-wide"
                  >Verification Status</span>
                  <span
                    :class="{
                      'bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-sm':
                        singleParticipant.status.toLowerCase() === 'registered',
                      'bg-gradient-to-r from-green-400 to-teal-400 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-sm':
                        singleParticipant.status.toLowerCase() === 'passed',
                      'bg-gradient-to-r from-red-400 to-pink-400 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-sm':
                        singleParticipant.status.toLowerCase() === 'stopped',
                    }"
                  >
                    {{ singleParticipant.status }}
                  </span>
                </div>
              </div>

              <!-- Phone -->
              <div
                key="phone"
                class="flex items-center space-x-2 group"
              >
                <font-awesome-icon
                  class="text-teal-500 text-lg transition-transform group-hover:scale-110"
                  icon="phone"
                />
                <div>
                  <span
                    class="block text-xs font-semibold text-teal-600 tracking-wide"
                  >Phone Number</span>
                  <span class="text-sm font-medium text-gray-900">{{
                    singleParticipant.phoneNumber || "N/A"
                  }}</span>
                </div>
              </div>

              <!-- Archdeaconry -->
              <div
                key="archdeaconry"
                class="flex items-center space-x-2 group"
              >
                <font-awesome-icon
                  class="text-teal-500 text-lg transition-transform group-hover:scale-110"
                  icon="church"
                />
                <div>
                  <span
                    class="block text-xs font-semibold text-teal-600 tracking-wide"
                  >Archdeaconry</span>
                  <span class="text-sm font-medium text-gray-900">{{
                    singleParticipant.archdeaconry || "N/A"
                  }}</span>
                </div>
              </div>

              <!-- Parish -->
              <div
                key="parish"
                class="flex items-center space-x-2 group"
              >
                <font-awesome-icon
                  class="text-teal-500 text-lg transition-transform group-hover:scale-110"
                  icon="map-marker-alt"
                />
                <div>
                  <span
                    class="block text-xs font-semibold text-teal-600 tracking-wide"
                  >Parish</span>
                  <span class="text-sm font-medium text-gray-900">{{
                    singleParticipant.parish || "N/A"
                  }}</span>
                </div>
              </div>

              <!-- Date Registered -->
              <div
                key="date"
                class="flex items-center space-x-2 group"
              >
                <font-awesome-icon
                  class="text-teal-500 text-lg transition-transform group-hover:scale-110"
                  icon="calendar-alt"
                />
                <div>
                  <span
                    class="block text-xs font-semibold text-teal-600 tracking-wide"
                  >Date Registered</span>
                  <span class="text-sm font-medium text-gray-900">{{
                    formatDate(singleParticipant.createdAt)
                  }}</span>
                </div>
              </div>

              <!-- User Type -->
              <div
                key="userType"
                class="flex items-center space-x-2 group"
              >
                <font-awesome-icon
                  class="text-teal-500 text-lg transition-transform group-hover:scale-110"
                  icon="user"
                />
                <div>
                  <span
                    class="block text-xs Kernighan & Ritchie, 1988) text-xs font-semibold text-teal-600 tracking-wide"
                  >User Type</span>
                  <span class="text-sm font-medium text-gray-900 capitalize">
                    {{ singleParticipant.userType }}
                  </span>
                </div>
              </div>
            </transition-group>
          </div>

          <!-- No Participant Found -->
          <div
            v-else
            class="text-center text-gray-600 bg-gray-50 p-3 rounded-lg font-medium text-sm"
          >
            No participant found
          </div>
        </div>
      </transition>
    </div>
    <div v-else>
      <!-- Loading State -->
      <div class="flex items-center justify-center space-x-3 text-gray-600">
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
        <span class="text-lg font-medium">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, defineEmits } from "vue";
import { useRoute } from "vue-router";
import useParticipants from "./useParticipants";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();
defineEmits(["close"]);

const { singleParticipant, isLoading, error, getSingleParticipant } =
  useParticipants();

// Format date helper
const formatDate = (date) => {
  return date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";
};

const updateUser = async (status) => {
  const payload = {
    id: route.params.id,
    status,
  };
  const res = await store.dispatch("updateParticipantStatus", payload);
  getSingleParticipant(route.params.id);
  console.log(res);
};

// Fetch participant data on component mount and when route.params.id changes
onMounted(() => {
  if (route.params.id) {
    getSingleParticipant(route.params.id);
  }
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      getSingleParticipant(newId);
    } else {
      singleParticipant.value = null; // Reset when no ID is present
    }
  },
);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

.font-inter {
  font-family: "Inter", sans-serif;
}

/* Modal Fade Animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Fade Animation for Grid Items */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
