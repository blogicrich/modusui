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
    SET_GENDEROPTIONS (state, data) {
      state.genderOptionsGet = data
    }
  },
  actions: {
    // get all data
    fetchGenderOptionsGet (context) {
      return apiLib.getData('sysadmin/gender-options').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_GENDEROPTIONS', null)
        } else {
          context.commit('SET_GENDEROPTIONS', response)
        }
      })
    },
    fetchGenderOptionsPost () {
      return apiLib.postData('sysadmin/gender-options', this.getters.getterGenderOptionsPost)
    },
    fetchGenderOptionsDelete () {
      return apiLib.deleteData('sysadmin/gender-options/' + this.getters.getterStoreId)
    },
    fetchGenderOptionsPut () {
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
