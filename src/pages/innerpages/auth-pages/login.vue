<template>
  <!-- Loader End -->
  <section
    class="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image"
  >
    <div
      class="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/youths.jpg')] bg-no-repeat bg-center bg-cover"
    />
    <div
      id="particles-snow"
      class="absolute inset-0 bg-gradient-to-br from-ldyc-blue/90 via-black/70 to-liturgical-purple/90 z-2"
    />
    <div class="container relative z-3">
      <div class="flex justify-center">
        <div
          class="max-w-[400px] w-full m-auto p-8 bg-white dark:bg-slate-900 shadow-2xl dark:shadow-gray-700 rounded-2xl border-t-4 border-ldyc-blue"
        >
          <router-link to="/">
            <img
              src="../../../assets/images/doylogo.png"
              class="mx-auto w-20"
              alt=""
            >
          </router-link>

          <p class="mt-6 text-center text-ldyc-blue font-semibold uppercase tracking-[3px] text-xs">
            Members Portal
          </p>
          <h5 class="mb-6 text-center text-2xl font-poppins font-bold text-black dark:text-white">
            Welcome Back
          </h5>

          <form class="text-start">
            <div class="grid grid-cols-1">
              <div class="mb-4">
                <label
                  class="font-semibold text-sm text-slate-600 dark:text-slate-300"
                  for="LoginEmail"
                >Email Address:</label>
                <input
                  id="LoginEmail"
                  v-model="userDetails.email"
                  type="email"
                  class="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-800 dark:text-slate-200 rounded-lg outline-none border border-gray-200 dark:border-gray-700 focus:border-ldyc-blue focus:ring-2 focus:ring-ldyc-blue/20"
                  placeholder="name@example.com"
                  required
                >
              </div>

              <div class="mb-4">
                <label
                  class="font-semibold text-sm text-slate-600 dark:text-slate-300"
                  for="LoginPassword"
                >Password:</label>
                <div class="relative mt-2">
                  <input
                    id="LoginPassword"
                    v-model="userDetails.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="w-full py-2 px-3 pr-10 h-10 bg-transparent dark:bg-slate-800 dark:text-slate-200 rounded-lg outline-none border border-gray-200 dark:border-gray-700 focus:border-ldyc-blue focus:ring-2 focus:ring-ldyc-blue/20"
                    placeholder="Password:"
                    required
                  >
                  <button
                    type="button"
                    tabindex="-1"
                    class="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-ldyc-blue transition-colors"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    @click="showPassword = !showPassword"
                  >
                    <svg
                      v-if="showPassword"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line
                      x1="1"
                      y1="1"
                      x2="23"
                      y2="23"
                    /></svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle
                      cx="12"
                      cy="12"
                      r="3"
                    /></svg>
                  </button>
                </div>
              </div>

              <div class="flex justify-end mb-6">
                <p class="mb-0">
                  <router-link
                    to="/forgot-password"
                    class="text-ldyc-blue text-sm font-semibold hover:underline"
                  >
                    Forgot password?
                  </router-link>
                </p>
              </div>

              <div class="mb-4">
                <input
                  type="submit"
                  class="py-3 px-5 inline-block tracking-wide align-middle duration-300 text-base text-center font-semibold bg-gradient-to-r from-ldyc-blue to-liturgical-purple hover:opacity-90 text-white rounded-full w-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  :value="isLoading ? 'Logging in...' : 'Login / Sign in'"
                  :disabled="isLoading"
                  @click.prevent="login"
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <!--end section -->
  <switcher :switcher-back="false" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import switcher from "@/components/switcher.vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { isValidEmail } from "@/utils/validators";

const store = useStore();
const router = useRouter();
const toast = useToast();

const userDetails = ref({ email: "", password: "" });
const isLoading = ref(false);
const showPassword = ref(false);

const login = async () => {
  if (!userDetails.value.email || !isValidEmail(userDetails.value.email)) {
    toast.error("Please enter a valid email address.", {
      position: "top-right",
      duration: 5000,
    });
    return;
  }

  if (!userDetails.value.password) {
    toast.error("Please enter your password.", {
      position: "top-right",
      duration: 5000,
    });
    return;
  }

  try {
    isLoading.value = true;
    const res = await store.dispatch("login", userDetails.value);

    if (res.data?.success) {
      toast.success("Login successful", {
        position: "top-right",
        duration: 5000,
      });

      // Ensure we get the latest user info before routing
      await store.dispatch("getCurrentUser");

      const currentUser = store.getters.getUserInfo;
      const userName = currentUser?.data?.name;

      console.log("Logged in user:", userName);

      if (userName === "Admin") {
        router.push("/admin/confirmPayment");
      } else {
        router.push("/admin/verify/participant");
      }
    } else {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        duration: 5000,
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error(
      error.response?.data?.message ||
        "Something went wrong. Please try again.",
      {
        position: "top-right",
        duration: 5000,
      }
    );
  } finally {
    isLoading.value = false;
  }
};

// const user = computed(() => store.getters.getUserInfo);

// const register = async () => {
//   const dets = {
//     name: "AdminSupport",
//     email: "bamikiyaprecious@gmail.com",
//     password: "Admin12345",
//   };
//   await store.dispatch("adminRegister", dets);
// };

onMounted(() => {
  // register();
});
</script>

<style lang="scss" scoped></style>
