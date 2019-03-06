import apiLib from '../services/apiLib.js'

export const moduleCLIAdminVoiceMessage = {
  state: {
    voicemessagePut: [],
    voicemessageGet: []
  },
  mutations: {
    // set the data
    SET_VOICEMESSAGE (state, data) {
      state.voicemessageGet = data
    }
  },
  actions: {
    // get all data
    fetchCLIAdminVoiceMessageGet (context) {
      apiLib.getData('cliadmin/voicemesssage/' + this.getters.getterUserId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_VOICEMESSAGE', null)
        } else {
          context.commit('SET_VOICEMESSAGE', response.data)
        }
      })
    },
    fetchCLIAdminVoiceMessagePut () {
      return apiLib.updateData('cliadmin/voicemessage/' + this.getters.getterUserId, this.getters.getterCLIAdminVoiceMessagePut)
    }
  },
  getters: {
    getterCLIAdminVoiceMessagePut: state => state.voicemessagePut
  }
}
