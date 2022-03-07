const state = {
  nameEntered: false,
  agifyLoading: false,
}

const getters = {}

const actions = {}

const mutations = {
  setUserEnteredName: (storeState, boolean) => {
    storeState.nameEntered = boolean
  },
  setAgifyLoading: (storeState, boolean) => {
    storeState.agifyLoading = boolean
  },
  resetNameEntered: storeState => {
    storeState.nameEntered = false
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
