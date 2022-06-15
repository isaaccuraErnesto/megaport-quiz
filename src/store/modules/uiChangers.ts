import { UiChangersState } from '@/types/state/UiChangersState'

const state: UiChangersState = {
  nameEntered: false,
  agifyLoading: false,
}

const getters = {}

const actions = {}

const mutations = {
  /**
   * Registers whether the user has entered their name or not
   * @param storeState - This module's state
   * @param boolean
   */
  setUserEnteredName: (storeState: UiChangersState, boolean: boolean): void => {
    storeState.nameEntered = boolean
  },
  /**
   * Registers whether the user's age has been obtained from Agify or not
   * @param storeState - This module's state
   * @param boolean
   */
  setAgifyLoading: (storeState: UiChangersState, boolean: boolean): void => {
    storeState.agifyLoading = boolean
  },
  /**
   * Clears the register related to whether the user had entered their name or not
   * @param storeState - This module's state
   */
  resetNameEntered: (storeState: UiChangersState): void => {
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
