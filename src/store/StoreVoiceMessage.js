import apiLib from '../services/apiLib.js'

export const moduleCLIAdminVoiceMessage = {
  state: {
    voicemessagePut: [],
    voicemessage: []
  },
  mutations: {
    // set the data
    SET_VOICEMESSAGE (state, data) {
      state.conditions = data
    }
  },
  actions: {
    // get all data
    fetchCLIAdminVoiceMessage (context) {
      apiLib.getData('cliadmin/voicemesssage/' + this.getters.getterUserId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_VOICEMESSAGE', null)
        } else {
          context.commit('SET_VOICEMESSAGE', response.data)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    fetchCLIAdminVoiceMessagePut () {
      return apiLib.updateData('cliadmin/voicemessage/' + this.getters.getterUserId, this.getterDataPut)
    }
  },
  getters: {
    getterDataPut: state => state.voicemessagePut
  }
}
