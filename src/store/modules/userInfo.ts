import { UserInfoState } from '@/types/state/UserInfoState'
import { JSONagifyData } from '@/types/JSONagifyData'
import { Commit } from 'vuex'

const state: UserInfoState = {
  userName: '',
  userAge: null,
}

const getters = {}

const actions = {
  /**
   * Stores the user's name
   * @param context
   * @param name - The user's name
   */
  registerName({ commit }: { commit: Commit }, name: string): void {
    commit('setUserName', name)
  },
  /**
   * Fetches the age assigned to the user's name on Agify
   * @param context
   * @param name - The user's name
   */
  async fetchAge({ commit }: { commit: Commit }, name: string): Promise<void> {
    commit('uiChangers/setAgifyLoading', true, { root: true })
    try {
      const response: Response = await fetch(`https://api.agify.io?name=${name}`)
      const agifyData: JSONagifyData = await response.json()
      commit('setUserAge', agifyData.age)
    } catch (error) {
      console.log(error) // eslint-disable-line
    } finally {
      commit('uiChangers/setAgifyLoading', false, { root: true })
    }
  },
}
// Still to type below this point
const mutations = {
  /**
   * Sets the user's name
   * @param storeState - This module's state
   * @param name - The user's name to set
   */
  setUserName: (storeState: UserInfoState, name: string): void => {
    storeState.userName = name
  },
  /**
   * Sets the user's age
   * @param storeState - This module's state
   * @param name - The user's age to set
   */
  setUserAge: (storeState: UserInfoState, age: number): void => {
    storeState.userAge = age
  },
  /**
   * Resets user's data
   * @param storeState - This module's state
   * @param name - The user's name to be set
   */
  resetUserInfo: (storeState: UserInfoState): void => {
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
