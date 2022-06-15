import { UpdateQuestionsState } from '@/types/state/UpdateQuestionsState'
import { TypeQuestion } from '@/types/question_types/TypeQuestion'
import { ChoiceQuestion } from '@/types/question_types/ChoiceQuestion'

const state: UpdateQuestionsState = {
  idsToBeUpdated: [],
}

const getters = {}

const actions = {}

const mutations = {
  /**
   * Adds the question's id to an array of ids pointing to questions to be updated
   * @param storeState - This module's state
   * @param id - The id of the question to be updated
   */
  addId: (storeState: UpdateQuestionsState, id: number): void => {
    storeState.idsToBeUpdated.push(id)
  },
  /**
   * Removes the question's id from the array of ids pointing to questions to be updated
   * @param storeState - This module's state
   * @param question - The question to be removed
   */
  removeId: (storeState: UpdateQuestionsState, question: TypeQuestion | ChoiceQuestion): void => {
    const index = storeState.idsToBeUpdated.indexOf(question.id)
    storeState.idsToBeUpdated.splice(index, 1)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
