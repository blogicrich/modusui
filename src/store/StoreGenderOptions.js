import apiLib from '../services/apiLib.js'

export const moduleGenderOptions = {
  state: {
    // store the data
    genderOptionsGet: [],
    genderOptionsPost: [],
    genderOptionsPut: []
  },
  mutations: {
    // set the data
    SET_gender (state, data) {
      state.genderOptionsGet = data
    }
  },
  actions: {
    // get all data
    fetchGetGenderOptions (context) {
      return apiLib.getData('sysadmin/gender-options').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_gender', null)
        } else {
          context.commit('SET_gender', response)
        }
      })
    },
    fetchPostGenderOptions () {
      return apiLib.postData('sysadmin/gender-options', this.getters.getterGenderOptionsPost)
    },
    fetchDeleteGenderOptions () {
      return apiLib.deleteData('sysadmin/gender-options/' + this.getters.getterStoreId)
    },
    fetchPutGenderOptions () {
      return apiLib.updateData('sysadmin/gender-options/' + this.getters.getterStoreId, this.getters.getterGenderOptionsPut)
    }
  },
  getters: {
    // get specific data
    getterGenderOptionsPost: state => {
      return state.titlePost
    },
    getterGenderOptionsPut: state => {
      return state.titlePost
    }
  }
}
