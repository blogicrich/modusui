import apiLib from '../services/apiLib.js'

export const moduleTextEmailMessages = {
  state: {
    // store the data
    textEmailMessagesGet: [],
    textEmailMessagesPut: []
  },
  mutations: {
    // set the data
    SET_TEXTEMAILMESSAGES (state, data) {
      state.textEmailMessagesGet = data
    }
  },
  actions: {
    // get all data
    fetchTextEmailMessagesGet (context) {
      return apiLib.getData('sysadmin/text-messages').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_TEXTEMAILMESSAGES', null)
        } else {
          context.commit('SET_TEXTEMAILMESSAGES', response)
        }
      })
    },
    fetchTextEmailMessagesPut () {
      return apiLib.updateData('sysadmin/text-messages/' + this.getters.getterStoreId, this.getters.getterTextEmailMessagesPut)
    }
  },
  getters: {
    // get specific data
    getterTextEmailMessagesPut: state => {
      return state.textEmailMessagesPut
    }
  }
}
