<template>
  <!-- Start Navbar -->
  <nav
    id="topnav"
    class="defaultscroll is-sticky"
    :class="tagLine"
  >
    <div class="container relative">
      <!-- Logo container-->
      <router-link
        v-if="navLight"
        to="/"
        class="logo"
      >
        <span class="inline-block dark:hidden">
          <img
            src="../assets/images/logo.png"
            class="h-10 l-dark"
            alt=""
          >
          <img
            src="../assets/images/logo-transbg.png"
            class="h-10 l-light"
            alt=""
          >
        </span>
        <img
          src="../assets/images/logo-transbg.png"
          class="hidden h-10 dark:inline-block"
          alt=""
        >
      </router-link>
      
      <router-link
        v-else
        to="/"
        class="logo"
      >
        <div>
          <img
            src="../assets/images/logo.png"
            class="h-10 inline-block dark:hidden"
            alt=""
          >
          <img
            src="../assets/images/logo-transbg.png"
            class="h-10 hidden dark:inline-block"
            alt=""
          >
        </div>
      </router-link>
      <!-- End Logo container-->

      <!-- Start Mobile Toggle -->
      <div
        class="menu-extras"
        @click="handler"
      >
        <div class="menu-item">
          <a
            id="isToggle"
            class="navbar-toggle"
            :class="toggle === false ? '' : 'open'"
          >
            <div class="lines">
              <span />
              <span />
              <span />
            </div>
          </a>
        </div>
      </div>
      <!-- End Mobile Toggle -->

      <div
        id="navigation"
        :class="toggle === false ? 'none' : 'block'"
      >
        <!-- Navigation Menu-->
        <ul
          class="navigation-menu justify-end"
          :class="menuLight"
        >
          <li :class="activeMenu === '/' ? 'active' : ''">
            <router-link to="/">
              Home
            </router-link>
          </li>

          <li :class="activeMenu === '/about' ? 'active' : ''">
            <router-link to="/about">
              About
            </router-link>
          </li>

          <li :class="activeMenu === '/programs' ? 'active' : ''">
            <router-link to="/programs">
              Programs
            </router-link>
          </li>

          <li :class="activeMenu === '/anglicanism' ? 'active' : ''">
            <router-link to="/anglicanism">
              Anglicanism
            </router-link>
          </li>

          <li :class="activeMenu === '/gallery' ? 'active' : ''">
            <router-link to="/gallery">
              Gallery
            </router-link>
          </li>

          <li :class="activeMenu === '/find-a-church' ? 'active' : ''">
            <router-link to="/find-a-church">
              Find a Church
            </router-link>
          </li>

          <li :class="activeMenu === '/contact' ? 'active' : ''">
            <router-link
              to="/contact"
              class="sub-menu-item"
            >
              Contact Us
            </router-link>
          </li>
        </ul>
        <!--end navigation menu-->

        <!-- <div class="buy-button">
          <ul class="list-none mb-0">
            <li class="inline">
              <router-link
                to="/register"
                class="py-2 px-5 inline-block font-semibold tracking-wide rounded-full bg-ldyc-blue hover:bg-blue-700 text-white text-sm transition-all duration-300 shadow-md hover:shadow-blue-500/30"
              >
                Register
              </router-link>
            </li>
          </ul>
        </div> -->
      </div>
      <!--end navigation-->
    </div>
    <!--end container-->
  </nav>
  <!--end header-->
  <!-- End Navbar -->
</template>

<script>
import feather from "feather-icons";
export default {
  name: "HelloWorld",
  props: {
    menuLight: {
      type: String,
      required: true,
    },
    tagLine: {
      type: String,
      required: true,
    },
    navLight: {
      type: Boolean,
      required: true,
    },
    // eslint-disable-next-line vue/require-prop-types
    searchMenu: {
      typr: String,
      required: true,
    },
  },
  data() {
    return {
      toggle: false,
      scroll: true,
      sections: document.querySelectorAll("section"),
      navLi: document.querySelectorAll("nav .container .navigation ul li"),
      sectionTop: null,
      activeMenu: "",
      menu: true,
      menuOpen: "",
      searchmenu: false,
      account: false,
    };
  },
  created() {
    this.activeMenu = window.location.pathname;
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    feather.replace();
    window.addEventListener("click", this.close);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handler: function () {
      this.toggle = !this.toggle;
    },

    // close(e) {
    //   if (!this.$el.contains(e.target)) {
    //     this.searchmenu = false;
    //     this.account = false;
    //   }
    // },
    toggleParagraph() {
      this.searchmenu = !this.searchmenu;
    },
    // submenu(item) {
    //   this.menu = !this.menu;
    //   this.menuOpen = item;
    // },
    handleScroll() {
      const navbar = document.getElementById("topnav");
      if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
      ) {
        navbar.classList.add("nav-sticky");
      } else {
        navbar.classList.remove("nav-sticky");
      }
    },
    toggleParagraph3() {
      this.account = !this.account;
    },
  },
};
</script>

<style scoped></style>
