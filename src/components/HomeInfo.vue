<template>
  <div class="home-info">
    <h1>{{ message }}</h1>
    <p>
      Here you'll have an opportunity to test your Megaport knowledge and learn
      a thing or two. If you want to be better prepared before taking our
      quiz, visit our
      <a href="https://megaport.com"
        target="_blank"
        rel="noopener">website</a>
      and read away!
    </p>
    <h2>Rules</h2>
    <ul>
      <li>Read the questions</li>
      <li>Answer the questions</li>
      <li>No cheating unless strictly necessary</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'HomeInfo',

  props: {
    message: {
      default: 'Welcome!',
      type: String as PropType<string>,
    },
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  max-width: 700px;
  margin-inline: auto;
}

h2 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  color: red;
}
</style>
