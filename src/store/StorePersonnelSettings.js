import apiLib from '../services/apiLib.js'

export const modulePersonnelSettings = {
  state: {
    personnelSettingsPut: [],
    personnelSettingsGet: []
  },
  mutations: {
    // set the data
    SET_PERSONNELSETTINGS (state, data) {
      state.personnelSettingsGet = data
    }
  },
  actions: {
    // get all data
    fetchPersonnelSettingsGet (context) {
      apiLib.getData('cliadmin/personnelsettings/' + this.getters.getterCarerId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_PERSONNELSETTINGS', null)
        } else {
          context.commit('SET_PERSONNELSETTINGS', response.data)
        }
      })
    },
    fetchPersonnelSettingsPut () {
      return apiLib.updateData('cliadmin/personnelsettings/' + this.getters.getterCarerId, this.getters.getterPersonnelSettingsPut)
    }
  },
  getters: {
    getterPersonnelSettingsPut: state => state.personnelSettingsPut
  }
}
