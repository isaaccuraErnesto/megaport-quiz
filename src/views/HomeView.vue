<template>
  <div class="home">
    <img alt="Megaport Logo"
      src="https://portal.megaport.com/img/Megaport-Logo-Web-72dpi-RGB.4d150500.png">
    <home-info message="Welcome to Our Megaquiz!" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HomeInfo from '@/components/HomeInfo.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'HomeView',

  components: {
    'home-info': HomeInfo,
  },
})
</script>
