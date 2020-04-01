import apiLib from '../services/apiLib.js'

export const moduleTextEmailMessages = {
  state: {
    // store the data
    messages: []
  },
  mutations: {
    // set the data
    SET_TEXTEMAILMESSAGES (state, data) {
      state.messages = data
    }
  },
  actions: {
    // get all data
    fetchMessages (context) {
      return apiLib.getData('sysadmin/text-messages').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_TEXTEMAILMESSAGES', null)
        } else {
          context.commit('SET_TEXTEMAILMESSAGES', response)
        }
      })
    },
    updateMessages (payload) {
      return apiLib.updateData('sysadmin/text-messages', payload)
    }
  },
  getters: {
    // get specific data
    getterMessages: state => {
      return state.messages
    },
    getterMessagesSms: state => {
      return state.messages.filter(e => e.communicationTypeDescription === 'SMS')
    },
    getterMessagesEmail: state => {
      return state.messages.filter(e => e.communicationTypeDescription === 'EMAIL')
    }
  }
}
