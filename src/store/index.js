import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    isTukang: false,
  },
  mutations: {
    loginUser(state, payload) {
      state.isLogin = true
      state.username = payload.username
      state.isTukang = false
    },

    loginTukang(state, payload) {
      state.isLogin = true
      state.username = payload.username
      state.isTukang = true
    }
  },
  actions: {
  },
  modules: {
  }
})
