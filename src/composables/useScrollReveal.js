import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(selector = '[data-reveal]', options = {}) {
  let observer

  const defaults = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
    ...options,
  }

  onMounted(() => {
    const elements = document.querySelectorAll(selector)
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, defaults)
    elements.forEach((el) => observer.observe(el))
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
