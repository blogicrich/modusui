import apiLib from '../services/apiLib.js'

export const moduleAditionalDrinks = {
  state: {
    // store the data
    getDrinksPost: [],
    getDrinksPut: [],
    getDrinks: []
  },
  mutations: {
    // set the data
    SET_GETDRINKS (state, data) {
      state.getDrinks = data
    }
  },
  actions: {
    // get all data
    fetchGetDrinks (context) {
      return apiLib.getData('carer/adddrinks/' + this.getters.getterStoreId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_GETDRINKS', null)
        } else {
          context.commit('SET_GETDRINKS', response.data)
        }
      })
    },
    fetchDrinksPost () {
      return apiLib.postData('carer/adddrinks/' + this.getters.getterUserId, this.getters.getterDataPost)
    },
    fetchDrinksDelete () {
      return apiLib.deleteData('carer/adddrinks/' + this.getters.getterUserId)
    },
    fetchDrinksPut () {
      return apiLib.updateData('carer/adddrinks/' + this.getters.getterUserId, this.getters.getterDataPut)
    }
  },
  getters: {
    getterDataPost: state => state.getDrinksPost,
    getterDataPut: state => state.getDrinksPost

  }
}
