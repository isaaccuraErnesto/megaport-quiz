import * as initialData from '@/assets/initialQuestions.json'
import { ChoiceQuestion } from '@/types/questions/ChoiceQuestion'
import { TypeQuestion } from '@/types/questions/TypeQuestion'
import { QuestionsState } from '@/types/state/QuestionsState'

const initialQuestions = initialData.questions as (ChoiceQuestion | TypeQuestion)[]

const state: QuestionsState = {
  questions: initialQuestions,
}

const getters = {}

const actions = {}

const mutations = {
  /**
   * Updates the list of questions
   * @param storeState - This module's state
   * @param questionList - An array containing the current list of questions
   */
  setNewQuestionList: (storeState: QuestionsState, questionList: (ChoiceQuestion | TypeQuestion)[]): void => {
    storeState.questions = [...questionList]
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
