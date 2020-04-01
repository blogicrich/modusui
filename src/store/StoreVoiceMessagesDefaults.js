import apiLib from '../services/apiLib.js'

export const moduleVoiceMessagesDefaults = {
  state: {
    // store the data
    voiceMessagesDefaults: []
  },
  mutations: {
    // set the data
    SET_VOICEMESSAGESDEFAULTS (state, data) {
      state.voiceMessagesDefaults = data
    }
  },
  actions: {
    // get all data
    fetchVoiceMessagesDefaults (context) {
      return apiLib.getData('sysadmin/voice-message', true, true).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_VOICEMESSAGESDEFAULTS', null)
        } else {
          context.commit('SET_VOICEMESSAGESDEFAULTS', response)
        }
      })
    },
    postVoiceMessagesDefaults (payload) {
      return apiLib.updateData('sysadmin/voice-message', payload)
    }
  },
  getters: {
    // get specific data
    getterVoiceMessagesDefaultsPut: state => {
      return state.voiceMessagesDefaults
    }
  }
}
