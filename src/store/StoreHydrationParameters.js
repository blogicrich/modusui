import apiLib from '../services/apiLib.js'

export const moduleHydrationParameters = {
  state: {
    // store the data
    hydrationParametersGet: [],
    hydrationParametersput: []
  },
  mutations: {
    // set the data
    SET_HYDRATIONPARAMETERS (state, data) {
      state.hydrationParametersGet = data
    }
  },
  actions: {
    // get all data
    fetchGetHydrationParameters (context) {
      return apiLib.getData('sysadmin/hydration-params').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_HYDRATIONPARAMETERS', null)
        } else {
          context.commit('SET_HYDRATIONPARAMETERS', response)
        }
      })
    },
    fetchPutHydrationParameters () {
      return apiLib.updateData('sysadmin/hydration-params/' + this.getters.getterStoreId, this.getters.getterHydrationParametersPut)
    }
  },
  getters: {
    // get specific data
    getterHydrationParametersPut: state => {
      return state.hydrationParametersput
    }
  }
}
