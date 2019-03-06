import apiLib from '../services/apiLib.js'

export const moduleConditionsOptions = {
  state: {
    // store the data
    conditionsOptionsGet: [],
    conditionsOptionsPost: [],
    conditionsOptionsPut: []
  },
  mutations: {
    // set the data
    SET_CONDITIONSOPTIONS (state, data) {
      state.conditionsOptionsGet = data
    }
  },
  actions: {
    // get all data
    fetchconditionOptionsGet (context) {
      return apiLib.getData('sysadmin/condition-options').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_CONDITIONSOPTIONS', null)
        } else {
          context.commit('SET_CONDITIONSOPTIONS', response)
        }
      })
    },
    fetchconditionOptionsPost () {
      return apiLib.postData('sysadmin/condition-options', this.getters.getterconditionsOptionsPost)
    },
    fetchconditionOptionsDelete () {
      return apiLib.deleteData('sysadmin/condition-options/' + this.getters.getterStoreId)
    },
    fetchconditionOptionsPut () {
      return apiLib.updateData('sysadmin/condition-options/' + this.getters.getterStoreId, this.getters.getterconditionsOptionsPut)
    }
  },
  getters: {
    // get specific data
    getterconditionsOptionsPost: state => {
      return state.conditionsOptionsPost
    },
    getterconditionsOptionsPut: state => {
      return state.conditionsOptionsPut
    }

  }
}
