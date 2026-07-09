<template>
  <section
    class="relative py-24 bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="absolute inset-0 bg-gradient-to-r from-ldyc-blue/90 to-liturgical-purple/90" />
    <div class="container relative z-10">
      <div
        class="text-center max-w-3xl mx-auto"
        data-reveal
      >
        <p class="text-white/70 font-semibold uppercase tracking-[4px] text-sm mb-4">
          LDYC 2026
        </p>
        <h2 class="font-poppins font-black text-white text-4xl lg:text-5xl mb-6 leading-tight">
          Don't Let Your Fire Die.<br>
          <span class="text-ldyc-gold">It's Time to Ignite.</span>
        </h2>
        <p class="text-white/80 text-lg mb-10 max-w-xl mx-auto">
          Registration is open for Ignite 2026 — ONE Conference, ONE Altar, ONE Fire.
          Secure your place at the most anticipated youth event in the Diocese of Lagos.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/register"
            class="py-3 px-10 inline-block font-semibold tracking-wide rounded-full bg-white text-ldyc-blue hover:bg-gray-100 transition-all duration-300 shadow-xl text-base"
          >
            Register Now
          </router-link>
          <router-link
            to="/contact"
            class="py-3 px-10 inline-block font-semibold tracking-wide rounded-full border-2 border-white text-white hover:bg-white hover:text-ldyc-blue transition-all duration-300 text-base"
          >
            Contact Us
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useScrollReveal } from '@/composables/useScrollReveal'

export default {
  name: 'CtaBanner',

  setup() {
    useScrollReveal()
  },

  data() {
    return {
      bgImage: require('../../assets/images/bg/cta.jpg'),
    }
  },
}
</script>
