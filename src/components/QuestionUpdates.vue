<template>
  <form v-if="idsToBeUpdated.includes(selected.id)"
    class="update-question-form"
    @submit.prevent="updateQuestion">
    <label for="questionType"
      class="update-label">Choose a question type</label>
    <select v-model="questionTypeToUpdate"
      name="questionType">
      <option :value="undefined"
        disabled>
        Select a question type
      </option>
      <option v-for="(type, typeIndex) in questionTypes"
        :key="typeIndex"
        :value="Object.keys(questionTypes[typeIndex])[0]">
        {{ type[Object.keys(questionTypes[typeIndex])[0]] }}
      </option>
    </select>
    <label for="questionToUpdate"
      class="update-label">Enter new question</label>
    <input v-if="questionTypeToUpdate"
      v-model="questionToUpdate"
      type="text"
      class="update-input-text"
      name="questionToUpdate"
      placeholder="Type new question here...">
    <div v-if="questionTypeToUpdate === 'multiple-choice'"
      id="multiple-choice-options">
      <label for="optionOne"
        class="multiple-choice-option">Enter first option</label>
      <input v-model="optionOne"
        type="text"
        class="multiple-choice-option-input"
        name="optionOne"
        placeholder="Option one">
      <label for="optionTwo"
        class="multiple-choice-option">Enter second option</label>
      <input v-model="optionTwo"
        type="text"
        class="multiple-choice-option-input"
        name="optionTwo"
        placeholder="Option two">
      <label for="optionThree"
        class="multiple-choice-option">Enter third option</label>
      <input v-model="optionThree"
        type="text"
        class="multiple-choice-option-input"
        name="optionThree"
        placeholder="Option three">
      <label for="optionFour"
        class="multiple-choice-option">Enter fourth option</label>
      <input v-model="optionFour"
        type="text"
        class="multiple-choice-option-input"
        name="optionFour"
        placeholder="Option four">
    </div>
    <label v-if="questionTypeToUpdate === 'multiple-choice'"
      for="updatedValueType"
      class="update-label">Enter option type</label>
    <input v-if="questionTypeToUpdate === 'multiple-choice'"
      v-model="updatedValueType"
      type="text"
      class="update-input-text"
      name="updatedValueType"
      placeholder="Type a word that defines all options (e.g. city, year, color)...">
    <label for="answerToQuestionToUpdate"
      class="update-label">Enter answer</label>
    <input v-if="questionTypeToUpdate"
      v-model="updatedAnswer"
      type="text"
      class="update-input-text"
      name="answerToQuestionToUpdate"
      placeholder="Type answer to new question here...">
    <label v-if="questionTypeToUpdate === 'type-a-word'"
      for="questionToUpdatePlaceholder"
      class="update-label">Enter placeholder</label>
    <input v-if="questionTypeToUpdate === 'type-a-word'"
      v-model="updatedPlaceholder"
      type="text"
      class="update-input-text"
      name="questionToUpdatePlaceholder"
      placeholder="Type placeholder to new question here...">
    <div class="update-form-buttons">
      <input type="submit"
        class="update-question"
        value="Done">
      <input type="button"
        class="cancel-update-question"
        value="Cancel"
        @click.prevent="cancelUpdate(selected)">
    </div>
  </form>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'QuestionUpdates',

  props: {
    selected: {
      default: null,
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      questionTypeToUpdate: this.selected.type,
      questionTypes: [
        { 'multiple-choice': 'Multiple choice' },
        { 'type-a-word': 'Type a word' },
      ],
      questionToUpdate: this.selected.question,
      optionOne: '',
      optionTwo: '',
      optionThree: '',
      optionFour: '',
      updatedValueType: this.selected.valueType,
      updatedPlaceholder: this.selected.placeholder,
      updatedAnswer: this.selected.answer,
    }
  },

  computed: {
    ...mapState({
      idsToBeUpdated: state => state.updateQuestions.idsToBeUpdated,
    }),
  },

  methods: {
    ...mapMutations('updateQuestions', ['addQuestionToBeUpdated']),
    ...mapMutations('updateQuestions', ['removeId']),
    updateQuestion() {
      let updatedQuestion = {}
      if (this.questionTypeToUpdate === 'multiple-choice') {
        updatedQuestion = {
          id: this.selected.id,
          type: 'multiple-choice',
          question: this.questionToUpdate,
          options: [
            this.optionOne,
            this.optionTwo,
            this.optionThree,
            this.optionFour,
          ],
          answer: this.updatedAnswer,
          valueType: this.updatedValueType,
        }
      } else if (this.questionTypeToUpdate === 'type-a-word') {
        updatedQuestion = {
          id: this.selected.id,
          type: 'type-a-word',
          question: this.questionToUpdate,
          placeholder: this.updatedPlaceholder,
          answer: this.updatedAnswer,
        }
      } else {
        alert('Please select a valid question type')
      }
      // this.addQuestionToBeUpdated(updatedQuestion)
      this.$emit('update-question-list', updatedQuestion)
      this.removeId(updatedQuestion)
    },
    cancelUpdate(question) {
      this.removeId(question)
    },
  },
}
</script>

<style lang="scss" scoped>
.update-question-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 -1px;
  border: 1px solid #b5b5b5;
  border-block: none;
  background-color: #229df5;
  label {
    display: none;
  }
  select {
    width: 50%;
    margin: 20px;
    padding: 0.3em 0.6em;
  }
  .update-input-text {
    width: 80%;
    margin: 0 20px 20px 20px;
    padding: 0.3em 0.6em;
  }
  #multiple-choice-options {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 20px 20px 20px;
    .multiple-choice-option-input {
      width: 40%;
      margin: 0 20px 20px 20px;
      padding: 0.3em 0.6em;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .update-form-buttons {
    align-self: flex-end;
    display: flex;
    justify-content: end;
    align-items: center;
    margin: 1em;
    input {
      padding: 0.3em 0.6em;
      background-color: #080825;
      border: 1px solid #080825;
      border-radius: 2px;
      font-size: 0.9em;
      color: #f5f5f5;
    }
    input[type="submit"] {
      margin-right: 1em;
      &:hover {
        background-color: #22f5ab;
        border: 1px solid #b5b5b5;
        color: #080825;
      }
      &:active {
        background-color: #b5b5b5;
        border: 1px solid #229df5;
        color: #080825;
      }
    }
    input[type="button"] {
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
}
</style>
