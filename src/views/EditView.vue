<template>
  <div class="edit">
    <img alt="Megaport Logo"
      src="https://portal.megaport.com/img/Megaport-Logo-Web-72dpi-RGB.4d150500.png">
    <name-entry message="Wanting to contribute?"
      input-value="Edit Questions" />
  </div>
</template>

<script>
import NameEntry from '@/components/NameEntry.vue'

export default {
  name: 'EditView',
  components: {
    'name-entry': NameEntry,
  },
}
</script>
