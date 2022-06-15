import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from '@/store/modules/userInfo'
import questions from '@/store/modules/questions'
import updateQuestions from '@/store/modules/updateQuestions'
import uiChangers from '@/store/modules/uiChangers'
import { RootState } from '@/types/state/RootState'

Vue.use(Vuex)

const store = new Vuex.Store<RootState>({
  // state: {},
  // getters: {},
  // mutations: {},
  // actions: {},
  modules: {
    userInfo,
    questions,
    updateQuestions,
    uiChangers,
  },
})

if (module.hot) {
  // accept actions and mutations as hot modules
  module.hot.accept([
    './modules/userInfo.ts',
    './modules/questions.ts',
    './modules/updateQuestions.ts',
    './modules/uiChangers.ts',
  ], () => {
    // require the updated modules and swap in the new actions and mutations
    console.info('Hot updating store modules')
    store.hotUpdate({
      // getters: require('./RootGetters.js'),
      // actions: require('./RootActions.js'),
      // mutations: require('./RootMutations.js'),
      modules: {
        userInfo,
        questions,
        updateQuestions,
        uiChangers,
      },
    })
  })
}

export default store

