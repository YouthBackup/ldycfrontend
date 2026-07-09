<template>
  <tagline />
  <navbar
    :menu-light="'nav-light'"
    :tag-line="'tagline-height'"
    :nav-light="true"
    :search-menu="'text-white'"
  />
  <hero-slider />
  <camp-countdown />
  <home-teasers />
  <gallery-preview />
  <cta-banner />
  <section class="relative overflow-hidden">
    <foo-ter />
    <switcher :switcher-back="true" />
  </section>
</template>

<script>
import tagline from '@/components/tagline.vue'
import navbar from '@/components/navbar.vue'
import fooTer from '@/components/footer.vue'
import switcher from '@/components/switcher.vue'
import HeroSlider from '@/components/home/HeroSlider.vue'
import CampCountdown from '@/components/home/CampCountdown.vue'
import HomeTeasers from '@/components/home/HomeTeasers.vue'
import GalleryPreview from '@/components/home/GalleryPreview.vue'
import CtaBanner from '@/components/home/CtaBanner.vue'

export default {
  name: 'IndexPage',

  components: {
    tagline,
    navbar,
    fooTer,
    switcher,
    HeroSlider,
    CampCountdown,
    HomeTeasers,
    GalleryPreview,
    CtaBanner,
  },

  mounted() {
    window.scrollTo(0, 0)
  },
}
</script>
