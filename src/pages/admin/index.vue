<template>
  <div class="md:flex md:h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar
      :is-open="isSidebarOpen"
      @toggle-sidebar="toggleSidebar"
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow p-4 flex justify-between items-center">
        <button
          class="md:hidden p-2 rounded-md hover:bg-gray-100"
          @click="toggleSidebar"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 class="text-2xl font-semibold">
          Hello {{ user?.data?.name }}
        </h1>
        <div class="w-6 h-6" />
        <!-- Spacer for layout -->
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 md:p-6 p-2 overflow-y-auto">
        <div class="max-w-7xl mx-auto">
          <!-- Dashboard content goes here -->
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue";
import Sidebar from "./sidebar.vue";
import { useStore } from "vuex";

// State for sidebar visibility (for responsive design)
const isSidebarOpen = ref(true);
const screenWidth = ref(window.innerWidth);
const store = useStore();

// Track window resize for responsiveness
const updateWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

// Auto-close sidebar on lg (1024px+) screens
watchEffect(() => {
  if (screenWidth.value >= 1024) {
    isSidebarOpen.value = false;
  }
});

// Toggle sidebar manually
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const user = computed(() => store.getters.getUserInfo);
</script>
