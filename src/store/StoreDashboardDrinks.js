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
    newDrinks: {},
    newDrinksTotal: 0,
    jobs: {}
  },
  mutations: {
    SET_DRINKS (state, data) {
      let value = 0
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        value = value + element.volumeInLitres
        const datetime = element.dateTime*1000
        element.longFormDate = convertTimeToLongForm(datetime)
      }
      state.drinks = data.filter(element => element.type === 'eDroplet')
      state.additionalDrinks = data.filter(element => element.type === 'eDroplet')
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
    postAdditionalDrinks (context, payload) {
      const userId = context.rootState.dashboardUsers.selectedUser.userId
      const date = context.rootState.dashboardDates.dashboardUnixDate

      let data = {}
      let jobs = []
      for (const drink in context.state.newDrinks) {
        if (context.state.newDrinks.hasOwnProperty(drink)) {
          const element = context.state.newDrinks[drink];
          data = {
            volumeInLitres: element,
            containerId: element,
            dateTime: payload.dateTime
          }
          // jobs.push(apiLib.postData + userId + '/' + date, data)
          // console.log(jobs)
        }
        // jobs.push(userId + '/' + date, data)
        context.commit('SET_JOBS', data)
      }
      // Promise.all(jobs)
      
    }
  }
}

function convertTimeToLongForm (unixDateTime) {
  return moment(unixDateTime).format('DD-MM-YYYY HH:mm')
}

function convertToUnix (longDateTime) {
  return moment(longDateTime).format('DD-MM-YYYY HH:mm')
}
