import apiLib from '../services/apiLib.js'

export const moduleConditionsOptions = {
  state: {
    // store the data
    conditionOptionsGet: [],
    conditionOptionsPost: [],
    conditionOptionsPut: []
  },
  mutations: {
    // set the data
    SET_CONDITIONOPTIONS (state, data) {
      state.conditionOptionsGet = data
    }
  },
  actions: {
    // get all data
    fetchGetconditionOptions (context) {
      return apiLib.getData('sysadmin/condition-options').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_CONDITIONOPTIONS', null)
        } else {
          context.commit('SET_CONDITIONOPTIONS', response)
        }
      })
    },
    fetchPostconditionOptions () {
      return apiLib.postData('sysadmin/condition-options', this.getters.getterconditionOptionsPost)
    },
    fetchDeleteconditionOptions () {
      return apiLib.deleteData('sysadmin/condition-options/' + this.getters.getterStoreId)
    },
    fetchPutconditionOptions () {
      return apiLib.updateData('sysadmin/condition-options/' + this.getters.getterStoreId, this.getters.getterconditionOptionsPut)
    }
  },
  getters: {
    // get specific data
    getterconditionOptionsPost: state => {
      return state.conditionOptionsPost
    },
    getterconditionOptionsPut: state => {
      return state.conditionOptionsPut
    }

  }
}
