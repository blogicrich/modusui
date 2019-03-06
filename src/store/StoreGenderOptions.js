import apiLib from '../services/apiLib.js'

export const moduleGenderOptions = {
  state: {
    // store the data
    genderOptions: []
  },
  mutations: {
    // set the data
    SET_gender (state, data) {
      state.genderOptions = data
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
    }
  },
  getters: {
    // get specific data
  }
}
