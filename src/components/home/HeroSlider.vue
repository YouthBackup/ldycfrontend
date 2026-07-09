<template>
  <section class="relative block h-screen">
    <swiper
      class="w-full h-full"
      :modules="modules"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :loop="true"
      :effect="'fade'"
      :pagination="{ clickable: true }"
    >
      <swiper-slide
        v-for="(slide, index) in slides"
        :key="index"
        class="relative flex items-center overflow-hidden h-screen"
      >
        <div
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${slide.image})` }"
        />
        <div :class="['absolute inset-0 bg-gradient-to-r', slide.gradient]" />
        <div class="container relative z-10">
          <div class="grid grid-cols-1 max-w-3xl">
            <p class="slide-animate text-sm font-semibold uppercase tracking-[4px] text-white/70 mb-4">
              {{ slide.label }}
            </p>
            <h1 class="slide-animate-delay font-poppins font-black text-white leading-tight text-4xl lg:text-6xl mb-6">
              {{ slide.headline }}
            </h1>
            <p class="slide-animate-delay text-white/80 text-lg max-w-lg mb-8">
              {{ slide.sub }}
            </p>
            <div class="slide-animate-delay-2 flex flex-wrap gap-4">
              <router-link
                to="/register"
                class="py-3 px-8 inline-block font-semibold tracking-wide rounded-full bg-ldyc-blue hover:bg-blue-700 text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
              >
                Register Now
              </router-link>
              <router-link
                to="/about"
                class="py-3 px-8 inline-block font-semibold tracking-wide rounded-full border-2 border-white text-white hover:bg-white hover:text-deep-navy transition-all duration-300"
              >
                Learn More
              </router-link>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="swiper-pagination" />
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

export default {
  name: 'HeroSlider',

  components: { Swiper, SwiperSlide },

  data() {
    return {
      modules: [Autoplay, Pagination, EffectFade],
      slides: [
        {
          image: require('../../assets/images/bg/chaplains.jpg'),
          gradient: 'from-black/85 via-black/60 to-ldyc-blue/20',
          label: 'Lagos Diocese Youth Conference 2026',
          headline: 'Don\'t Let Your Fire Die.',
          sub: 'Ignite 2026 is here — ONE Conference, ONE Altar, ONE Fire. Fan the gift of God into flame. Be there, be transformed.',
        },
        {
          image: require('../../assets/images/bg/youths.jpg'),
          gradient: 'from-black/85 via-black/60 to-liturgical-purple/20',
          label: 'i-BURN · i-SHINE · i-IGNITE',
          headline: 'Stir That Gift. Fan It To Flame.',
          sub: 'Three days of powerful encounters — i-BURN, i-SHINE, i-IGNITE. July 22–25, 2026 · Faith Plaza, Bariga.',
        },
        {
          image: require('../../assets/images/bg/mashup.jpg'),
          gradient: 'from-black/85 via-black/60 to-ldyc-gold/20',
          label: 'Discover Anglicanism',
          headline: 'A Faith Rooted in Scripture. A Church for Today.',
          sub: 'Explore the rich heritage of Anglicanism — ancient truth, living worship, and a global community of believers.',
        },
        {
          image: require('../../assets/images/bg/carol.jpg'),
          gradient: 'from-black/85 via-black/60 to-liturgical-green/20',
          label: 'Community & Fellowship',
          headline: 'Find Your People. Find Your Parish.',
          sub: 'Locate Anglican churches across the Diocese of Lagos. Every parish is a home, every member a family.',
        },
      ],
    }
  },
}
</script>

<style scoped>
.swiper-pagination {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
}
</style>
