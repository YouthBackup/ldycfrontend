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
      <div class="absolute inset-0 bg-liturgical-purple/80" />
      <div class="container relative z-10 text-center">
        <p class="text-ldyc-gold font-semibold uppercase tracking-[4px] text-sm mb-4">
          Faith & Heritage
        </p>
        <h1 class="font-poppins font-black text-white text-5xl lg:text-6xl mb-4">
          What is Anglicanism?
        </h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">
          A 500-year-old tradition rooted in Scripture, expressed through liturgy, and alive in 165 countries today.
        </p>
      </div>
    </section>

    <!-- Intro -->
    <section class="py-20 bg-white dark:bg-slate-900">
      <div class="container">
        <div
          class="max-w-3xl mx-auto text-center"
          data-reveal
        >
          <p class="text-ldyc-blue font-semibold uppercase tracking-[4px] text-sm mb-3">
            An Introduction
          </p>
          <h2 class="font-poppins font-bold text-3xl lg:text-4xl text-black dark:text-white mb-6">
            Ancient Faith. Living Church.
          </h2>
          <p class="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
            Anglicanism is a tradition within the global Christian Church that traces its roots to the
            16th-century English Reformation. It holds Scripture as the supreme authority, worships
            through ordered liturgy anchored in the Book of Common Prayer, and embraces both Catholic
            heritage and Protestant theology. Today, the Anglican Communion is the third-largest Christian
            body in the world — with over 85 million members across 165 countries.
          </p>
        </div>
      </div>
    </section>

    <!-- Six Deep-Dive Cards -->
    <section class="py-20 bg-off-white dark:bg-slate-800">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="(topic, index) in topics"
            :key="topic.title"
            :data-reveal="index % 2 === 0 ? 'left' : 'right'"
            :class="`delay-${(index % 3 + 1) * 100}`"
            class="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div
              :class="['rounded-2xl p-4 inline-block mb-5', topic.iconBg]"
            >
              <i
                :data-feather="topic.icon"
                :class="['size-7', topic.iconColor]"
              />
            </div>
            <h3 class="font-poppins font-bold text-xl text-black dark:text-white mb-3">
              {{ topic.title }}
            </h3>
            <p class="text-slate-500 dark:text-slate-400 leading-relaxed">
              {{ topic.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Liturgical Seasons Strip -->
    <section class="py-16 bg-deep-navy">
      <div class="container">
        <div
          class="text-center mb-12"
          data-reveal
        >
          <p class="text-ldyc-gold font-semibold uppercase tracking-[4px] text-sm mb-3">
            The Rhythm of Worship
          </p>
          <h2 class="font-poppins font-bold text-white text-3xl">
            The Liturgical Calendar
          </h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div
            v-for="(season, index) in seasons"
            :key="season.name"
            :data-reveal="'scale'"
            :class="`delay-${(index + 1) * 100}`"
            class="rounded-2xl p-5 text-center"
            :style="{ backgroundColor: season.bg }"
          >
            <div class="font-poppins font-bold text-white text-sm mb-1">
              {{ season.name }}
            </div>
            <div class="text-white/70 text-xs">
              {{ season.period }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-white dark:bg-slate-900">
      <div class="container">
        <div
          class="text-center max-w-2xl mx-auto"
          data-reveal
        >
          <h2 class="font-poppins font-bold text-3xl text-black dark:text-white mb-4">
            Ready to Experience Anglican Worship?
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mb-8">
            Find a parish near you in the Diocese of Lagos and join a community of faith.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <router-link
              to="/find-a-church"
              class="py-3 px-8 inline-block font-semibold rounded-full bg-ldyc-blue hover:bg-blue-700 text-white transition-all duration-300"
            >
              Find a Church
            </router-link>
            <router-link
              to="/register"
              class="py-3 px-8 inline-block font-semibold rounded-full border-2 border-ldyc-blue text-ldyc-blue hover:bg-ldyc-blue hover:text-white transition-all duration-300"
            >
              Join LDYC 2026
            </router-link>
          </div>
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
  name: 'AnglicnismPage',

  components: { tagline, navbar, fooTer, switcher },

  setup() {
    useScrollReveal()
  },

  data() {
    return {
      heroBg: require('../../assets/images/bg/mashup.jpg'),
      topics: [
        {
          icon: 'book-open',
          iconBg: 'bg-ldyc-blue/10',
          iconColor: 'text-ldyc-blue',
          title: 'Our History',
          body: 'Anglicanism emerged during the English Reformation of the 16th century. While Henry VIII\'s break from Rome began the institutional separation, it was the theological reformers — Cranmer, Latimer, and Ridley — who shaped an evangelical, scripture-centred tradition. The Anglican faith came to Nigeria through the Church Missionary Society in 1842, taking root in Lagos and spreading across the nation.',
        },
        {
          icon: 'heart',
          iconBg: 'bg-liturgical-purple/10',
          iconColor: 'text-liturgical-purple',
          title: 'What We Believe',
          body: 'Anglicanism holds to the supreme authority of Scripture in all matters of faith and conduct. We affirm the Apostles\' Creed and the Nicene Creed, and are guided by the 39 Articles of Religion. We believe in one God — Father, Son, and Holy Spirit — salvation by grace through faith, the two sacraments of Baptism and the Lord\'s Supper, and the visible, universal Church of Christ.',
        },
        {
          icon: 'music',
          iconBg: 'bg-ldyc-gold/10',
          iconColor: 'text-ldyc-gold',
          title: 'How We Worship',
          body: 'Anglican worship is ordered, liturgical, and Spirit-filled. The Book of Common Prayer, first compiled by Archbishop Thomas Cranmer in 1549, anchors our worship with prayers that have shaped centuries of believers. Our services centre on the proclamation of Scripture, corporate prayer, and the celebration of the Eucharist. We follow the liturgical calendar — moving through Advent, Christmas, Epiphany, Lent, Easter, and Pentecost.',
        },
        {
          icon: 'globe',
          iconBg: 'bg-liturgical-green/10',
          iconColor: 'text-liturgical-green',
          title: 'The Anglican Communion',
          body: 'The Anglican Communion is a global family of 42 autonomous provinces united by a common faith, shared liturgical heritage, and relationship with the Archbishop of Canterbury. With over 85 million members in 165 countries, it is the third-largest Christian body in the world. The Global Anglican Future Conference (GAFCON) brings together orthodox provinces committed to biblical faithfulness.',
        },
        {
          icon: 'flag',
          iconBg: 'bg-liturgical-red/10',
          iconColor: 'text-liturgical-red',
          title: 'Church of Nigeria',
          body: 'The Church of Nigeria (Anglican Communion) is one of the largest Anglican provinces globally, with millions of faithful worshippers. It is led by the Most Revd Henry Ndukuba (Primate) and is organised into multiple ecclesiastical provinces and over 170 dioceses. The Diocese of Lagos, under the leadership of the Bishop of Lagos, encompasses parishes across Lagos State and remains a vibrant centre of Anglican life.',
        },
        {
          icon: 'users',
          iconBg: 'bg-deep-navy/10',
          iconColor: 'text-deep-navy dark:text-white',
          title: 'Youth in the Church',
          body: 'Young Anglicans are not the church of tomorrow — we are the church of today. The Directorate of Youth, Diocese of Lagos, exists to equip, disciple, and deploy young people for Christ. Through the Lagos Diocese Youth Conference, youth fellowships, camps, and leadership training, we are raising a generation that will transform Nigeria and the world for God\'s glory.',
        },
      ],
      seasons: [
        { name: 'Advent', period: 'Pre-Christmas', bg: '#4c1d95' },
        { name: 'Christmas', period: 'Dec 25', bg: '#d97706' },
        { name: 'Epiphany', period: 'Jan 6+', bg: '#0369a1' },
        { name: 'Lent', period: '40 Days', bg: '#6b21a8' },
        { name: 'Easter', period: 'Resurrection', bg: '#d97706' },
        { name: 'Pentecost', period: 'Ordinary Time', bg: '#166534' },
      ],
    }
  },

  mounted() {
    window.scrollTo(0, 0)
    feather.replace()
  },
}
</script>
