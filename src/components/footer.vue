<template>
  <!-- Footer Start -->
  <footer
    class="footer bg-dark-footer  relative text-gray-200 dark:text-gray-200"
  >
    <div class="container relative">
      <div class="grid grid-cols-12">
        <div class="col-span-12">
          <div class="py-[36px] px-0">
            <div class="grid md:grid-cols-12 grid-cols-1 gap-6">
              <div class="lg:col-span-3 md:col-span-12">
                <a
                  href="#"
                  class="text-[22px] focus:outline-none"
                >
                  <img
                    class="w-24 h-24"
                    src="../assets/images/doylogo.png"
                    alt=""
                  >
                </a>
                <p class="mt-3 text-gray-300 text-sm">
                  Empowered by Faith, Equipped by Word, Driven by Passion!
                  Welcome to the Directorate of Youths, Diocese of Lagos. Let's
                  shake the world for Christ!
                </p>
                <ul class="list-none mt-3">
                  <li class="inline">
                    <a
                      href=" https://www.facebook.com/Dioceseoflagosyouth"
                      target="_blank"
                      class="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:bg-[#0592d8] hover:text-white text-slate-300"
                    ><i
                      data-feather="facebook"
                      class="size-4 align-middle"
                      title="facebook"
                    /></a>
                  </li>
                  <li class="inline">
                    <a
                      href="https://www.instagram.com/dioceseoflagosyouth/"
                      target="_blank"
                      class="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:bg-[#0592d8] hover:text-white text-slate-300"
                    ><i
                      data-feather="instagram"
                      class="size-4 align-middle"
                      title="instagram"
                    /></a>
                  </li>
                  <li class="inline">
                    <a
                      href="mailto:youthdirectoratedioceseoflagos@gmail.com"
                      class="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:bg-[#0592d8] hover:text-white text-slate-300"
                    ><i
                      data-feather="mail"
                      class="size-4 align-middle"
                      title="email"
                    /></a>
                  </li>
                </ul>
                <!--end icon-->
              </div>
              <!--end col-->

              <div class="lg:col-span-3 md:col-span-4">
                <div class="lg:ms-8">
                  <h5 class="tracking-[1px] text-gray-100 font-semibold">
                    Office
                  </h5>
                  <h5 class="tracking-[1px] text-gray-100 mt-3">
                    Directorate of Youth
                  </h5>

                  <div class="flex mt-4">
                    <i
                      data-feather="map-pin"
                      class="size-4 text-[#0592d8] me-2 mt-1" 
                    />
                    <div class="">
                      <h6 class="text-gray-300">
                        29, Marina, Lagos Island Lagos, Nigeria.
                      </h6>
                    </div>
                  </div>

                  <div class="flex mt-4 items-center">
                    <i
                      data-feather="mail"
                      class="size-4 text-[#0592d8] me-2 mt-1"
                    />
                    <div class="">
                      <a
                        href="mailto:youthdirectoratedioceseoflagos@gmail.com"
                        class="text-slate-300 hover:text-slate-400 duration-500 ease-in-out break-all"
                      >youthdirectoratedioceseoflagos@gmail.com</a>
                    </div>
                  </div>

                  <div class="flex mt-4">
                    <i
                      data-feather="phone"
                      class="size-4 text-[#0592d8] me-2 mt-1"
                    />
                    <div class="">
                      <a
                        href="tel:+234 802 364 8700"
                        class="text-slate-300 hover:text-slate-400 duration-500 ease-in-out"
                      >+234 802 364 8700 Director</a>
                    </div>
                  </div>
                </div>
              </div>
              <!--end col-->

              <div class="lg:col-span-3 md:col-span-4">
                <div class="lg:ms-8">
                  <h5 class="tracking-[1px] text-gray-100 font-semibold">
                    Site map
                  </h5>
                  <ul class="list-none footer-list mt-6">
                    <li class="mt-[10px] ms-0">
                      <router-link
                        to="/about"
                        class="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <i class="mdi mdi-chevron-right" /> About LDYC
                      </router-link>
                    </li>
                    <li class="mt-[10px] ms-0">
                      <router-link
                        to="/anglicanism"
                        class="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <i class="mdi mdi-chevron-right" /> What is Anglicanism
                      </router-link>
                    </li>
                    <li class="mt-[10px] ms-0">
                      <router-link
                        to="/programs"
                        class="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <i class="mdi mdi-chevron-right" /> Programs
                      </router-link>
                    </li>
                    <li class="mt-[10px] ms-0">
                      <router-link
                        to="/gallery"
                        class="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <i class="mdi mdi-chevron-right" /> Gallery
                      </router-link>
                    </li>
                    <li class="mt-[10px] ms-0">
                      <router-link
                        to="/find-a-church"
                        class="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <i class="mdi mdi-chevron-right" /> Find a Church
                      </router-link>
                    </li>
                    <li class="mt-[10px] ms-0">
                      <router-link
                        to="/contact"
                        class="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <i class="mdi mdi-chevron-right" /> Contact
                      </router-link>
                    </li>
                    <li class="mt-[10px] ms-0">
                      <router-link
                        to="/login"
                        class="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <i class="mdi mdi-chevron-right" /> Login
                      </router-link>
                    </li>
                    <!-- <li>
                      <router-link
                        to="/aboutus"
                        class="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <i class="mdi mdi-chevron-right" /> About us
                      </router-link>
                    </li> -->
                    <!-- <li class="mt-[10px] ms-0">
                      <router-link
                        to=""
                        class="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <i class="mdi mdi-chevron-right" /> Team
                      </router-link>
                    </li> -->
                    <!-- <li class="mt-[10px] ms-0">
                      <router-link
                        to="/blogs"
                        class="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <i class="mdi mdi-chevron-right" /> Blog
                      </router-link>
                    </li> -->
                  </ul>
                </div>
              </div>
              <!--end col-->
            </div>
            <!--end grid-->
          </div>
          <!--end col-->
        </div>
      </div>
      <!--end grid-->
    </div>
    <!--end container-->

    <div class="py-[18px] px-0 border-t border-slate-800">
      <div class="container relative text-center">
        <div class="grid grid-cols-1">
          <div class="text-center">
            <p class="mb-0">
              © {{ date }} Diocese of Lagos

              <a
                href="#"
                target="_blank"
                class="text-reset"
              >Directorate of Youth</a>.
            </p>
          </div>
        </div>
        <!--end grid-->
      </div>
      <!--end container-->
    </div>
  </footer>
  <!--end footer-->
  <!-- Footer End -->
</template>

<script>
import feather from "feather-icons";
export default {
  name: "FooterCompo",
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
  mounted() {
    feather.replace();
  },
};
</script>

<style lang="scss" scoped></style>
