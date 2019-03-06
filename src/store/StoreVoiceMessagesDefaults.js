import apiLib from '../services/apiLib.js'

export const moduleVoiceMessagesDefaults = {
  state: {
    // store the data
    voiceMessagesDefaults: []
  },
  mutations: {
    // set the data
    SET_VOICEMESSAGESDEFAULDS (state, data) {
      state.voiceMessagesDefualts = data
    }
  },
  actions: {
    // get all data
    fetchGetVoiceMessagesDefaults (context) {
      return apiLib.getData('sysadmin/voice-message').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_VOICEMESSAGESDEFAULDS', null)
        } else {
          context.commit('SET_VOICEMESSAGESDEFAULDS', response)
        }
      })
    }
  },
  getters: {
    // get specific data
  }
}
