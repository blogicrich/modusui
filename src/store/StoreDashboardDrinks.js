import apiLib from '../services/apiLib.js'
import moment from 'moment'

export const moduleDashboardDrinks = {
  state: {
    // Dashboard
    drinks: [],
    drinksLoading: false,
    drinksTotal: 0,
    // Additional Drinks
    additionalDrinks: [],
    additionalDrinksTotal: 0,
    newDrinks: [],
    newDrinksTotal: 0
  },
  mutations: {
    ADD_NEW_DRINK (state, data) {
      state.newDrinks.push(data)
    },
    REMOVE_NEW_DRINK (state, data) {
      state.newDrinks.splice(data, 1)
    },
    RESET_NEW_DRINKS (state) {
      state.newDrinks = []
    },
    SET_DRINKS (state, data) {
      const drinks = []
      const additionalDrinks = []
      let additionalDrinksTotal = 0
      let drinksTotal = 0

      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        if (element.type === 'Other') {
          additionalDrinksTotal = additionalDrinksTotal + Number(element.volumeInLitres)
          additionalDrinks.push({ ...element, longFormDate: convertTimeToLongForm(element.datetime) })
        } else {
          drinksTotal = drinksTotal + Number(element.volumeInLitres)
          drinks.push({ ...element, longFormDate: convertTimeToLongForm(element.datetime) })
        }
      }
      state.drinks = drinks
      state.drinksTotal = Number(drinksTotal).toFixed(2)
      state.additionalDrinks = additionalDrinks
      state.additionalDrinksTotal = Number(additionalDrinksTotal).toFixed(2)
    },
    SET_DRINKS_LOAD_STATE (state, data) {
      state.drinksLoading = data
    },
    RESET_STATE (state) {
      // Dashboard
      state.drinks = []
      state.drinksLoading = false
      state.drinksTotal = 0.00
      // Additional Drinks
      state.additionalDrinks = []
      state.additionalDrinksTotal = 0.00
      state.newDrinks = []
      state.newDrinksTotal = 0.00
    }
  },
  actions: {
    fetchDashboardDrinks (context) {
      const userId = context.rootState.dashboardUsers.selectedUser.userId
      const date = context.rootState.dashboardDates.dashboardUnixDate

      context.commit('SET_DRINKS_LOAD_STATE', true)
      apiLib.getData('carer/dashboard-drinks/' + userId + '/' + date).then((response) => {
        if (typeof response === 'undefined') {
          context.commit('SET_DRINKS', [])
          context.commit('SET_DRINKS_LOAD_STATE', false)
        } else {
          context.commit('SET_DRINKS', response)
          context.commit('SET_DRINKS_LOAD_STATE', false)
        }
      })
    },
    postNewDrinks (context) {
      const userId = context.rootState.dashboardUsers.selectedUser.userId
      const jobs = []
      for (let i = 0; i < context.state.newDrinks.length; i++) {
        const element = context.state.newDrinks[i]
        const data = {
          volumeInLitres: Number(element.volume * element.quantity).toFixed(2),
          containerTypeId: element.containerTypeId,
          dateTime: convertToUnix(element.date, element.time)
        }
        jobs.push(apiLib.postData('carer/dashboard-drinks/' + userId, data, true, true))
        console.log(data)
      }
      Promise.all(jobs).then((response) => {
        context.commit('RESET_NEW_DRINKS')
        context.dispatch('fetchDashboardDrinks')
      })
    }
  }
}

function convertTimeToLongForm (datetime) {
  return moment(datetime).format('YYYY-MM-DD HH:MM')
}

function convertToUnix (date, time) {
  const datetime = date + ' ' + time
  const dateUnix = moment(datetime).unix()
  return dateUnix
}
