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
      <div class="absolute inset-0 bg-deep-navy/80" />
      <div class="container relative z-10 text-center">
        <p class="text-ldyc-gold font-semibold uppercase tracking-[4px] text-sm mb-4">
          Diocese of Lagos Youth
        </p>
        <h1 class="font-poppins font-black text-white text-5xl lg:text-6xl">
          Upcoming Programs
        </h1>
      </div>
    </section>

    <!-- Featured: LDYC Camp -->
    <section class="py-20 bg-white dark:bg-slate-900">
      <div class="container">
        <div
          class="text-center mb-12"
          data-reveal
        >
          <p class="text-ldyc-blue font-semibold uppercase tracking-[4px] text-sm mb-3">
            Biggest Event of the Year
          </p>
          <h2 class="font-poppins font-bold text-3xl lg:text-4xl text-black dark:text-white">
            Featured Program
          </h2>
        </div>

        <!-- Featured Card -->
        <div
          class="relative rounded-3xl overflow-hidden min-h-[420px] flex items-end mb-16 cursor-pointer group"
          :style="{ backgroundImage: `url(${campImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
          data-reveal
          @click="openPreview(campImg)"
        >
          <div class="absolute top-4 right-4 z-20 bg-black/40 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <i
              data-feather="maximize-2"
              class="size-5 text-white"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div class="relative z-10 p-8 md:p-12 w-full">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span class="bg-ldyc-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                  Featured
                </span>
                <h2 class="font-poppins font-black text-white text-3xl md:text-4xl mb-3">
                  LDYC 2026 — Ignite
                </h2>
                <div class="flex flex-wrap gap-5 text-white/70 text-sm mb-4">
                  <span class="flex items-center gap-2">
                    <i
                      data-feather="calendar"
                      class="size-4 text-ldyc-gold"
                    />
                    Wednesday, July 22, 2026
                  </span>
                  <span class="flex items-center gap-2">
                    <i
                      data-feather="map-pin"
                      class="size-4 text-ldyc-gold"
                    />
                    Faith Plaza, Bariga, Lagos
                  </span>
                  <span class="flex items-center gap-2">
                    <i
                      data-feather="users"
                      class="size-4 text-ldyc-gold"
                    />
                    Open to all Diocese of Lagos Youth
                  </span>
                </div>
                <p class="text-white/70 max-w-xl">
                  The annual Lagos Diocese Youth Conference — four days of transformative worship,
                  powerful teaching, rich fellowship, and life-changing encounters with God.
                </p>
              </div>
              <router-link
                to="/register"
                class="py-3 px-8 inline-block font-semibold rounded-full bg-ldyc-blue hover:bg-blue-700 text-white transition-all duration-300 flex-shrink-0"
              >
                Register Now
              </router-link>
            </div>
          </div>
        </div>

        <!-- Coming Up Next: Living Praise -->
        <div
          class="relative rounded-3xl overflow-hidden min-h-[340px] flex items-end mb-16 cursor-pointer group"
          :style="{ backgroundImage: `url(${livingPraiseImg})`, backgroundSize: 'cover', backgroundPosition: 'center top' }"
          data-reveal
          @click="openPreview(livingPraiseImg)"
        >
          <div class="absolute top-4 right-4 z-20 bg-black/40 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <i
              data-feather="maximize-2"
              class="size-5 text-white"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div class="relative z-10 p-8 md:p-10 w-full">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span class="bg-liturgical-green text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                  Coming Up Next
                </span>
                <h2 class="font-poppins font-black text-white text-3xl md:text-4xl mb-3">
                  Living Praise 2026
                </h2>
                <p class="text-white/70 text-sm italic mb-3">
                  Living, Breathing, Praising till He comes... more than music
                </p>
                <div class="flex flex-wrap gap-5 text-white/70 text-sm">
                  <span class="flex items-center gap-2">
                    <i
                      data-feather="calendar"
                      class="size-4 text-ldyc-gold"
                    />
                    Friday, 19th June 2026 · 9:00 PM
                  </span>
                  <span class="flex items-center gap-2">
                    <i
                      data-feather="map-pin"
                      class="size-4 text-ldyc-gold"
                    />
                    All Souls' Church, Lekki
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Events -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(event, index) in events"
            :key="event.name"
            :data-reveal="'scale'"
            :class="`delay-${(index + 1) * 100}`"
            class="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div
              class="h-2 w-full"
              :style="{ backgroundColor: event.color }"
            />
            <div class="p-6">
              <span
                class="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block"
                :style="{ backgroundColor: event.color + '20', color: event.color }"
              >
                {{ event.type }}
              </span>
              <h3 class="font-poppins font-bold text-lg text-black dark:text-white mb-3">
                {{ event.name }}
              </h3>
              <div class="space-y-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
                <div class="flex items-center gap-2">
                  <i
                    data-feather="calendar"
                    class="size-4 flex-shrink-0"
                  />
                  {{ event.date }}
                </div>
                <div class="flex items-center gap-2">
                  <i
                    data-feather="map-pin"
                    class="size-4 flex-shrink-0"
                  />
                  {{ event.location }}
                </div>
              </div>
              <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {{ event.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stay Updated -->
    <section class="py-16 bg-off-white dark:bg-slate-800">
      <div class="container">
        <div
          class="text-center max-w-xl mx-auto"
          data-reveal
        >
          <h2 class="font-poppins font-bold text-2xl text-black dark:text-white mb-3">
            Stay Updated
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mb-6">
            Follow us on social media for the latest program announcements and updates.
          </p>
          <div class="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/Dioceseoflagosyouth"
              target="_blank"
              class="size-12 inline-flex items-center justify-center rounded-full bg-ldyc-blue text-white hover:bg-blue-700 transition-colors duration-300"
            >
              <i
                data-feather="facebook"
                class="size-5"
              />
            </a>
            <a
              href="https://www.instagram.com/dioceseoflagosyouth/"
              target="_blank"
              class="size-12 inline-flex items-center justify-center rounded-full bg-liturgical-purple text-white hover:opacity-80 transition-opacity duration-300"
            >
              <i
                data-feather="instagram"
                class="size-5"
              />
            </a>
            <a
              href="mailto:youthdirectoratedioceseoflagos@gmail.com"
              class="size-12 inline-flex items-center justify-center rounded-full bg-ldyc-gold text-white hover:opacity-80 transition-opacity duration-300"
            >
              <i
                data-feather="mail"
                class="size-5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden">
      <foo-ter />
      <switcher :switcher-back="true" />
    </section>

    <!-- Image Lightbox -->
    <transition name="fade">
      <div
        v-if="previewImg"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
        @click.self="closePreview"
      >
        <button
          class="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
          @click="closePreview"
        >
          <i
            data-feather="x"
            class="size-6"
          />
        </button>
        <img
          :src="previewImg"
          class="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
          alt="Event Flyer"
        >
      </div>
    </transition>
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
  name: 'ProgramsPage',

  components: { tagline, navbar, fooTer, switcher },

  setup() {
    useScrollReveal()
  },

  data() {
    return {
      heroBg: require('../../assets/images/bg/youths.jpg'),
      campImg: require('../../assets/images/ignite.jpeg'),
      livingPraiseImg: require('../../assets/images/vigil.jpeg'),
      previewImg: null,
      events: [
        {
          name: 'Pre-Camp Prayer Retreat',
          type: 'Retreat',
          date: 'June 2026 (Date TBA)',
          location: 'Diocese of Lagos',
          description: 'A day of fasting, prayer, and consecration for delegates and leaders in preparation for the main LDYC conference.',
          color: '#5b21b6',
        },
        {
          name: 'Camp Registration Deadline',
          type: 'Admin',
          date: 'July 2026 (Date TBA)',
          location: 'Online / Parish Secretaries',
          description: 'Ensure all registrations, payments, and delegate documentation are completed before the camp cutoff date.',
          color: '#9f1239',
        },
        {
          name: 'Post-Camp Connect',
          type: 'Fellowship',
          date: 'August 2026 (Date TBA)',
          location: 'Lagos',
          description: 'A reunion gathering to sustain the momentum from camp — accountability groups, testimonies, and continued discipleship.',
          color: '#166534',
        },
      ],
    }
  },

  mounted() {
    window.scrollTo(0, 0)
    feather.replace()
    window.addEventListener('keydown', this.handleKey)
  },

  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKey)
  },

  methods: {
    openPreview(img) {
      this.previewImg = img
      document.body.style.overflow = 'hidden'
      this.$nextTick(() => feather.replace())
    },
    closePreview() {
      this.previewImg = null
      document.body.style.overflow = ''
    },
    handleKey(e) {
      if (e.key === 'Escape') this.closePreview()
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
