<template>
  <div class="quiz">
    <img alt="Megaport Logo"
      src="https://portal.megaport.com/img/Megaport-Logo-Web-72dpi-RGB.4d150500.png">
    <name-entry v-if="!nameEntered"
      message="Feeling confident enough?"
      input-value="Take Quiz"
      @nameEntered="nameWasChanged" />
    <div v-if="loading"
      class="loader" />
    <template v-if="userAge">
      <template v-if="userAge > 40">
        `Well ${userName}, no pressure but at ${userAge} we expect you to be full of wisdom!`
      </template>
      <template v-else-if="userAge > 25">
        `Oh ${userName}, you are only ${userAge}! Had you said that earlier, we would have chosen easier questions!`
      </template>
      <template v-else>
        `${userName}, I think at ${userAge} you are too young to take this quiz but why don't you prove me wrong?`
      </template>
    </template>
    <div v-if="nameEntered"
      class="sorting-wrapper">
      <div class="sorting-label">
        Sort Questions By
      </div>
      <div class="sorting-box">
        <select id="sorting-options"
          v-model="sortingOrder"
          name="sorting-options"
          @change="onSortingSelection">
          <option v-for="(option, index) in sortingOptions"
            :key="index"
            :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <form v-if="nameEntered"
      @submit.prevent="markAnswers">
      <div v-for="(question, index) in sortedQuestions"
        :key="index"
        class="question-wrapper">
        <div class="numbered-question">
          <div class="question-heading">
            <label :for="question.answer + '-' + question.id">
              <span>{{ index + 1 }}</span>
              {{ question.question }}
            </label>
          </div>
          <div v-if="question.type === 'multiple-choice'"
            class="question-body">
            <select :id="question.answer + '-' + question.id"
              :name="question.answer + '-' + question.id">
              <option v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
                :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          <div v-else
            class="question-body">
            <input type="text"
              :placeholder="question.placeholder"
              :name="question.answer + '-' + question.id">
          </div>
        </div>
      </div>
      <input id="submit-form"
        type="submit"
        value="Submit Answers">
    </form>
  </div>
</template>

<script>
import NameEntry from '@/components/NameEntry.vue'

const initialData = require('@/assets/initialQuestions.json')

export default {
  name: 'QuizView',
  components: {
    'name-entry': NameEntry,
  },
  data() {
    return {
      initialQuestions: initialData.questions,
      sortingOptions: ['Default', 'Alphabetical', 'Type'],
      sortingOrder: 'Default',
      nameEntered: false,
      answersSubmitted: false,
      userName: '',
      userAge: 0,
      loading: false,
    }
  },
  computed: {
    sortedQuestions() {
      if (this.sortingOrder !== 'Default') {
        return this.initialQuestions.slice().sort((a, b) => {
          let questionA = a.question.toUpperCase()
          let questionB = b.question.toUpperCase()
          let typeA = a.type.toUpperCase()
          let typeB = b.type.toUpperCase()
          if (this.sortingOrder === 'Alphabetical') {
            if (questionA < questionB) {
              return -1
            }
            if (questionA > questionB) {
              return 1
            }
            return 0
          } else if (this.sortingOrder === 'Type') {
            if (typeA < typeB) {
              return -1
            }
            if (typeA > typeB) {
              return 1
            }
            return 0
          }
        })
      } else {
        return this.initialQuestions
      }
    },
  },
  methods: {
    printThis(data) {
      console.log(data)
    },
    onSortingSelection(event) {
      return (this.sortingOrder = event.target.value)
    },
    async nameWasChanged(emittedName) {
      this.nameEntered = true
      this.loading = true
      this.userName = emittedName
      try {
        const response = await fetch(`https://api.agify.io?name=${emittedName}`)
        const agifyData = await response.json()
        this.userAge = agifyData.age
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    markAnswers(submitEvent) {
      this.sortingOptions.push('Results')
      console.log(submitEvent.target.elements)
      // this.sortedQuestions.forEach(question => {
      //   console.log(submitEvent.target.elements[`${question.answer}-${question.id}`]);
      // });
    },
  },
}
</script>

<style lang="scss" scoped>
input:focus {
  outline: none;
}
.loader {
  height: 24px;
  width: 24px;
  margin: 0 auto;
  border: 14px solid #f5f5f5;
  border-top: 14px solid #229df5;
  border-bottom: 14px solid red;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.sorting-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 90%;
  margin: 2em auto 0 auto;
  font-size: 0.9em;
  .sorting-label {
    width: fit-content;
    padding: 0.3em 0.6em;
    background-color: #080825;
    border: 1px solid #229df5;
    border-block-end: none;
    border-inline-end: none;
    color: #f5f5f5;
  }
  .sorting-box {
    #sorting-options {
      margin-right: -1px;
      padding: 0.3em 0.6em;
      border: 1px solid #229df5;
      border-block-end: none;
    }
  }
}
form {
  margin: 0 0 2em 0;
  .question-wrapper {
    height: fit-content;
    width: 90%;
    margin: 0 auto;
    text-align: left;
    .numbered-question {
      height: fit-content;
      width: 100%;
      .question-heading {
        height: fit-content;
        width: 100%;
        margin-left: -1px;
        border: 1px red solid;
        span {
          display: inline-block;
          width: 1em;
          margin-right: 0.3em;
          padding: 0.3em 0.6em;
          background-color: red;
          color: white;
          text-align: center;
        }
        label {
          display: inline-block;
          width: calc(100% - 0.6em);
          padding: 0 0.6em 0 0;
          margin: 0;
          background-color: white;
        }
      }
      .question-body {
        margin: 0 -1px;
        padding: 0.6em;
        background-color: #f5f5f5;
        border: 1px solid #b5b5b5;
        border-block: none;
        select,
        input {
          width: 40%;
          padding: 0.3em 0.6em;
          background-color: white;
          border: 1px solid #b5b5b5;
        }
      }
    }
  }
  #submit-form {
    width: calc(90% + 2px);
    margin: 0;
    padding: 0.3em 0.6em;
    background-color: #080825;
    border: 1px solid #080825;
    border-radius: 0;
    color: #f5f5f5;
    font-size: 1.1em;
    &:hover {
      background-color: #229df5;
      border: 1px solid #b5b5b5;
      font-weight: 600;
    }
  }
}
</style>
