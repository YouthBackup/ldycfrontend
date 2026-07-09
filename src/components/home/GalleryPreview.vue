<template>
  <section class="relative py-20 bg-white dark:bg-slate-800">
    <div class="container">
      <div class="flex flex-wrap items-end justify-between mb-10 gap-4">
        <div data-reveal>
          <p class="text-ldyc-blue font-semibold uppercase tracking-[4px] text-sm mb-3">
            Gallery
          </p>
          <h2 class="font-poppins font-bold text-3xl lg:text-4xl text-black dark:text-white">
            Moments That Last Forever
          </h2>
        </div>
        <router-link
          to="/gallery"
          data-reveal="right"
          class="inline-flex items-center gap-2 text-ldyc-blue font-semibold hover:gap-3 transition-all duration-300"
        >
          View Full Gallery
          <i
            data-feather="arrow-right"
            class="size-4"
          />
        </router-link>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div
          v-for="(img, index) in previewImages"
          :key="index"
          :data-reveal="'scale'"
          :class="`delay-${(index + 1) * 100}`"
          class="cursor-pointer overflow-hidden rounded-2xl group relative"
          @click="$router.push('/gallery')"
        >
          <img
            :src="img"
            :alt="`LDYC Gallery ${index + 1}`"
            class="w-full h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
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
</template>

<script>
import feather from 'feather-icons'
import { useScrollReveal } from '@/composables/useScrollReveal'

export default {
  name: 'GalleryPreview',

  setup() {
    useScrollReveal()
  },

  computed: {
    previewImages() {
      const images = []
      for (let i = 1; i <= 4; i++) {
        try {
          images.push(require(`../../assets/images/gallery/gallery-0${i}.jpg`))
        } catch {
          const fallbacks = [
            require('../../assets/images/bg/chaplains.jpg'),
            require('../../assets/images/bg/youths.jpg'),
            require('../../assets/images/bg/carol.jpg'),
            require('../../assets/images/bg/mashup.jpg'),
          ]
          images.push(fallbacks[i - 1])
        }
      }
      return images
    },
  },

  mounted() {
    feather.replace()
  },
}
</script>
