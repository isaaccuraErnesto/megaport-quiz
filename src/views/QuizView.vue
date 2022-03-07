<template>
  <div class="quiz">
    <img alt="Megaport Logo"
      src="https://portal.megaport.com/img/Megaport-Logo-Web-72dpi-RGB.4d150500.png">
    <name-entry v-if="!nameEntered"
      message="Feeling confident enough?"
      input-value="Take Quiz" />
    <div v-if="loading"
      class="loader" />
    <p v-if="userAge"
      id="age-message">
      {{ userAgeString }}
    </p>
    <div v-if="nameEntered"
      class="sorting-wrapper">
      <div class="sorting-label">
        Sort Questions By
      </div>
      <div class="sorting-box">
        <select id="sorting-options"
          v-model="sortingOrder"
          name="sorting-options">
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
            <label :for="`${question.answer}-${question.id}`">
              <span>{{ index + 1 }}</span>
              {{ question.question }}
            </label>
          </div>
          <div v-if="question.type === 'multiple-choice'"
            class="question-body">
            <select :id="`${question.answer}-${question.id}`"
              v-model="userAnswers[`question-${question.id}`]"
              :name="`${question.answer}-${question.id}`"
              required>
              <option :value="undefined"
                disabled
                selected>
                {{ `Select a ${question.valueType}` }}
              </option>
              <option v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
                :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          <div v-else
            class="question-body">
            <input v-model="userAnswers[`question-${question.id}`]"
              type="text"
              :placeholder="question.placeholder"
              :name="`${question.answer}-${question.id}`"
              required>
          </div>
          <div v-if="question.result"
            :class="{correct: question.userRespondedCorrectly, incorrect: !question.userRespondedCorrectly}">
            {{ resultMessage(question.result) }}
          </div>
        </div>
      </div>
      <input v-if="!answersSubmitted"
        id="submit-form"
        type="submit"
        value="Submit Answers">
      <input v-if="answersSubmitted"
        id="reset-form"
        type="button"
        value="Try Again"
        @click="resetForm">
    </form>
  </div>
</template>

<script>
import NameEntry from '@/components/NameEntry.vue'
import { mapMutations, mapState } from 'vuex'

//Two ways of retrieving data from a local .json file

//import initialData from '@/assets/initialQuestions.json'
//const initialData = require('@/assets/initialQuestions.json')

export default {
  name: 'QuizView',

  components: {
    'name-entry': NameEntry,
  },

  data() {
    return {
      sortingOptions: ['Default', 'Alphabetical', 'Type'],
      sortingOrder: 'Default',
      answersSubmitted: false,
      userAnswers: {},
    }
  },

  computed: {
    ...mapState({
      userName: state => state.userInfo.userName,
      userAge: state => state.userInfo.userAge,
      questions: state => state.questions.questions,
      nameEntered: state => state.uiChangers.nameEntered,
      loading: state => state.uiChangers.agifyLoading,
    }),
    sortedQuestions() {
      if (this.sortingOrder !== 'Default') {
        return this.questions.slice().sort((a, b) => {
          if (this.sortingOrder === 'Alphabetical') {
            let questionA = a.question
            let questionB = b.question
            return questionA.localeCompare(questionB, 'en', { sensitivity: 'base' })
          } else if (this.sortingOrder === 'Type') {
            let typeA = a.type
            let typeB = b.type
            return typeA.localeCompare(typeB, 'en', { sensitivity: 'base' })
          } else if (this.sortingOrder === 'Results') {
            let resultA = a.result
            let resultB = b.result
            return resultA.localeCompare(resultB, 'en', { sensitivity: 'base' })
          }
        })
      } else {
        return this.questions
      }
    },
    userAgeString() {
      if (this.userAge > 40) {
        return `Well ${this.userName}, no pressure but at ${this.userAge} we expect you to be full of wisdom!`
      } else if (this.userAge > 25) {
        return `Oh ${this.userName}, you are only ${this.userAge}! Had you said that earlier, we would have chosen easier questions!`
      } else {
        return `${this.userName}, I think at ${this.userAge} you are too young to take this quiz but why don't you prove me wrong?`
      }
    },
  },

  // watch: {
  //   sortingOrder: {
  //     immediate: true,
  //     handler(newValue, oldValue) {
  //       console.log(`${newValue} and ${oldValue}`)
  //       console.log(this.sortingOrder)
  //     },
  //   },
  //   userAnswers: {
  //     immediate: true,
  //     deep: true,
  //     handler(newV, oldV) {
  //       console.log(JSON.stringify(newV, null, 2))
  //       console.log(JSON.stringify(oldV, null, 2))
  //       // console.log(newV)
  //       // console.log(oldV)
  //     },
  //   },
  // },

  methods: {
    ...mapMutations('userInfo', ['resetUserInfo']),
    ...mapMutations('uiChangers', ['resetNameEntered']),
    markAnswers(submitEvent) {
      this.sortingOptions.push('Results')
      this.sortedQuestions.forEach(question => {
        const answer = submitEvent.target.elements[`${question.answer}-${question.id}`].value
        if (answer.toUpperCase() === question.answer.toUpperCase()) {
          question['result'] = 'correct'
          question['userRespondedCorrectly'] = true
        } else {
          question['result'] = 'incorrect'
          question['userRespondedCorrectly'] = false
        }
      })
      this.answersSubmitted = true
    },
    resultMessage(result) {
      if (result === 'correct') {
        return 'Lucky guess!'
      } else if (result === 'incorrect') {
        return `This ain't right!`
      } else {
        return `We don't even know the answer ourselves!`
      }
    },
    resetForm() {
      for (let i = 0; i < this.sortedQuestions.length; i++) {
        delete this.sortedQuestions[i]['result']
        delete this.sortedQuestions[i]['userRespondedCorrectly']
      }
      this.sortingOptions.pop()
      this.sortingOrder = 'Default'
      this.answersSubmitted = false
      this.userAnswers = {}
      this.resetUserInfo()
      this.resetNameEntered()
    },
  },
}
</script>

<style lang="scss" scoped>
input:focus,
select:focus {
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
#age-message {
  width: 90%;
  margin: 2em auto;
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
    &:hover {
      opacity: 0.8;
    }
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
      .correct,
      .incorrect {
        text-align: end;
        margin: 0 -1px;
        padding: 0.3em 0.6em;
      }
      .correct {
        background-color: #9cff88;
        border: 1px solid #6cb45d;
        border-block-end: none;
      }
      .incorrect {
        background-color: #ff8888;
        border: 1px solid #a35656;
        border-block-end: none;
      }
    }
  }
  #submit-form,
  #reset-form {
    width: calc(90% + 2px);
    margin: 0;
    padding: 0.5em;
    background-color: #080825;
    border: 1px solid #080825;
    border-radius: 0;
    color: #f5f5f5;
    font-size: 1.1em;
    font-weight: 600;
  }
  #submit-form {
    &:hover {
      background-color: #229df5;
      border: 1px solid #b5b5b5;
    }
    &:active {
      background-color: #b5b5b5;
      border: 1px solid #229df5;
      color: #080825;
    }
  }
  #reset-form {
    &:hover {
      background-color: #ff8888;
      border: 1px solid #a35656;
      color: #080825;
    }
    &:active {
      background-color: #b5b5b5;
      border: 1px solid #229df5;
      color: #080825;
    }
  }
}
</style>
