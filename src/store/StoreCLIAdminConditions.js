import apiLib from '../services/apiLib.js'

export const moduleCLIAdminConditions = {
  state: {
    conditions: []
  },
  mutations: {
    // set the data
    SET_CONDITIONS (state, data) {
      state.conditions = data
    }
  },
  actions: {
    // get all data
    fetchCLIAdminConditions (context) {
      apiLib.getData('cliadmin/conditions/' + this.getters.getterUserId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_CONDITIONS', null)
        } else {
          context.commit('SET_CONDITIONS', response.data)
        }
      }).catch((error) => {
        console.log('error: ', error)
      })
    }
  }
}
