<template>
  <section
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-off-white px-4 py-12 dark:bg-slate-900"
  >
    <!-- Decorative background -->
    <div
      class="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-ldyc-blue/20 blur-3xl"
    />
    <div
      class="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-ldyc-gold/20 blur-3xl"
    />

    <transition
      appear
      name="card"
    >
      <div
        class="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-800"
      >
        <!-- Top accent bar -->
        <div class="h-1.5 w-full bg-gradient-to-r from-ldyc-blue to-ldyc-gold" />

        <div class="px-8 py-10 text-center">
          <!-- Logo -->
          <router-link to="/">
            <img
              src="../../../assets/images/doylogo.png"
              alt="LDYC Logo"
              class="mx-auto h-20 w-20 object-contain"
            >
          </router-link>

          <!-- Icon badge -->
          <div
            class="relative mx-auto mt-6 flex h-20 w-20 items-center justify-center"
          >
            <span
              class="ping-ring absolute inset-0 rounded-full bg-ldyc-blue/10"
            />
            <span
              class="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-ldyc-blue to-indigo-600 text-white shadow-lg shadow-ldyc-blue/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="h-8 w-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </span>
          </div>

          <!-- Eyebrow -->
          <p
            class="mt-6 text-xs font-semibold uppercase tracking-[4px] text-ldyc-gold"
          >
            LDYC26
          </p>

          <!-- Heading -->
          <h1
            class="mt-2 font-poppins text-3xl font-extrabold text-black dark:text-white"
          >
            Registration Closed
          </h1>

          <!-- Message -->
          <p
            class="mx-auto mt-3 max-w-sm leading-relaxed text-slate-500 dark:text-slate-400"
          >
            We're sorry, but registration for
            <span class="font-semibold text-ldyc-blue">LDYC26</span>
            has now closed. Thank you for your interest &mdash; keep an eye out
            for future opportunities!
          </p>

          <!-- CTA -->
          <button
            class="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ldyc-blue to-indigo-600 px-8 py-3 font-semibold text-white shadow-md shadow-ldyc-blue/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ldyc-blue/40 focus:outline-none focus:ring-2 focus:ring-ldyc-blue/50 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            @click="router.push('/')"
          >
            Back to Home
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>

          <!-- Footer note -->
          <p class="mt-6 text-xs text-slate-400 dark:text-slate-500">
            Diocese of Lagos Youth Conference
          </p>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import router from "@/router";
</script>

<style scoped>
/* Entrance animation (fires on mount via <transition appear>) */
.card-enter-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.card-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.96);
}

/* Slow expanding ring behind the icon */
.ping-ring {
  animation: ping-ring 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes ping-ring {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  75%,
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>
