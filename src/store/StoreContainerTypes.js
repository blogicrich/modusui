import apiLib from '../services/apiLib.js'

export const moduleContainerTypes = {
  state: {
    // store the data
    containerTypesGet: [],
    containerTypesPost: [],
    containerTypesPut: []
  },
  mutations: {
    // set the data
    SET_container (state, data) {
      state.containerTypesGet = data
    }
  },
  actions: {
    // get all data
    fetchGetContainer (context) {
      return apiLib.getData('sysadmin/container-type').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_container', null)
        } else {
          context.commit('SET_container', response)
        }
      })
    },
    fetchPostContainer () {
      return apiLib.postData('sysadmin/container-type', this.getters.getterContainerPost)
    },
    fetchDeleteContainer () {
      return apiLib.deleteData('sysadmin/container-type/' + this.getters.getterStoreId)
    },
    fetchPutContainer () {
      return apiLib.updateData('sysadmin/container-type/' + this.getters.getterStoreId, this.getters.getterContainerPut)
    }
  },
  getters: {
    // get specific data
    getterContainerPost: state => {
      return state.containerTypesPost
    },
    getterContainerPut: state => {
      return state.containerTypesPut
    }
  }
}
