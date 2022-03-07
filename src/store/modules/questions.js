import initialData from '@/assets/initialQuestions.json'

const state = {
  questions: initialData.questions,
}

const getters = {}

const actions = {}

const mutations = {
  setNewQuestionList: (storeState, questionList) => {
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
