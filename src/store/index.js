import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from '@/store/modules/userInfo'
import questions from '@/store/modules/questions'
import updateQuestions from './modules/updateQuestions.js'
import uiChangers from '@/store/modules/uiChangers'

Vue.use(Vuex)

const store = new Vuex.Store({
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
    './modules/userInfo.js',
    './modules/questions.js',
    './modules/updateQuestions.js',
    './modules/uiChangers.js',
  ], () => {
    // require the updated modules and swap in the new actions and mutations
    console.info('Hot updating store modules')
    store.hotUpdate({
      // getters: require('./RootGetters.js'),
      // actions: require('./RootActions.js'),
      // mutations: require('./RootMutations.js'),
      modules: {
        userInfo: require('./modules/userInfo.js').default,
        questions: require('./modules/questions.js').default,
        updateQuestions: require('./modules/updateQuestions.js').default,
        uiChangers: require('./modules/uiChangers.js').default,
      },
    })
  })
}

export default store

