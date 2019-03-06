import apiLib from '../services/apiLib.js'

export const moduleVoiceMessagesDefaults = {
  state: {
    // store the data
    voiceMessagesDefaultsGet: [],
    voiceMessagesDefaultsPut: []
  },
  mutations: {
    // set the data
    SET_VOICEMESSAGESDEFAULDS (state, data) {
      state.voiceMessagesDefaultsGet = data
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
    },
    fetchPutVoiceMessagesDefaults () {
      return apiLib.updateData('sysadmin/voice-message/' + this.getters.getterStoreId, this.getters.getterVoiceMessagesDefaultsPut)
    }
  },
  getters: {
    // get specific data
    getterVoiceMessagesDefaultsPut: state => {
      return state.voiceMessagesDefaultsPut
    }
  }
}
