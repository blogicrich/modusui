import apiLib from '../services/apiLib.js'
import moment from 'moment'

const bounce = 500

export const moduleDashboardDrinks = {
  state: {
    // Dashboard
    drinks: [],
    drinksLoading: false,
    drinksError: false,
    drinksUpdating: false,
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
          additionalDrinks.push({ ...element, longFormDate: convertTimeToLongForm(element.dateTime) })
        } else {
          drinksTotal = drinksTotal + Number(element.volumeInLitres)
          drinks.push({ ...element, longFormDate: convertTimeToLongForm(element.dateTime) })
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
    SET_DRINKS_UPDATE_STATE (state, data) {
      state.drinksUpdating = data
    },
    SET_DRINKS_ERROR_STATE (state, data) {
      state.drinksError = data
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
    async fetchDashboardDrinks (context) {
      try {
        context.commit('SET_DRINKS_ERROR_STATE', false)
        context.commit('SET_DRINKS_LOAD_STATE', true)
        const userId = context.rootState.dashboardUsers.selectedUser.userId
        const date = context.rootState.dashboardDates.dashboardUnixDate
        const response = await apiLib.getData('carer/dashboard-drinks/' + userId + '/' + date)
        if (typeof response !== 'undefined' && !Array.isArray(response)) {
          context.commit('SET_DRINKS', [])
          context.commit('SET_DRINKS_LOAD_STATE', false)
          context.commit('SET_DRINKS_ERROR_STATE', true)
        } else {
          setTimeout(() => {
            context.commit('SET_DRINKS_LOAD_STATE', false)
            context.commit('SET_DRINKS', setDrinksWithId(response))
          }, bounce)
        }
      } catch (error) {
        console.error(error)
        context.commit('SET_DRINKS_LOAD_STATE', false)
        context.commit('SET_DRINKS_ERROR_STATE', true)
      }
    },
    async postNewDrinks (context) {
      try {
        context.commit('SET_DRINKS_ERROR_STATE', false)
        context.commit('SET_DRINKS_UPDATE_STATE', true)
        const userId = context.rootState.dashboardUsers.selectedUser.userId
        const jobs = []
        for (let i = 0; i < context.state.newDrinks.length; i++) {
          const element = context.state.newDrinks[i]
          const data = {
            volumeInLitres: Number(element.volume * element.quantity).toFixed(2),
            containerTypeId: element.containerTypeId,
            dateTime: convertToUnix(element.date, element.time)
          }
          const update = await apiLib.postData('carer/dashboard-drinks/' + userId, data, true, true)
          jobs.push(update)
        }
        await Promise.all(jobs)
        context.commit('RESET_NEW_DRINKS')
        context.dispatch('fetchDashboardDrinks')
        setTimeout(() => {
          context.commit('SET_DRINKS_UPDATE_STATE', false)
        }, bounce)
      } catch (error) {
        console.error(error)
        context.commit('SET_DRINKS_UPDATE_STATE', false)
        context.commit('SET_DRINKS_ERROR_STATE', true)
      }
    }
  }
}

function convertTimeToLongForm (dateTime) {
  return moment.unix(dateTime).format('YYYY-MM-DD')
}

function convertToUnix (date, time) {
  const dateTime = date + ' ' + time
  const dateUnix = moment(dateTime).unix()
  return dateUnix
}

function setDrinksWithId (rawDrinks) {
  const drinksWithId = []
  let id = 0
  for (let i = 0; i < rawDrinks.length; i++) {
    const element = { ...rawDrinks[i], id: id++ }
    drinksWithId.push(element)
  }
  return drinksWithId
}
