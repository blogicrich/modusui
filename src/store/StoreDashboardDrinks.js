import apiLib from '../services/apiLib.js'
import moment from 'moment'

export const moduleDashboardDrinks = {
  state: {
    drinks: [],
    additionalDrinks: [],
    selectedDrink: {},
    drinksLoading: false,
    drinksTotal: null
  },
  mutations: {
    SET_DRINKS (state, data) {
      let value = 0
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        value = value + element.volumeInLitres
        element.longFormDate = convertTimeToLongForm(element.dateTime*1000)
      }
      state.drinks = data
      state.additionalDrinks = data.filter(element => element.type === 'eDroplet')
      state.drinksTotal = value.toFixed(2) + ' L'
    },
    SET_DRINKS_LOAD_STATE (state, data) {
      state.drinksLoading = data
    }
  },
  actions: {
    fetchDashboardDrinks (context) {
      const userId = context.rootState.dashboardUsers.selectedUser.userId
      const date = context.rootState.dashboardDates.dashboardUnixDate

      context.commit('SET_DRINKS_LOAD_STATE', true)
      apiLib.getData('carer/dashboard-drinks/' + + userId + '/' + date).then((response) => {
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

function convertTimeToLongForm (unixDateTime) {
  return moment(unixDateTime).format('DD-MM-YYYY HH:mm')
}
