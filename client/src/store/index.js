import { createStore } from 'vuex'

export default createStore({
  state: {
    user: false,
    informations: {
      logo: {},
      head: {}
    }
  },
  getters: {
  },
  mutations: {
    login(state,data){
      state.user = data
    },
    logout(state){
      state.user = false
    },
    informations(state,data){
      state.informations = data
    }
  },
  actions: {
  },
  modules: {
  }
})
