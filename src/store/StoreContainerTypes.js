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
    SET_CONTAINERTYPES (state, data) {
      state.containerTypesGet = data
    }
  },
  actions: {
    // get all data
    fetchContainerTypesGet (context) {
      return apiLib.getData('sysadmin/container-type').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_CONTAINERTYPES', null)
        } else {
          context.commit('SET_CONTAINERTYPES', response)
        }
      })
    },
    fetchContainerTypesPost () {
      return apiLib.postData('sysadmin/container-type', this.getters.getterContainerTypesPost)
    },
    fetchContainerTypesDelete () {
      return apiLib.deleteData('sysadmin/container-type/' + this.getters.getterStoreId)
    },
    fetchContainerTypesPut () {
      return apiLib.updateData('sysadmin/container-type/' + this.getters.getterStoreId, this.getters.getterContainerTypesPut)
    }
  },
  getters: {
    // get specific data
    getterContainerTypesPost: state => {
      return state.containerTypesPost
    },
    getterContainerTypesPut: state => {
      return state.containerTypesPut
    }
  }
}
