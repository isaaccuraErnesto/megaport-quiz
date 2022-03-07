const state = {
  userName: '',
  userAge: null,
}

const getters = {}

const actions = {
  registerName({ commit }, name) {
    commit('setUserName', name)
  },
  async fetchAge({ commit }, name) {
    commit('uiChangers/setAgifyLoading', true, { root: true })
    try {
      const response = await fetch(`https://api.agify.io?name=${name}`)
      const agifyData = await response.json()
      commit('setUserAge', agifyData.age)
    } catch (error) {
      console.log(error)
    } finally {
      commit('uiChangers/setAgifyLoading', false, { root: true })
    }
  },
}

const mutations = {
  setUserName: (storeState, name) => {
    storeState.userName = name
  },
  setUserAge: (storeState, age) => {
    storeState.userAge = age
  },
  resetUserInfo: storeState => {
    storeState.userName = ''
    storeState.userAge = null
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
