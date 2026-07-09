<template>
  <div>
    <tagline />
    <navbar
      :menu-light="'nav-light'"
      :tag-line="'tagline-height'"
      :nav-light="true"
      :search-menu="''"
    />

    <!-- Hero Banner -->
    <section
      class="relative py-36 bg-cover bg-center"
      :style="{ backgroundImage: `url(${heroBg})` }"
    >
      <div class="absolute inset-0 bg-deep-navy/75" />
      <div class="container relative z-10 text-center">
        <p class="text-ldyc-gold font-semibold uppercase tracking-[4px] text-sm mb-4">
          Who We Are
        </p>
        <h1 class="font-poppins font-black text-white text-5xl lg:text-6xl">
          About LDYC
        </h1>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 bg-white dark:bg-slate-900">
      <div class="container">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div data-reveal="left">
            <div class="relative">
              <img
                :src="aboutImg"
                alt="LDYC Youth"
                class="w-full rounded-3xl object-cover h-[450px]"
              >
              <div class="absolute -bottom-4 -right-4 w-64 h-64 bg-ldyc-blue/10 rounded-3xl -z-10" />
              <div class="absolute -top-4 -left-4 w-32 h-32 bg-liturgical-purple/10 rounded-2xl -z-10" />
            </div>
          </div>
          <div data-reveal="right">
            <p class="text-ldyc-blue font-semibold uppercase tracking-[4px] text-sm mb-3">
              Our Story
            </p>
            <h2 class="font-poppins font-bold text-3xl lg:text-4xl text-black dark:text-white mb-6">
              A Bold Generation Rooted in Christ
            </h2>
            <p class="text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              The Lagos Diocese Youth Conference (LDYC) is the flagship annual gathering of the Directorate of
              Youth, Diocese of Lagos (Anglican Communion). Every year, thousands of young Anglicans from
              across the diocese come together for four transformative days of worship, teaching, fellowship,
              and spiritual renewal.
            </p>
            <p class="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              More than a conference, LDYC is a movement — raising a bold generation that is rooted in
              Scripture, empowered by the Spirit, and committed to servant leadership in the Church and society.
            </p>
            <router-link
              to="/register"
              class="py-3 px-8 inline-block font-semibold tracking-wide rounded-full bg-ldyc-blue hover:bg-blue-700 text-white transition-all duration-300"
            >
              Register for LDYC 2026
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 bg-off-white dark:bg-slate-800">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            :data-reveal="'scale'"
            :class="`delay-${(index + 1) * 100}`"
            class="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center shadow-md"
          >
            <div
              class="font-poppins font-black text-4xl lg:text-5xl mb-2"
              :class="stat.color"
            >
              {{ stat.value }}
            </div>
            <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision & Mission -->
    <section class="py-20 bg-white dark:bg-slate-900">
      <div class="container">
        <div
          class="text-center max-w-2xl mx-auto mb-14"
          data-reveal
        >
          <p class="text-ldyc-blue font-semibold uppercase tracking-[4px] text-sm mb-3">
            What Drives Us
          </p>
          <h2 class="font-poppins font-bold text-3xl lg:text-4xl text-black dark:text-white">
            Vision & Mission
          </h2>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          <div
            class="bg-ldyc-blue rounded-3xl p-10 text-white"
            data-reveal="left"
          >
            <div class="bg-white/20 rounded-2xl p-4 inline-block mb-6">
              <i
                data-feather="eye"
                class="size-8 text-white"
              />
            </div>
            <h3 class="font-poppins font-bold text-2xl mb-4">
              Our Vision
            </h3>
            <p class="text-white/80 leading-relaxed">
              To raise a generation of bold, faith-filled young Anglicans who are equipped to transform
              their communities, lead in the Church, and impact Nigeria and the world for Christ.
            </p>
          </div>
          <div
            class="bg-liturgical-purple rounded-3xl p-10 text-white"
            data-reveal="right"
          >
            <div class="bg-white/20 rounded-2xl p-4 inline-block mb-6">
              <i
                data-feather="target"
                class="size-8 text-white"
              />
            </div>
            <h3 class="font-poppins font-bold text-2xl mb-4">
              Our Mission
            </h3>
            <p class="text-white/80 leading-relaxed">
              To provide a platform for the spiritual formation, theological grounding, and practical
              discipleship of young people in the Diocese of Lagos through worship, teaching,
              fellowship, and service.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Scripture Quote -->
    <section class="py-20 bg-deep-navy">
      <div class="container">
        <div
          class="text-center max-w-3xl mx-auto"
          data-reveal
        >
          <i
            data-feather="book-open"
            class="size-10 text-ldyc-gold mx-auto mb-6"
          />
          <blockquote class="font-poppins font-bold text-white text-2xl lg:text-3xl leading-relaxed mb-6 italic">
            "For this reason I remind you to fan into flame the gift of God,
            which is in you through the laying on of my hands."
          </blockquote>
          <p class="text-ldyc-gold font-semibold tracking-widest text-sm uppercase">
            2 Timothy 1:6
          </p>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden">
      <foo-ter />
      <switcher :switcher-back="true" />
    </section>
  </div>
</template>

<script>
import feather from 'feather-icons'
import tagline from '@/components/tagline.vue'
import navbar from '@/components/navbar.vue'
import fooTer from '@/components/footer.vue'
import switcher from '@/components/switcher.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

export default {
  name: 'AboutPage',

  components: { tagline, navbar, fooTer, switcher },

  setup() {
    useScrollReveal()
  },

  data() {
    return {
      heroBg: require('../../assets/images/bg/chaplains.jpg'),
      aboutImg: require('../../assets/images/bg/carol.jpg'),
      stats: [
        { value: '20+', label: 'Years of Conference', color: 'text-ldyc-blue' },
        { value: '1,200+', label: 'Campers Annually', color: 'text-liturgical-purple' },
        { value: '80+', label: 'Participating Churches', color: 'text-ldyc-gold' },
        { value: '18', label: 'Archdeaconries', color: 'text-liturgical-green' },
      ],
    }
  },

  mounted() {
    window.scrollTo(0, 0)
    feather.replace()
  },
}
</script>
