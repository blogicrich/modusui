import apiLib from '../services/apiLib.js'

export const moduleIntervalSettings = {
  state: {
    intervalSettingsPut: [],
    intervalSettings: []
  },
  mutations: {
    // set the data
    SET_INTERVALSETTINGS (state, data) {
      state.conditions = data
    }
  },
  actions: {
    // get all data
    fetchIntervalSettings (context) {
      apiLib.getData('intervalsettings/' + this.getters.getterUserId + '/' + this.getters.getterDeviceMessageTypeId + '/' + this.getters.getterMessageNo).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_INTERVALSETTINGS', null)
        } else {
          context.commit('SET_INTERVALSETTINGS', response.data)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    fetchIntervalSettingsPut () {
      return apiLib.updateData('cliadmin/interval-management/' + this.getters.getterUserId, this.getterDataPut)
    }
  },
  getters: {
    getterDataPut: state => state.intervalSettingsPut
  }
}
