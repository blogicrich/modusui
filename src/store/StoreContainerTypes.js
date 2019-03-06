import apiLib from '../services/apiLib.js'

export const moduleContainerTypes = {
  state: {
    // store the data
    containerTypes: []
  },
  mutations: {
    // set the data
    SET_container (state, data) {
      state.containerTypes = data
    }
  },
  actions: {
    // get all data
    fetchGetContainer (context) {
      return apiLib.getData('sysadmin/container-type').then((response) => {
        console.log(response);
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_container', null)
        } else {
          context.commit('SET_container', response)
        }
      })
    }
  },
  getters: {
    // get specific data
  }
}
