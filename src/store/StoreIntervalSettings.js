import apiLib from '../services/apiLib.js'

export const moduleIntervalSettings = {
  state: {
    intervalSettingsPut: [],
    intervalSettingsGet: []
  },
  mutations: {
    // set the data
    SET_INTERVALSETTINGS (state, data) {
      state.intervalSettingsGet = data
    }
  },
  actions: {
    // get all data
    fetchIntervalSettingsGet (context) {
      apiLib.getData('intervalsettings/' + this.getters.getterUserId + '/' + this.getters.getterDeviceMessageTypeId + '/' + this.getters.getterMessageNo).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_INTERVALSETTINGS', null)
        } else {
          context.commit('SET_INTERVALSETTINGS', response.data)
        }
      })
    },
    fetchIntervalSettingsPut () {
      return apiLib.updateData('cliadmin/interval-management/' + this.getters.getterUserId, this.getters.getterIntervalSettingsPut)
    }
  },
  getters: {
    getterIntervalSettingsPut: state => state.intervalSettingsPut
  }
}
