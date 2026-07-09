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
      <div class="absolute inset-0 bg-liturgical-green/80" />
      <div class="container relative z-10 text-center">
        <p class="text-ldyc-gold font-semibold uppercase tracking-[4px] text-sm mb-4">
          Diocese of Lagos
        </p>
        <h1 class="font-poppins font-black text-white text-5xl lg:text-6xl mb-4">
          Find a Church
        </h1>
        <p class="text-white/80 text-lg max-w-xl mx-auto">
          Discover your nearest Anglican parish across the Diocese of Lagos.
        </p>
      </div>
    </section>

    <!-- Search & Filter -->
    <section class="py-16 bg-off-white dark:bg-slate-900">
      <div class="container">
        <div
          class="max-w-2xl mx-auto mb-10"
          data-reveal
        >
          <label class="block text-sm font-semibold text-black dark:text-white mb-2">
            Filter by Archdeaconry
          </label>
          <select
            v-model="selectedArchdeaconry"
            class="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-black dark:text-white focus:ring-2 focus:ring-ldyc-blue focus:border-ldyc-blue transition-colors text-sm"
          >
            <option value="">
              All Archdeaconries ({{ totalParishes }} parishes)
            </option>
            <option
              v-for="arch in churches"
              :key="arch.archdeaconry"
              :value="arch.archdeaconry"
            >
              {{ arch.archdeaconry }} ({{ arch.parishes.length }} parishes)
            </option>
          </select>
        </div>

        <!-- Results count -->
        <p
          class="text-slate-500 dark:text-slate-400 text-sm mb-8 text-center"
          data-reveal
        >
          Showing <strong class="text-black dark:text-white">{{ filteredParishes.length }}</strong> parishes
          <span v-if="selectedArchdeaconry"> in {{ selectedArchdeaconry }}</span>
        </p>

        <!-- Church Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(parish, index) in filteredParishes"
            :key="`${parish.archdeaconry}-${parish.name}`"
            :data-reveal="'scale'"
            :class="`delay-${(index % 3 + 1) * 100}`"
            class="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-poppins font-semibold text-base text-black dark:text-white leading-snug flex-1 pr-2">
                {{ parish.name }}
              </h3>
              <span class="bg-ldyc-blue/10 text-ldyc-blue text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                {{ archdeaconyShort(parish.archdeaconry) }}
              </span>
            </div>
            <div class="flex items-start gap-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
              <i
                data-feather="map-pin"
                class="size-4 text-ldyc-blue flex-shrink-0 mt-0.5"
              />
              <span>{{ parish.archdeaconry }}</span>
            </div>
            <a
              :href="mapsLink(parish.name)"
              target="_blank"
              class="inline-flex items-center gap-2 text-sm font-semibold text-ldyc-blue hover:text-blue-700 transition-colors duration-300"
            >
              <i
                data-feather="navigation"
                class="size-4"
              />
              Get Directions
            </a>
          </div>
        </div>

        <div
          v-if="filteredParishes.length === 0"
          class="text-center py-20 text-slate-400"
          data-reveal
        >
          <i
            data-feather="search"
            class="size-12 mx-auto mb-4 opacity-30"
          />
          <p class="font-poppins font-semibold text-lg">
            No parishes found.
          </p>
        </div>
      </div>
    </section>

    <!-- Can't Find Your Church? -->
    <section class="py-16 bg-white dark:bg-slate-800">
      <div class="container">
        <div
          class="text-center max-w-xl mx-auto"
          data-reveal
        >
          <h2 class="font-poppins font-bold text-2xl text-black dark:text-white mb-3">
            Can't Find Your Parish?
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mb-6">
            Reach out to the Directorate of Youth and we'll help you connect with the nearest church.
          </p>
          <router-link
            to="/contact"
            class="py-3 px-8 inline-block font-semibold rounded-full bg-ldyc-blue hover:bg-blue-700 text-white transition-all duration-300"
          >
            Contact Us
          </router-link>
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
import churches from '../../../churches.json'
import tagline from '@/components/tagline.vue'
import navbar from '@/components/navbar.vue'
import fooTer from '@/components/footer.vue'
import switcher from '@/components/switcher.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

export default {
  name: 'FindAChurchPage',

  components: { tagline, navbar, fooTer, switcher },

  setup() {
    useScrollReveal()
  },

  data() {
    return {
      heroBg: require('../../assets/images/bg/mashup.jpg'),
      churches,
      selectedArchdeaconry: '',
    }
  },

  computed: {
    totalParishes() {
      return this.churches.reduce((sum, a) => sum + a.parishes.length, 0)
    },

    flatParishes() {
      return this.churches.flatMap((arch) =>
        arch.parishes.map((name) => ({ name, archdeaconry: arch.archdeaconry }))
      )
    },

    filteredParishes() {
      if (!this.selectedArchdeaconry) return this.flatParishes
      return this.flatParishes.filter((p) => p.archdeaconry === this.selectedArchdeaconry)
    },
  },

  mounted() {
    window.scrollTo(0, 0)
    feather.replace()
  },

  updated() {
    feather.replace()
  },

  methods: {
    mapsLink(churchName) {
      const query = encodeURIComponent(`${churchName} Lagos Nigeria`)
      return `https://www.google.com/maps/search/?api=1&query=${query}`
    },

    archdeaconyShort(name) {
      return name.replace(' Archdeaconry', '').replace(' Missionary', '')
    },
  },
}
</script>
