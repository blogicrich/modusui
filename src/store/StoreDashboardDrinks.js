import apiLib from '../services/apiLib.js'
import moment from 'moment'

export const moduleDashboardDrinks = {
  state: {
    // Dashboard
    drinks: [],
    drinksLoading: false,
    drinksTotal: null,
    // Additional Drinks
    additionalDrinks: [],
    newDrinks: [],
    newDrinksTotal: 0,
    jobs: []
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
      let value = 0
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        value = value + element.volumeInLitres
        const datetime = element.dateTime*1000
        element.longFormDate = convertTimeToLongForm(datetime)
      }
      state.drinks = data.filter(element => element.type === 'eDroplet')
      state.additionalDrinks = data.filter(element => element.type === 'other')
      state.drinksTotal = value.toFixed(2) + ' L'
    },
    SET_NEW_DRINKS (state, data) {
      state.newDrinks = data.newDrinks
      let value = 0;
      for (const drink in state.newDrinks) {
        if (state.newDrinks.hasOwnProperty(drink)) {
          const element = state.newDrinks[drink];
        }
        value = Number(value) + Number(state.newDrinks[drink])
      }
      state.newDrinksTotal = value
    },
    SET_DRINKS_LOAD_STATE (state, data) {
      state.drinksLoading = data
    },
    SET_JOBS (state, data){
      state.jobs = data
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
      let jobs = []
      for (let i = 0; i < context.state.newDrinks.length; i++) {
        const element = context.state.newDrinks[i];
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
  return moment(datetime).unix()
}

function convertToUnix (date, time) {
  const datetime = date + ' ' + time 
  const dateUnix = moment(datetime).unix()
  return dateUnix
}
