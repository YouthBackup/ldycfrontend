<template>
  <section
    class="relative py-24 bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="absolute inset-0 bg-deep-navy/85" />

    <div class="container relative z-10">
      <div
        class="text-center mb-12"
        data-reveal
      >
        <p class="text-ldyc-gold font-semibold uppercase tracking-[4px] text-sm mb-3">
          Mark Your Calendar
        </p>
        <h2 class="font-poppins font-black text-white text-4xl lg:text-5xl mb-2">
          IGNITE 2026
        </h2>
        <p class="text-white/60 text-lg italic font-light">
          Fan It To Flame — 2 Timothy 1:6
        </p>
      </div>

      <vue-countdown
        v-if="timeLeft > 0"
        v-slot="{ days, hours, minutes, seconds }"
        :time="timeLeft"
      >
        <div
          class="flex flex-wrap justify-center gap-4 mb-12"
          data-reveal
        >
          <div
            v-for="unit in buildUnits(days, hours, minutes, seconds)"
            :key="unit.label"
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 min-w-[120px] text-center"
          >
            <span class="font-poppins font-bold text-5xl lg:text-6xl text-white block leading-none">
              {{ String(unit.value).padStart(2, '0') }}
            </span>
            <span class="text-xs uppercase tracking-widest text-white/60 mt-2 block">
              {{ unit.label }}
            </span>
          </div>
        </div>
      </vue-countdown>

      <div
        v-else
        class="text-center text-white/70 text-xl mb-12"
        data-reveal
      >
        The conference is here! See you at Faith Plaza, Bariga.
      </div>

      <div
        class="flex flex-wrap justify-center gap-6 text-white/70 text-sm mb-10"
        data-reveal
      >
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
      </div>

      <div
        class="text-center"
        data-reveal
      >
        <router-link
          to="/register"
          class="py-3 px-10 inline-block font-semibold tracking-wide rounded-full bg-ldyc-blue hover:bg-blue-700 text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/30 text-base"
        >
          Secure Your Spot
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import feather from 'feather-icons'
import VueCountdown from '@chenfengyuan/vue-countdown'

export default {
  name: 'CampCountdown',

  components: { VueCountdown },

  data() {
    return {
      bgImage: require('../../assets/images/ignite.jpeg'),
      timeLeft: new Date('Jul 22, 2026 00:00:00').getTime() - Date.now(),
    }
  },

  mounted() {
    feather.replace()
  },

  methods: {
    buildUnits(days, hours, minutes, seconds) {
      return [
        { value: days, label: 'Days' },
        { value: hours, label: 'Hours' },
        { value: minutes, label: 'Minutes' },
        { value: seconds, label: 'Seconds' },
      ]
    },
  },
}
</script>
