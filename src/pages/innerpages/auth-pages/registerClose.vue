<template>
  <div
    class="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex items-center justify-center"
  >
    <div>
      <transition name="backdrop">
        <div
          class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <transition name="modal">
            <div
              class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"
              />
              <div class="text-center">
                <svg
                  class="w-16 h-16 mx-auto mb-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h2 class="text-3xl font-extrabold text-gray-800 mb-3">
                  Registration Closed
                </h2>
                <p class="text-gray-500 mb-6 leading-relaxed">
                  We're sorry, but registration for the
                  <strong>LDYC26</strong> has closed. Keep an eye out for future
                  opportunities!
                </p>
                <button
                  class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  @click="router.push('/')"
                >
                  Got It
                </button>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}
.backdrop {
  transition: all 0.3s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
.close-btn:hover svg {
  transform: rotate(90deg);
  transition: transform 0.2s ease;
}
</style>
