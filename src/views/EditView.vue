<template>
  <div class="edit">
    <img alt="Megaport Logo"
      src="https://portal.megaport.com/img/Megaport-Logo-Web-72dpi-RGB.4d150500.png">
    <name-entry v-if="!nameEntered"
      message="Wanting to contribute?"
      input-value="Edit Questions" />
    <div v-if="loading"
      class="loader" />
    <p v-if="!loading && nameEntered"
      id="user-message">
      {{ `Okay ${userName}, enlighten us!` }}
    </p>
    <div v-if="nameEntered">
      <button v-if="!userWantsToAddQuestion"
        class="start-add-question"
        @click="showAddQuestionForm">
        Start a new question
      </button>
    </div>
    <form v-if="userWantsToAddQuestion"
      class="add-question-form"
      @submit.prevent="addQuestion">
      <h3>New question</h3>
      <label for="questionType"
        class="add-label">Choose a question type</label>
      <select v-model="questionTypeToAdd"
        name="questionType"
        required>
        <option :value="undefined"
          disabled
          selected>
          Select a question type
        </option>
        <option v-for="(type, typeIndex) in questionTypes"
          :key="typeIndex"
          :value="Object.keys(questionTypes[typeIndex])[0]">
          {{ type[Object.keys(questionTypes[typeIndex])[0]] }}
        </option>
      </select>
      <label for="questionToAdd"
        class="add-label">Enter new question</label>
      <input v-if="questionTypeToAdd"
        v-model="newQuestion"
        type="text"
        class="add-input-text"
        name="questionToAdd"
        placeholder="Type new question here..."
        required>
      <div v-if="questionTypeToAdd === 'multiple-choice'"
        id="multiple-choice-options">
        <label for="optionOne"
          class="multiple-choice-option">Enter first option</label>
        <input v-model="optionOne"
          type="text"
          class="multiple-choice-option-input"
          name="optionOne"
          placeholder="Option one"
          required>
        <label for="optionTwo"
          class="multiple-choice-option">Enter second option</label>
        <input v-model="optionTwo"
          type="text"
          class="multiple-choice-option-input"
          name="optionTwo"
          placeholder="Option two"
          required>
        <label for="optionThree"
          class="multiple-choice-option">Enter third option</label>
        <input v-model="optionThree"
          type="text"
          class="multiple-choice-option-input"
          name="optionThree"
          placeholder="Option three"
          required>
        <label for="optionFour"
          class="multiple-choice-option">Enter fourth option</label>
        <input v-model="optionFour"
          type="text"
          class="multiple-choice-option-input"
          name="optionFour"
          placeholder="Option four"
          required>
      </div>
      <label v-if="questionTypeToAdd === 'multiple-choice'"
        for="newValueType"
        class="add-label">Enter option type</label>
      <input v-if="questionTypeToAdd === 'multiple-choice'"
        v-model="newValueType"
        type="text"
        class="add-input-text"
        name="newValueType"
        placeholder="Type a word that defines all options (e.g. city, year, color)..."
        required>
      <label for="answerToQuestionToAdd"
        class="add-label">Enter answer</label>
      <input v-if="questionTypeToAdd"
        v-model="newAnswer"
        type="text"
        class="add-input-text"
        name="answerToQuestionToAdd"
        placeholder="Type answer to new question here..."
        required>
      <label v-if="questionTypeToAdd === 'type-a-word'"
        for="newQuestionPlaceholder"
        class="add-label">Enter placeholder</label>
      <input v-if="questionTypeToAdd === 'type-a-word'"
        v-model="newPlaceholder"
        type="text"
        class="add-input-text"
        name="newQuestionPlaceholder"
        placeholder="Type placeholder to new question here..."
        required>
      <div class="add-form-buttons">
        <input v-if="userWantsToAddQuestion"
          type="submit"
          class="add-question"
          value="Add">
        <input v-if="userWantsToAddQuestion"
          type="button"
          class="cancel-add-question"
          value="Cancel"
          @click.prevent="clearAddData">
      </div>
    </form>
    <form v-if="nameEntered"
      class="delete-update-question-form"
      @submit.prevent="registerChanges">
      <div v-for="(question, index) in unsavedQuestions"
        :key="index"
        class="question-wrapper">
        <div class="numbered-question">
          <div class="question-heading">
            <label :for="`${question.answer}-${question.id}`">
              <span>{{ index + 1 }}</span>
              {{ question.question }}
            </label>
          </div>
          <div v-if="'options' in question"
            class="question-body">
            <select :id="`${question.answer}-${question.id}`"
              :name="`${question.answer}-${question.id}`">
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
            <input type="text"
              :placeholder="question.placeholder"
              :name="`${question.answer}-${question.id}`">
          </div>
          <div class="tool-bar">
            <button v-if="!idsToBeUpdated.includes(question.id)"
              class="update-question"
              @click.prevent="toggleUpdatePanel(question.id)">
              Update
            </button>
            <button class="delete-question"
              @click.prevent="deleteQuestion(question.id)">
              Delete
            </button>
          </div>
        </div>
        <question-updates v-if="idsToBeUpdated.includes(question.id)"
          :selected="question"
          @update-question-list="updateQuestionList" />
      </div>
      <input id="save-changes"
        type="submit"
        value="Save Changes">
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import initialData from '@/assets/initialQuestions.json'
import NameEntry from '@/components/NameEntry.vue'
import QuestionUpdates from '@/components/QuestionUpdates.vue'
import { QuestionTypes } from '@/enums/QuestionTypes'
import { QuestionTypeObject } from '@/types/questions/QuestionTypeObject'
import { ChoiceQuestion } from '@/types/questions/ChoiceQuestion'
import { TypeQuestion } from '@/types/questions/TypeQuestion'
import { RootState } from '@/types/state/RootState'
// import hasKey from '@/helpers'

//Test
export default Vue.extend({
  name: 'EditView',

  components: {
    'name-entry': NameEntry,
    'question-updates': QuestionUpdates,
  },

  data() {
    return {
      unsavedQuestions: initialData.questions as (TypeQuestion | ChoiceQuestion)[],
      userWantsToAddQuestion: false,
      questionTypeToAdd: undefined as string | undefined,
      questionTypes: [
        { 'multiple-choice': 'Multiple choice' },
        { 'type-a-word': 'Type a word' },
      ] as QuestionTypeObject[],
      newQuestion: undefined as string | undefined,
      optionOne: undefined as string | undefined,
      optionTwo: undefined as string | undefined,
      optionThree: undefined as string | undefined,
      optionFour: undefined as string | undefined,
      newValueType: undefined as string | undefined,
      newPlaceholder: undefined as string | undefined,
      newAnswer: undefined as string | undefined,
    }
  },

  computed: {
    ...mapState({
      userName: (state): string => (state as RootState).userInfo.userName,
      questions: (state): (TypeQuestion | ChoiceQuestion)[] => (state as RootState).questions.questions,
      nameEntered: (state): boolean => (state as RootState).uiChangers.nameEntered,
      loading: (state): boolean => (state as RootState).uiChangers.agifyLoading,
      idsToBeUpdated: (state): number[] => (state as RootState).updateQuestions.idsToBeUpdated,
    }),
  },

  methods: {
    ...mapMutations('updateQuestions', ['addId']),
    ...mapMutations('questions', ['setNewQuestionList']),
    /**
     * Removes the question from the UI but doesn't change the question list in the store
     * @param deleteThisId - The id of the question to be deleted
     */
    deleteQuestion(deleteThisId: number): void {
      this.unsavedQuestions = this.unsavedQuestions.filter(question => question.id !== deleteThisId)
    },
    /**
     * Registers the user's desire to add a new question, which is then used to render a form in the UI
     */
    showAddQuestionForm(): void {
      this.userWantsToAddQuestion = true
    },
    /**
     * Adds a question to the list of questions in the UI but doesn't change the question list in the store
     * @param e - The event object containing all necessary information from the form
     */
    addQuestion(e: Event): void {
      const target = e.target as HTMLFormElement
      const elements = target.elements
      if (this.questionTypeToAdd === QuestionTypes.typeAWord) {
        this.unsavedQuestions.unshift({
          id: this.unsavedQuestions.length + 1,
          type: QuestionTypes.typeAWord,
          question: (elements.namedItem('questionToAdd') as HTMLInputElement).value,
          placeholder: (elements.namedItem('newQuestionPlaceholder') as HTMLInputElement).value,
          answer: (elements.namedItem('answerToQuestionToAdd') as HTMLInputElement).value,
        })
      } else if (this.questionTypeToAdd === QuestionTypes.multipleChoice) {
        this.unsavedQuestions.unshift({
          id: this.unsavedQuestions.length + 1,
          type: QuestionTypes.multipleChoice,
          question: (elements.namedItem('questionToAdd') as HTMLInputElement).value,
          options: [
            (elements.namedItem('optionOne') as HTMLInputElement).value,
            (elements.namedItem('optionTwo') as HTMLInputElement).value,
            (elements.namedItem('optionThree') as HTMLInputElement).value,
            (elements.namedItem('optionFour') as HTMLInputElement).value,
          ],
          answer: (elements.namedItem('answerToQuestionToAdd') as HTMLInputElement).value,
          valueType: (elements.namedItem('newValueType') as HTMLInputElement).value.toLowerCase(),
        })
        if (!(this.unsavedQuestions[0] as ChoiceQuestion).options.includes(this.unsavedQuestions[0].answer)) {
          alert(`Very funny ${this.userName}, none of your options matches your answer!`)
          this.unsavedQuestions.shift() ?? undefined
          return
        }
      }
      this.clearAddData()
    },
    /**
     * Clears the data related to the process of provisionally adding a question
     */
    clearAddData(): void {
      const { _data } = this as any // eslint-disable-line
      for (let prop in _data) {
        if (prop === 'userWantsToAddQuestion') {
          this.userWantsToAddQuestion = false
        } else if (prop !== 'unsavedQuestions' && prop !== 'questionTypes') {
          _data[prop] = undefined
        }
      }
    },
    /**
     * Toggles the rendering of the update panel for the question linked to the passed in id
     * @param id - Id of the question to be updated
     */
    toggleUpdatePanel(id: number): void {
      this.addId(id)
    },
    /**
     * Updates the provisional list of questions once a question has been updated
     * @param updatedQuestion
     */
    updateQuestionList(updatedQuestion: TypeQuestion | ChoiceQuestion): void {
      this.unsavedQuestions.forEach((question, index): void => {
        if (question.id === updatedQuestion.id) {
          this.unsavedQuestions[index] = updatedQuestion
        }
      })
    },
    registerChanges(): void {
      alert('Your changes have been registered successfully!')
      this.setNewQuestionList(this.unsavedQuestions)
    },
  },
})
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

#user-message {
  width: 90%;
  margin: 2em auto;
}

.start-add-question {
  display: flex;
  align-self: start;
  margin: 2em 5%;
  padding: 0.3em 0.6em;
  background-color: #080825;
  border: 1px solid #080825;
  color: #f5f5f5;
  font-size: 1em;

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

.add-question-form {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto 2em auto;
  border: 1px solid #080825;
  background-color: #f5f5f5;

  h3 {
    align-self: flex-start;
    width: fit-content;
    margin: 20px;
  }

  label {
    display: none;
  }

  select {
    width: 50%;
    margin: 0 20px 20px 20px;
    padding: 0.3em 0.6em;
  }

  .add-input-text {
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

  .add-form-buttons {
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
        background-color: #229df5;
        border: 1px solid #b5b5b5;
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

.delete-update-question-form {
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

      .tool-bar {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 0 -1px;
        padding: 0.4em 0.6em;
        background-color: #080825;
        border: 1px solid #080825;
        border-block: none;
        color: #f5f5f5;

        button {
          border: 1px solid #b5b5b5;
          border-radius: 2px;
        }

        .update-question {
          margin-right: 0.6em;

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

        .delete-question {
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
  }

  #save-changes {
    width: calc(90% + 2px);
    margin: 2em 0;
    padding: 0.5em;
    background-color: #229df5;
    border: 1px solid #b5b5b5;
    border-radius: 0;
    color: #f5f5f5;
    font-size: 1.1em;
    font-weight: 600;

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
