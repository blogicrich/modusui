import apiLib from '../services/apiLib.js'

export const moduleTextEmailMessages = {
  state: {
    // store the data
    textEmailMessages: []
  },
  mutations: {
    // set the data
    SET_TEXTEMAILMESSAGES (state, data) {
      state.textEmailMessages = data
    }
  },
  actions: {
    // get all data
    fetchGetTextEmailMessages (context) {
      return apiLib.getData('sysadmin/text-messages').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_TEXTEMAILMESSAGES', null)
        } else {
          context.commit('SET_TEXTEMAILMESSAGES', response)
        }
      })
    }
  },
  getters: {
    // get specific data
  }
}
