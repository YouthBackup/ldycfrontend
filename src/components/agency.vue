<template>
  <div class="container relative md:mt-24 mt-16">
    <div class="grid md:grid-cols-12 grid-cols-1 items-center gap-6 relative">
      <div class="md:col-span-5">
        <div class="relative">
          <img
            src="../assets/images/bg/carol.jpg"
            class="mx-auto rounded-3xl shadow dark:shadow-gray-700 w-[90%] h-[450px] object-cover"
            alt=""
          >

          <!-- <div
            class="absolute flex items-center bottom-16 md:-start-10 -start-5 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-56 m-3"
          >
            <div
              class="flex items-center justify-center h-[65px] min-w-[65px] bg-[#0592d8]/5 text-[#0592d8] text-center rounded-xl me-3"
            >
              <i data-feather="globe" class="size-6" />
            </div>
            <div class="flex-1">
              <span class="text-slate-400">Travel Packages</span>
              <p class="text-xl font-bold flex">
                <count-up :start-val="1" :end-val="50" />+
              </p>
            </div>
          </div> -->

          <div
            class="absolute flex items-center top-16 md:-start-10 -start-5 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-60 m-3"
          >
            <div
              class="flex items-center justify-center h-[65px] min-w-[65px] bg-[#0592d8]/5 text-[#0592d8] text-center rounded-xl me-3"
            >
              <i
                data-feather="users"
                class="size-6"
              />
            </div>
            <div class="flex-1">
              <span class="text-slate-400">Campers</span>
              <p class="text-xl font-bold">
                <count-up
                  :start-val="0"
                  :end-val="1200"
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="md:col-span-7">
        <div class="lg:ms-8">
          <h3
            class="mb-6 md:text-3xl text-2xl leading-normal font-semibold"
          >
            A Bold Generation <br>Rooted in Christ
          </h3>

          <p class="text-slate-400 max-w-xl mb-6">
            Join Anglican youths across the Diocese of Lagos in a sacred
            gathering of worship, teaching, and transformation. Deepen your
            faith through sound doctrine, vibrant fellowship, and Spirit-led
            sessions grounded in the Anglican tradition. From Eucharistic
            celebrations to practical breakout sessions, this is your time to
            grow, serve, and lead with courage.
          </p>

          <!-- <a
            href=""
            class="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-[#0592d8] text-white rounded-md"
          >Read More <i class="mdi mdi-chevron-right align-middle ms-0.5" /></a> -->
        </div>
      </div>

      <div class="absolute bottom-0 start-1/3 -z-1">
        <!-- <img src="../assets/images/map-plane-big.png" class="lg:w-[600px] w-96" alt=""> -->
        <img
          src="https://placehold.co/600x400/e2e8f0/94a3b8?text=Placeholder"
          class="lg:w-[600px] w-96"
          alt=""
        >
      </div>
    </div>
  </div>
  <!--end container-->
</template>

<script>
import CountUp from "vue-countup-v3";
import feather from "feather-icons";
export default {
  name: "AgencyCompo",
  components: {
    CountUp,
  },
  data() {
    return {};
  },
  mounted() {
    feather.replace();
  },
};
</script>

<style lang="scss" scoped></style>
