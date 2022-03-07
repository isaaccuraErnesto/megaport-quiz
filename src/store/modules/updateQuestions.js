const state = {
  idsToBeUpdated: [],
  questionsToBeUpdated: [],
}

const getters = {}

const actions = {}

const mutations = {
  addId: (storeState, id) => {
    storeState.idsToBeUpdated.push(id)
  },
  removeId: (storeState, question) => {
    let index = storeState.idsToBeUpdated.indexOf(question.id)
    storeState.idsToBeUpdated.splice(index, 1)
  },
  addQuestionToBeUpdated: (storeState, question) => {
    storeState.questionsToBeUpdated.push(question)
    let index = storeState.idsToBeUpdated.indexOf(question.id)
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
