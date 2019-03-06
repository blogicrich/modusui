import apiLib from '../services/apiLib.js'

export const moduleTitles = {
  state: {
    // store the data
    title: []
  },
  mutations: {
    // set the data
    SET_title (state, data) {
      state.title = data
    }
  },
  actions: {
    // get all data
    fetchGetTitles (context) {
      return apiLib.getData('sysadmin/title').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_title', null)
        } else {
          context.commit('SET_title', response)
        }
      })
    }
  },
  getters: {
    // get specific data
  }
}
