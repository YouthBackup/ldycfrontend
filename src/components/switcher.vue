<template>
  <div>
    <!-- Switcher -->
    <div class="fixed top-1/4 -left-2 z-50">
      <span class="relative inline-block rotate-90">
        <input
          id="chk"
          type="checkbox"
          class="checkbox opacity-0 absolute"
          @change="changeMode($event)"
        >
        <label
          class="label bg-slate-900 dark:bg-white shadow dark:shadow-gray-800 cursor-pointer rounded-full flex justify-between items-center p-1 w-14 h-8"
          for="chk"
        >
          <i
            data-feather="moon"
            class="w-[18px] h-[18px] text-yellow-500"
          />
          <i
            data-feather="sun"
            class="w-[18px] h-[18px] text-yellow-500"
          />
          <span
            class="ball bg-white dark:bg-slate-900 rounded-full absolute top-[2px] left-[2px] w-7 h-7"
          />
        </label>
      </span>
    </div>
    <!-- Switcher -->

    <!-- LTR & RTL Mode Code -->
    <!-- <div class="fixed top-[40%] -left-3 z-50">
            <a href="javascript:void(0)" id="switchRtl" @click="decrement">
                <span
                    class="py-1 px-3 relative inline-block rounded-b-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow dark:shadow-gray-800 font-semibold rtl:block ltr:hidden"
                    @click="changeThem($event)">LTR</span>
                <span
                    class="py-1 px-3 relative inline-block rounded-b-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow dark:shadow-gray-800 font-semibold ltr:block rtl:hidden"
                    @click="changeThem($event)">RTL</span>
            </a>
        </div> -->
    <!-- LTR & RTL Mode Code -->

    <!-- Back to top -->
    <a
      v-if="switcherBack"
      v-show="showTopButton"
      id="back-to-top"
      class="fixed cursor-pointer  text-lg rounded-md z-10 bottom-5 end-5 size-8 text-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white justify-center items-center"
      @click="scrollToTop"
    ><i class="mdi mdi-arrow-up" /></a>
    <!-- Back to top -->
       
    <div
      v-else
      class="fixed bottom-3 end-3 z-10"
    >
      <router-link
        to="/"
        class="back-button size-8 inline-flex items-center justify-center tracking-wide  align-middle duration-500 text-base text-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-md"
      >
        <i
          data-feather="arrow-left"
          class="size-4"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';
export default {
    name: "SwitcherVue",
    props: {
       switcherBack: {
      type: Boolean,
      required: true,
    },
  },
    data() {
        return {
            htmlTag: document.getElementsByTagName("html")[0],
            showTopButton: false
        }
    },
   
    mounted() {
        feather.replace();
    },

    created() {
        window.addEventListener('scroll', this.handleScroll);

    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);

    },

    methods: {
        handleScroll() {
            if (
                document.body.scrollTop >= 400 ||
                document.documentElement.scrollTop >= 400
            ) {
                this.showTopButton = true
            } else {
                this.showTopButton = false
            }
        },
        changeThem(event) {
            if (event.target.innerText === "LTR") {
                this.htmlTag.dir = "ltr"
            }
            else {
                this.htmlTag.dir = "rtl"
            }

        },

        changeMode() {
            if (this.htmlTag.className.includes("dark")) {
                this.htmlTag.className = 'light'
            } else {
                this.htmlTag.className = 'dark'
            }
        },

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    },

}
</script>

<style  scoped>

</style>