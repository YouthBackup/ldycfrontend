<template>
  <!-- Loader End -->
  <section
    class="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image"
  >
    <div
      class="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/6.jpg')] bg-no-repeat bg-center bg-cover"
    />
    <div
      id="particles-snow"
      class="absolute inset-0 bg-gradient-to-b from-transparent to-black z-2"
    />
    <div class="container relative z-3">
      <div class="flex justify-center">
        <div
          class="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md"
        >
          <router-link to="/">
            <!-- <img src="../../../assets/images/logo-icon.png" class="mx-auto" alt=""> -->
            <img
              src="../../../assets/images/doylogo.png"
              class="mx-auto w-20"
              alt=""
            >
          </router-link>
          <h5 class="my-6 text-xl font-semibold">
            Login
          </h5>
          <form class="text-start">
            <div class="grid grid-cols-1">
              <div class="mb-4">
                <label
                  class="font-semibold"
                  for="LoginEmail"
                >Email Address:</label>
                <input
                  id="LoginEmail"
                  v-model="userDetails.email"
                  type="email"
                  class="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                  placeholder="name@example.com"
                  required
                >
              </div>

              <div class="mb-4">
                <label
                  class="font-semibold"
                  for="LoginPassword"
                >Password:</label>
                <input
                  id="LoginPassword"
                  v-model="userDetails.password"
                  type="password"
                  class="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                  placeholder="Password:"
                  required
                >
              </div>

              <div class="flex justify-between mb-4">
                <!-- <div class="flex items-center mb-0">
                  <input
                    id="RememberMe"
                    class="form-checkbox rounded border-gray-100 dark:border-gray-800 text-red-500 focus:border-red-300 focus:ring focus:ring-offset-0 focus:ring-red-500/20 focus:ring-opacity-50 me-2"
                    type="checkbox"
                    value=""
                  >
                  <label
                    class="form-checkbox-label text-slate-400"
                    for="RememberMe"
                  >Remember me</label>
                </div> -->
                <p class="text-slate-400 mb-0">
                  <router-link
                    to="/forgot-password"
                    class="text-slate-400"
                  >
                    Forgot password?
                  </router-link>
                </p>
              </div>

              <div class="mb-4">
                <input
                  type="submit"
                  class="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full"
                  value="Login / Sign in"
                  @click.prevent="login"
                >
              </div>

              <!-- <div class="text-center">
                <span class="text-slate-400 me-2">Don't have an account ?</span>
                <router-link
                  to="/signup"
                  class="text-black dark:text-white font-bold inline-block"
                >
                  Sign Up
                </router-link>
              </div> -->
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
// import feather from "feather-icons";
import switcher from "@/components/switcher.vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const store = useStore();
const router = useRouter();
const toast = useToast();

const userDetails = ref({ email: "", password: "" });

const login = async () => {
  try {
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
