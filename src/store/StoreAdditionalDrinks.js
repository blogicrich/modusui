import apiLib from '../services/apiLib.js'

export const moduleAdditionalDrinks = {
  state: {
    // store the data
    AdditionalDrinksPost: [],
    AdditionalDrinksPut: [],
    AdditionalDrinksGet: []
  },
  mutations: {
    // set the data
    SET_ADDITIONALDRINKS (state, data) {
      state.AdditionalDrinksGet = data
    }
  },
  actions: {
    // get all data
    fetchAdditionalDrinksGet (context) {
      return apiLib.getData('carer/adddrinks/' + this.getters.getterUserId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_ADDITIONALDRINKS', null)
        } else {
          context.commit('SET_ADDITIONALDRINKS', response.data)
        }
      })
    },
    fetchAdditionalDrinksPostPost () {
      return apiLib.postData('carer/adddrinks/' + this.getters.getterUserId, this.getters.getterAdditionalDrinksPost)
    },
    fetchAdditionalDrinksPostDelete () {
      return apiLib.deleteData('carer/adddrinks/' + this.getters.getterUserId)
    },
    fetchAdditionalDrinksPostPut () {
      return apiLib.updateData('carer/adddrinks/' + this.getters.getterUserId, this.getters.getterAdditionalDrinksPut)
    }
  },
  getters: {
    getterAdditionalDrinksPost: state => state.AdditionalDrinksPost,
    getterAdditionalDrinksPut: state => state.AdditionalDrinksPut

  }
}
