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
          Memories
        </p>
        <h1 class="font-poppins font-black text-white text-5xl lg:text-6xl">
          Gallery
        </h1>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="py-20 bg-white dark:bg-slate-900">
      <div class="container">
        <div
          class="text-center max-w-xl mx-auto mb-12"
          data-reveal
        >
          <h2 class="font-poppins font-bold text-3xl text-black dark:text-white mb-4">
            Moments That Last Forever
          </h2>
          <p class="text-slate-500 dark:text-slate-400">
            Snapshots from past LDYC conferences — worship, fellowship, and transformation in action.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div
            v-for="(img, index) in allImages"
            :key="index"
            :data-reveal="'scale'"
            :class="`delay-${(index % 4 + 1) * 100}`"
            class="cursor-pointer overflow-hidden rounded-2xl group relative"
            @click="openLightbox(index)"
          >
            <img
              :src="img"
              :alt="`LDYC Gallery ${index + 1}`"
              class="w-full h-52 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            >
            <div class="absolute inset-0 bg-ldyc-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <i
                data-feather="zoom-in"
                class="size-8 text-white drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <vue-easy-lightbox
      :visible="lightboxVisible"
      :imgs="allImages"
      :index="lightboxIndex"
      @hide="lightboxVisible = false"
    />

    <section class="relative overflow-hidden">
      <foo-ter />
      <switcher :switcher-back="true" />
    </section>
  </div>
</template>

<script>
import feather from 'feather-icons'
import VueEasyLightbox from 'vue-easy-lightbox'
import tagline from '@/components/tagline.vue'
import navbar from '@/components/navbar.vue'
import fooTer from '@/components/footer.vue'
import switcher from '@/components/switcher.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

export default {
  name: 'GalleryPage',

  components: { tagline, navbar, fooTer, switcher, VueEasyLightbox },

  setup() {
    useScrollReveal()
  },

  data() {
    return {
      heroBg: require('../../assets/images/bg/chaplains.jpg'),
      lightboxVisible: false,
      lightboxIndex: 0,
    }
  },

  computed: {
    allImages() {
      const images = []
      const fallbacks = [
        require('../../assets/images/bg/chaplains.jpg'),
        require('../../assets/images/bg/youths.jpg'),
        require('../../assets/images/bg/carol.jpg'),
        require('../../assets/images/bg/mashup.jpg'),
        require('../../assets/images/bg/cta.jpg'),
        require('../../assets/images/bg/chaplains.jpg'),
        require('../../assets/images/bg/youths.jpg'),
        require('../../assets/images/bg/carol.jpg'),
        require('../../assets/images/bg/mashup.jpg'),
        require('../../assets/images/camp.jpeg'),
      ]
      for (let i = 1; i <= 10; i++) {
        try {
          const idx = i < 10 ? `0${i}` : `${i}`
          images.push(require(`../../assets/images/gallery/gallery-${idx}.jpg`))
        } catch {
          images.push(fallbacks[i - 1])
        }
      }
      return images
    },
  },

  mounted() {
    window.scrollTo(0, 0)
    feather.replace()
  },

  methods: {
    openLightbox(index) {
      this.lightboxIndex = index
      this.lightboxVisible = true
    },
  },
}
</script>
