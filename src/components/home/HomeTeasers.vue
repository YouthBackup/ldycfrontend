<template>
  <section class="relative py-20 bg-off-white dark:bg-slate-900">
    <div class="container">
      <div
        class="text-center max-w-2xl mx-auto mb-14"
        data-reveal
      >
        <p class="text-ldyc-blue font-semibold uppercase tracking-[4px] text-sm mb-3">
          Explore
        </p>
        <h2 class="font-poppins font-bold text-3xl lg:text-4xl text-black dark:text-white mb-4">
          Everything You Need to Know
        </h2>
        <p class="text-slate-500 dark:text-slate-400">
          From understanding the Anglican faith to finding your nearest parish — we've got you covered.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <router-link
          v-for="(card, index) in cards"
          :key="card.title"
          :to="card.link"
          :data-reveal="index % 2 === 0 ? 'left' : 'right'"
          :class="`delay-${(index + 1) * 100}`"
          class="group bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 flex gap-6 items-start"
        >
          <div
            :class="['rounded-2xl p-4 flex-shrink-0 transition-colors duration-300', card.iconBg]"
          >
            <i
              :data-feather="card.icon"
              :class="['size-7', card.iconColor]"
            />
          </div>
          <div class="flex-1">
            <h3 class="font-poppins font-bold text-xl text-black dark:text-white mb-2 group-hover:text-ldyc-blue transition-colors duration-300">
              {{ card.title }}
            </h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
              {{ card.description }}
            </p>
            <span :class="['inline-flex items-center gap-2 text-sm font-semibold', card.linkColor]">
              {{ card.cta }}
              <i
                data-feather="arrow-right"
                class="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import feather from 'feather-icons'
import { useScrollReveal } from '@/composables/useScrollReveal'

export default {
  name: 'HomeTeasers',

  setup() {
    useScrollReveal()
  },

  data() {
    return {
      cards: [
        {
          icon: 'users',
          iconBg: 'bg-ldyc-blue/10 group-hover:bg-ldyc-blue/20',
          iconColor: 'text-ldyc-blue',
          linkColor: 'text-ldyc-blue',
          title: 'About LDYC',
          description: 'Learn about the Lagos Diocese Youth Conference — our mission, our history, and why thousands of young Anglicans come together every year for four transformative days.',
          cta: 'Our Story',
          link: '/about',
        },
        {
          icon: 'book-open',
          iconBg: 'bg-liturgical-purple/10 group-hover:bg-liturgical-purple/20',
          iconColor: 'text-liturgical-purple',
          linkColor: 'text-liturgical-purple',
          title: 'What is Anglicanism?',
          description: 'New to the Anglican faith? Discover the history, beliefs, and worship practices of one of the world\'s largest Christian traditions — and what makes it come alive for young people today.',
          cta: 'Discover the Faith',
          link: '/anglicanism',
        },
        {
          icon: 'calendar',
          iconBg: 'bg-ldyc-gold/10 group-hover:bg-ldyc-gold/20',
          iconColor: 'text-ldyc-gold',
          linkColor: 'text-ldyc-gold',
          title: 'Upcoming Programs',
          description: 'From the annual camp to pre-camp retreats and post-camp fellowships — see all the exciting events planned for Diocese of Lagos Youth this year.',
          cta: 'View Events',
          link: '/programs',
        },
        {
          icon: 'map-pin',
          iconBg: 'bg-liturgical-green/10 group-hover:bg-liturgical-green/20',
          iconColor: 'text-liturgical-green',
          linkColor: 'text-liturgical-green',
          title: 'Find a Church',
          description: 'Looking for an Anglican parish near you in Lagos? Browse the full directory of Diocese of Lagos churches across every archdeaconry and get directions.',
          cta: 'Find a Parish',
          link: '/find-a-church',
        },
      ],
    }
  },

  mounted() {
    feather.replace()
  },
}
</script>
