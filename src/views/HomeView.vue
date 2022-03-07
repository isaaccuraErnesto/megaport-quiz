<template>
  <div class="home">
    <img alt="Megaport Logo"
      src="https://portal.megaport.com/img/Megaport-Logo-Web-72dpi-RGB.4d150500.png">
    <home-info message="Welcome to Our Megaquiz!" />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeInfo from '@/components/HomeInfo.vue'

export default {
  name: 'HomeView',
  
  components: {
    'home-info': HomeInfo,
  },
}
</script>
