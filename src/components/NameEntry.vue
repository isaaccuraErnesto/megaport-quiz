<template>
  <section>
    <h2>
      {{ message }}
    </h2>
    <form @submit.prevent="handleNameEntry">
      <input v-model="inputName"
        type="text"
        placeholder="Enter your name"
        required>
      <input type="submit"
        :value="inputValue">
    </form>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'NameEntry',

  props: {
    message: {
      default: 'Megaquiz',
      type: String as PropType<string>,
      required: true,
    },
    inputValue: {
      default: 'Submit',
      type: String as PropType<string>,
      required: true,
    },
  },

  data() {
    return {
      inputName: '' as string,
    }
  },

  methods: {
    ...mapActions('userInfo', ['registerName', 'fetchAge']),
    ...mapMutations('uiChangers', ['setUserEnteredName']),
    /**
     * Handles the user's entry of their name
     */
    handleNameEntry(): void {
      this.registerName(this.inputName)
      this.setUserEnteredName(true)
      this.fetchAge(this.inputName)
    },
  },
})
</script>

<style lang="scss" scoped>
h2 {
  margin: 1em auto;
}

input {
  margin: 0 auto 0 auto;
  padding: 0.3em 0.6em;
  border: 1px solid #080825;
  border-radius: 0;
  outline: none;

  &[type="submit"] {
    background-color: #080825;
    color: #f5f5f5;

    &:hover {
      background-color: #229df5;
    }
  }
}
</style>
