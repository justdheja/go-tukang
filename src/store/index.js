import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    role: '',
  },
  mutations: {
    loginUser(state, payload) {
      state.isLogin = true
      state.username = payload.username
      state.role = 'user'
    }
  },
  actions: {
  },
  modules: {
  }
})
