import apiLib from '../services/apiLib.js'

export const modulePersonnelSettings = {
  state: {
    personnelSettingsPut: [],
    personnelSettings: []
  },
  mutations: {
    // set the data
    SET_PERSONNELSETTINGS (state, data) {
      state.conditions = data
    }
  },
  actions: {
    // get all data
    fetchPersonnelSettings (context) {
      apiLib.getData('cliadmin/personnelsettings/' + this.getters.getterCarerId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_PERSONNELSETTINGS', null)
        } else {
          context.commit('SET_PERSONNELSETTINGS', response.data)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    fetchPersonnelSettingsPut () {
      return apiLib.deleteData('cliadmin/personnelsettings/' + this.getters.getterCarerId, this.getterDataPut)
    }
  },
  getters: {
    getterDataPut: state => state.personnelSettingsPut
  }
}
