import apiLib from '../services/apiLib.js'

export const moduleDashboardDrinks = {
  state: {
    drinks: [],
    drinksLoading: false,
    drinksTotal: null
  },
  mutations: {
    SET_DRINKS (state, data) {
      let value = 0
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        value = value + data[i].volumeInLitres
      }
      state.drinks = data
      state.drinksTotal = value.toFixed(2) + ' L'
    },
    SET_DRINKS_LOAD_STATE (state, data) {
      state.drinksLoading = data
    }
  },
  actions: {
    fetchDashboardDrinks (context, payload) {
      // const user = rootGetters.getterSelectedUser.userId
      context.commit('SET_DRINKS_LOAD_STATE', true)
      apiLib.getData('carer/dashboard-drinks/' + payload.userId + '/' + payload.date).then((response) => {
        if (typeof response === 'undefined') {
          context.commit('SET_DRINKS', [])
          context.commit('SET_DRINKS_LOAD_STATE', false)
        } else {
          context.commit('SET_DRINKS', response)
          context.commit('SET_DRINKS_LOAD_STATE', false)
        }
      })
    }
  }
}
