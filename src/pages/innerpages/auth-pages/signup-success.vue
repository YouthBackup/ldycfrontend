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
            <div class="px-6 py-8 bg-emerald-600 text-center">
              <i class="mdi mdi-check-circle text-white text-6xl" />
              <h5
                class="text-white text-xl tracking-wide uppercase font-semibold mt-2"
              >
                Registration Successful
              </h5>
            </div>

            <div class="px-6 py-12">
              <p
                class="text-black font-semibold text-xl dark:text-white text-center"
              >
                Congratulations! 🎉
              </p>

              <div class="text-black mt-4">
                <p class="text-center">
                  Thank you for registering for the 2025 Youth Conference!
                  <br>To complete your registration, please make a payment
                  of<span class="font-semibold"> ₦10,000</span> to the account
                  below:
                </p>
                <ul class="list-none my-4 text-center">
                  <li>
                    <span class="font-semibold">Bank:</span> First City Monument
                    Bank (FCMB)
                  </li>
                  <li>
                    <span class="font-semibold">Account Number:</span>
                    0696-4260-13
                  </li>
                  <li>
                    <span class="font-semibold">Account Name:</span> Lagos
                    Diocesan Youth Directorate
                  </li>
                </ul>

                <p class="font-semibold">
                  Important Instructions:
                </p>
                <ol class="">
                  <li>Use your full name as the transaction narration.</li>
                  <li>
                    Send your payment receipt along with your full name and
                    email address to this number: 09032762664.
                  </li>
                  <li>
                    Once your payment is confirmed, you will receive a
                    confirmation email.
                  </li>
                </ol>

                <div class="mt-6 flex justify-center mb-2">
                  <router-link
                    to="/"
                    class="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-[#0592d8] text-white rounded-md"
                  >
                    Continue
                  </router-link>
                </div>
              </div>

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

<script>
export default {
  name: "ErrorPage",
  components: {},
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
  computed: {
    formattedYear() {
      return this.date.toString().slice(-2); // Get last 2 digits of year
    },
  },
};
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
