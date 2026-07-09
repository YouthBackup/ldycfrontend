<template>
  <aside
    :class="[
      'bg-gradient-to-b from-indigo-900 to-teal-900 text-white w-64 space-y-6 py-8 px-4 fixed inset-y-0 left-0 transform',
      isOpen ? 'translate-x-0' : '-translate-x-full',
      'md:relative md:translate-x-0 transition-transform duration-500 ease-in-out z-30 shadow-2xl backdrop-blur-sm bg-opacity-90',
    ]"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between">
      <h2
        class="text-xl font-extrabold text-white font-inter tracking-tight flex itemscenter gap-2"
      >
        <img
          src="../../assets/images/doylogo.png"
          class="w-14 h-14"
          alt="Logo"
        >
        <span>LDYC Admin Dashboard</span>
      </h2>
      <button
        class="md:hidden p-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
        aria-label="Toggle sidebar"
        @click="emit('toggle-sidebar')"
      >
        <svg
          :class="[
            'w-6 h-6 transition-transform duration-300',
            isOpen ? 'rotate-180' : 'rotate-0',
          ]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Menu Items -->
    <nav class="space-y-1 mt-8">
      <button
        v-for="item in menuItems"
        :key="item.name"
        :class="[
          'w-full whitespace-nowra flex items-center px-4 py-3 text-sm font-medium text-gray-100 rounded-lg transition-all duration-300 group relative',
          isActive(item.route)
            ? 'bg-gradient-to-r from-indigo-600 to-teal-600 text-white shadow-md'
            : 'hover:bg-indigo-700 hover:text-white',
        ]"
        :aria-label="`Navigate to ${item.name} page`"
        :aria-current="isActive(item.route) ? 'page' : undefined"
        :disabled="item.disabled"
        @click="navigateTo(item.route)"
      >
        <svg
          class="w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-110"
          :class="isActive(item.route) ? 'text-teal-300' : 'text-gray-300'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="getIconPath(item.icon)"
          />
        </svg>
        <span>{{ item.name }}</span>
        <span
          v-if="isActive(item.route)"
          class="absolute left-0 h-6 w-1 bg-teal-400 rounded-r"
        />
      </button>
    </nav>

    <!-- Divider -->
    <hr class="border-gray-700 mx-4 my-6">

    <!-- Logout Button -->
    <div class="absolute bottom-0 pb-8 px-4">
      <button
        class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-100 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
        aria-label="Log out"
        @click="handleLogout"
      >
        <svg
          class="w-6 h-6 mr-3 text-gray-100"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup>
import {
  defineProps,
  defineEmits,
  computed,
  onMounted,
  onUnmounted,
  watchEffect,
  ref,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

// Props
const props = defineProps({
  isOpen: Boolean,
});

// Emits
const emit = defineEmits(["toggle-sidebar"]);

// Track screen width
const width = ref(window.innerWidth);
const updateWidth = () => {
  width.value = window.innerWidth;
};
onMounted(() => window.addEventListener("resize", updateWidth));
onUnmounted(() => window.removeEventListener("resize", updateWidth));

// Auto-close sidebar on large screens
watchEffect(() => {
  if (width.value >= 1024 && props.isOpen) {
    emit("toggle-sidebar");
  }
});

// Router and Route instances
const router = useRouter();
const route = useRoute();
const store = useStore();

// Sidebar menu items
const allMenuItems = [
  {
    name: "Confirm Payment",
    icon: "check-circle",
    route: "/admin/confirmPayment",
    disabled: false,
  },
  {
    name: "Print ID",
    icon: "printer",
    route: "/admin/printCard",
    disabled: false,
  },
  {
    name: "Verify Participant",
    icon: "check-circle",
    route: "/admin/verify/participant",
    disabled: false,
  },
];

// User check
const user = computed(() => store.getters.getUserInfo);

// Filter based on user role
const menuItems = computed(() => {
  if (user.value?.data?.name !== "Admin") {
    return allMenuItems.filter((item) => item.name === "Verify Participant");
  }
  return allMenuItems;
});

// Check if a menu item is active
const isActive = (itemRoute) => {
  const currentPath = route.path;
  return currentPath === itemRoute || currentPath.startsWith(itemRoute);
};

// Navigate to route with error handling
const navigateTo = async (route) => {
  try {
    await router.push(route);
  } catch (error) {
    console.error("Navigation error:", error);
    router.push("/admin");
  }
};

// Handle logout
const handleLogout = async () => {
  await store.dispatch("logout");
  router.push("/");
};
</script>

<script>
export default {
  methods: {
    getIconPath(icon) {
      const icons = {
        "check-circle": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        printer:
          "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z",
      };
      return icons[icon] || "";
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

.font-inter {
  font-family: "Inter", sans-serif;
}

/* Focus styles for accessibility */
button:focus {
  outline: none;
  ring: 2px solid #38bdf8;
  ring-offset: 2px;
}
</style>
