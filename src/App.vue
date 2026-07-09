<template>
  <div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      activeMenu:''
    }
  },
  mounted() {
    this.scrollToTop()
    
  },
  created(){
    this.activeMenu = window.location.pathname;
  },
  methods: {
    scrollToTop() {
            window.scrollTo(0,0);
        }
  },
}
</script>

<style></style>