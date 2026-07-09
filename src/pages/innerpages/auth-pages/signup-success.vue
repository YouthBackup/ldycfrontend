<template>
  <!-- Start Hero -->
  <section
    class="relative h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-800"
  >
    <div class="container relative">
      <div class="md:flex justify-center">
        <div class="lg:w-[60%]">
          <div
            class="relative overflow-hidden rounded-md bg-white dark:bg-slate-900 shadow dark:shadow-gray-800"
          >
            <!-- Loading -->
            <div
              v-if="status === 'loading'"
              class="px-6 py-8 bg-ldyc-blue text-center"
            >
              <div class="loader mx-auto mb-4" />
              <h5 class="text-white text-xl tracking-wide uppercase font-semibold mt-2">
                Verifying your payment...
              </h5>
            </div>

            <!-- Success -->
            <div
              v-else-if="status === 'success'"
              class="px-6 py-8 bg-emerald-600 text-center"
            >
              <i class="mdi mdi-check-circle text-white text-6xl" />
              <h5 class="text-white text-xl tracking-wide uppercase font-semibold mt-2">
                Registration Successful
              </h5>
            </div>

            <!-- Failed -->
            <div
              v-else
              class="px-6 py-8 bg-red-600 text-center"
            >
              <i class="mdi mdi-close-circle text-white text-6xl" />
              <h5 class="text-white text-xl tracking-wide uppercase font-semibold mt-2">
                Payment Failed
              </h5>
            </div>

            <div class="px-6 py-12">
              <template v-if="status === 'success'">
                <p class="text-black font-semibold text-xl dark:text-white text-center">
                  Congratulations! 🎉
                </p>

                <div class="text-black mt-4">
                  <p class="text-center">
                    Thank you for registering for LDYC 2026! Your payment was
                    successful. A confirmation email with your registration
                    details has been sent to each participant's email address.
                  </p>

                  <div class="mt-6 flex justify-center mb-2">
                    <router-link
                      to="/"
                      class="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-[#0592d8] text-white rounded-md"
                    >
                      Continue
                    </router-link>
                  </div>
                </div>
              </template>

              <template v-else-if="status === 'failed'">
                <p class="text-black font-semibold text-xl dark:text-white text-center">
                  {{ errorMessage }}
                </p>

                <div class="text-black dark:text-white mt-6 flex flex-col items-center gap-3">
                  <button
                    v-if="checkoutInfo?.authorizationUrl"
                    class="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-[#0592d8] text-white rounded-md"
                    @click="retryPayment"
                  >
                    Retry Payment
                  </button>
                  <router-link
                    to="/register"
                    class="text-sm underline text-slate-500 dark:text-slate-300"
                  >
                    Start Over
                  </router-link>
                </div>
              </template>

              <div
                class="text-center p-4 pb-0 border-t border-gray-100 dark:border-gray-700"
              >
                <p class="mb-0 text-black">
                  © {{ date }} Lagos Diocese Youth Directorate
                  <i class="mdi mdi-heart text-[#0592d8]" />.
                  <strong>#LDYC{{ formattedYear }}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end container-->
    </div>
  </section>
  <!--end section-->
  <!-- End Hero -->
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getCheckout, clearCheckout } from "@/utils/checkoutStorage";

const route = useRoute();
const router = useRouter();
const store = useStore();

const date = new Date().getFullYear();
const formattedYear = computed(() => date.toString().slice(-2));

const status = ref("loading");
const errorMessage = ref("");
const checkoutInfo = ref(getCheckout());

const retryPayment = () => {
  if (checkoutInfo.value?.authorizationUrl) {
    window.location.href = checkoutInfo.value.authorizationUrl;
  } else {
    router.push("/register");
  }
};

onMounted(async () => {
  const reference =
    route.query.reference || route.query.trxref || checkoutInfo.value?.reference;

  if (!reference) {
    status.value = "failed";
    errorMessage.value = "No payment reference found. Please try registering again.";
    return;
  }

  try {
    const response = await store.dispatch("verifyPayment", reference);
    if (response.data?.success === false) {
      throw new Error(response.data?.message || "Payment verification failed.");
    }
    status.value = "success";
    clearCheckout();
  } catch (error) {
    status.value = "failed";
    errorMessage.value =
      error.response?.data?.message ||
      error.message ||
      "Payment verification failed or is still pending.";
  }
});
</script>

<style scoped>
/* Custom Loader */
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #dc2626;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
