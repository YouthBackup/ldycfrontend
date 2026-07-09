<template>
  <navbar
    :menu-light="'nav-light'"
    :tag-line="'tagline-height'"
    :nav-light="true"
    :search-menu="'text-white'"
  />
  <!-- Google Map -->
  <div class="container-fluid relative mt-20">
    <div class="grid grid-cols-1">
      <div class="w-full leading-[0] border-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d587.391776003598!2d3.3903134395846988!3d6.450409113597983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b106dbb3267%3A0x72c76a5b8652eddd!2s29%20Marina%20Rd%2C%20Lagos%20Island%2C%20Lagos%20101223%2C%20Lagos!5e0!3m2!1sen!2sng!4v1746629142156!5m2!1sen!2sng"
          width="800"
          height="600"
          style="border: 0"
          class="w-full h-[500px]"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
    <!--end grid-->
  </div>
  <!--end container-->
  <!-- Google Map -->

  <!-- Start Section-->
  <section class="relative lg:py-24 py-16">
    <div class="container">
      <div class="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
        <div class="lg:col-span-7 md:col-span-6">
          <!-- <img src="../../assets/images/travel-train-station.svg" class="w-full max-w-[500px] mx-auto" alt=""> -->
          <img
            src="https://placehold.co/500x400/e2e8f0/94a3b8?text=Placeholder"
            class="w-full max-w-[500px] mx-auto"
            alt=""
          >
        </div>

        <div class="lg:col-span-5 md:col-span-6">
          <div class="lg:ms-5">
            <div
              class="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800 p-6"
            >
              <h3 class="mb-6 text-2xl leading-normal font-semibold">
                Get in touch !
              </h3>

              <form>
                <div class="grid lg:grid-cols-12 grid-cols-1 gap-3">
                  <div class="lg:col-span-6">
                    <label
                      for="name"
                      class="font-semibold"
                    >Your Name:</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      class="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="Name :"
                      required
                    >
                  </div>

                  <div class="lg:col-span-6">
                    <label
                      for="email"
                      class="font-semibold"
                    >Your Email:</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      class="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="Email :"
                      required
                    >
                  </div>

                  <div class="lg:col-span-12">
                    <label
                      for="subject"
                      class="font-semibold"
                    >Your Question:</label>
                    <input
                      id="subject"
                      name="subject"
                      class="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="Subject :"
                      required
                    >
                  </div>

                  <div class="lg:col-span-12">
                    <label
                      for="comments"
                      class="font-semibold"
                    >Your Comment:</label>
                    <textarea
                      id="comments"
                      name="comments"
                      class="mt-2 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="Message :"
                    />
                  </div>
                </div>
                <button
                  id="submit"
                  type="submit"
                  name="send"
                  class="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md mt-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end container-->

    <div class="container lg:mt-24 mt-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
        <div
          v-for="item in contacts"
          :key="item"
          class="text-center px-6"
        >
          <div class="relative text-transparent">
            <div
              class="size-20 bg-red-500/5 text-red-500 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800"
            >
              <i :data-feather="item.icon" />
            </div>
          </div>

          <div class="content mt-7">
            <h5 class="title h5 text-lg font-semibold">
              {{ item.name }}
            </h5>
            <p class="text-slate-400 mt-3">
              {{ item.desc }}
            </p>

            <div class="mt-5">
              <a
                v-if="item.status === '+234 803 324 5727'"
                href="tel:+234 803 324 5727"
                class="text-red-500 font-medium"
              >{{ item.status }}</a>
              <a
                v-if="
                  item.status === 'youthdirectoratedioceseoflagos@gmail.com'
                "
                href="mailto:youthdirectoratedioceseoflagos@gmail.com"
                class="text-red-500 font-medium"
              >{{ item.status }}</a>
              <router-link
                v-if="item.status === 'View on Google map'"
                to=""
                data-type="iframe"
                class="video-play-icon read-more lightbox text-red-500 font-medium"
                @click="toggle"
              >
                View on Google map
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!--end grid-->
    </div>
    <!--end container-->
  </section>
  <!--end section-->
  <!-- End Section-->
  <!-- iframe start  -->
  <div
    :class="isActive ? 'fixed' : 'hidden'"
    class="bg-black/[0.9] top-0 left-0 bottom-0 w-[100%] h-[100%] z-999"
  >
    <div class="h-[100%] flex items-center justify-center">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d587.391776003598!2d3.3903134395846988!3d6.450409113597983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b106dbb3267%3A0x72c76a5b8652eddd!2s29%20Marina%20Rd%2C%20Lagos%20Island%2C%20Lagos%20101223%2C%20Lagos!5e0!3m2!1sen!2sng!4v1746629142156!5m2!1sen!2sng"
        width="700"
        height="500"
        frameborder="0"
      />
    </div>
    <button class="text-red-400 absolute top-[20px] right-[20px]">
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-5"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        @click="toggle"
      >
        <line
          x1="18"
          y1="6"
          x2="6"
          y2="18"
        />
        <line
          x1="6"
          y1="6"
          x2="18"
          y2="18"
        />
      </svg>
    </button>
  </div>
  <!-- iframe end  -->
  <fooTer />
  <switcher :switcher-back="true" />
</template>

<script>
import navbar from "@/components/navbar.vue";
import fooTer from "@/components/footer.vue";
import switcher from "@/components/switcher.vue";
export default {
  name: "ContactUs",
  components: {
    navbar,
    fooTer,
    switcher,
  },
  data() {
    return {
      isActive: false,
      contacts: [
        {
          icon: "phone",
          name: "Phone",
          desc: "You can reach the Director of the Directorate using the number below",
          status: "+234 803 324 5727",
        },
        {
          icon: "mail",
          name: "Email",
          desc: "For any question or suggestion, reach out to us to via our mail",
          status: "youthdirectoratedioceseoflagos@gmail.com",
        },
        {
          icon: "map-pin",
          name: "Location",
          desc: "Visit our office located at 29, Marina, Lagos Island Lagos, Nigeria.",
          desc2: "",
          status: "View on Google map",
        },
      ],
    };
  },
  mounted() {
    this.scrollToTop();
  },
  methods: {
    toggle() {
      if (!this.isActive) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped></style>
