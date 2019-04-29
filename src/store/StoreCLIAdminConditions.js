import apiLib from '../services/apiLib.js'

export const moduleCLIAdminConditions = {
  state: {
    CLIAdminConditionsGet: [],
    CLIAdminConditionsPost: [],
    CLIAdminConditionsPut: []
  },
  mutations: {
    // set the data
    SET_CLIADMINCONDITIONS (state, data) {
      state.CLIAdminConditionsGet = data
    }
  },
  actions: {
    async fetchCLIAdminConditionsGet (context) {
      await apiLib.getData('cliadmin/conditions/' + this.getters.getterUserId, false, true).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_CLIADMINCONDITIONS', null)
        } else {
          context.commit('SET_CLIADMINCONDITIONS', response)
        }
      })
    },
    fetchCLIAdminConditionsPost () {
      return apiLib.postData('cliadmin/conditions/' + this.getters.getterUserId + '/' + this.getters.getterConditionId, this.getters.getterCLIAdminConditionsPost)
    },
    fetchCLIAdminConditionsDelete () {
      return apiLib.deleteData('cliadmin/conditions/' + this.getters.getterUserId + '/' + this.getters.getterConditionId)
    },
    fetchCLIAdminConditionsPut () {
      return apiLib.updateData('cliadmin/conditions/' + this.getters.getterUserId + '/' + this.getters.getterConditionId, this.getterCLIAdminConditionsPut)
    }
  },
  getters: {
    getterCLIAdminConditionsPost: state => state.CLIAdminConditionsPost,
    getterCLIAdminConditionsPut: state => state.CLIAdminConditionsPut
  }
}
