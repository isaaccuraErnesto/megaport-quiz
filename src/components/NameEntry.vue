<template>
  <section>
    <h2>
      {{ message }}
    </h2>
    <form @submit.prevent="handleNameEntry">
      <input v-model="userName"
        type="text"
        placeholder="Enter your name">
      <input type="submit"
        :value="inputValue">
    </form>
  </section>
</template>

<script>
export default {
  name: 'NameEntry',
  props: {
    message: {
      default: 'Megaquiz',
      type: String,
      required: true,
    },
    inputValue: {
      default: 'Submit',
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userName: '',
    }
  },
  methods: {
    handleNameEntry() {
      this.$emit('nameEntered', this.userName)
    },
  },
}
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
