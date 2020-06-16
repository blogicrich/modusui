import apiLib from '../services/apiLib.js'

export const moduleHydrationParameters = {
  state: {
    hydrationParamsLoading: false,
    hydrationParams: {},
    hydrationParamsClone: {}
  },
  mutations: {
    SET_HYDRATION_PARAMETERS (state, data) {
      data.forEach(e => {
        Object.assign(state.hydrationParams, {}, { [e.alertBoundariesAlertTypeBandId]: e })
      })
      state.hydrationParamsClone = JSON.parse(JSON.stringify(state.hydrationParams))
    },
    SET_HYDRATION_PARAMS_LOAD_STATUS (state, data) {
      state.hydrationParamsLoading = data
    },
    INCREMENT_START (state, data) {
      let newValue = data.value + 1
      // console.log(newValue, data, stateElement, state.hydrationParams[data.index].lowerHydrationBoundary)
      state.hydrationParams[data.index].lowerHydrationBoundary = { ...state.hydrationParams[data.index].lowerHydrationBoundary, percentHydratedStart: newValue }
    },
    DECREMENT_START (state, data) {
      let newValue = data.value - 1
      // console.log(newValue, data, stateElement, state.hydrationParams[data.index].lowerHydrationBoundary)
      state.hydrationParams[data.index].lowerHydrationBoundary = Object.assign({}, state.hydrationParams[data.index].lowerHydrationBoundary, { percentHydratedStart: newValue })
    },
    INCREMENT_END (state, data) {
      let stateElement = state.hydrationParams[data.index].lowerHydrationBoundary
      const newValue = Number(state.hydrationParams[data.index].lowerHydrationBoundary.percentHydratedEnd) + 1

      stateElement = Object.assign({}, stateElement, { percentHydratedEnd: newValue })
    },
    DECREMENT_END (state, data) {
      let stateElement = state.hydrationParams[data.index].lowerHydrationBoundary
      const newValue = Number(state.hydrationParams[data.index].lowerHydrationBoundary.percentHydratedEnd) - 1

      stateElement = Object.assign({}, stateElement, { percentHydratedEnd: newValue })
    },
    // START
    UPDATE_START (state, data) {
      const newValue = Number(data.value)
      state.hydrationParams[data.index].lowerHydrationBoundary = Object.assign({}, state.hydrationParams[data.index].lowerHydrationBoundary, { percentHydratedStart: newValue })
    },
    // END
    UPDATE_END (state, data) {
      const newValue = Number(data.value)
      state.hydrationParams[data.index].lowerHydrationBoundary = Object.assign({}, state.hydrationParams[data.index].lowerHydrationBoundary, { percentHydratedStart: newValue })
    }
  },
  actions: {
    fetchHydrationParameters (context) {
      context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', true)
      return apiLib.getData('sysadmin/hydration-params').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_HYDRATION_PARAMETERS', null)
          context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', false)
        } else {
          context.commit('SET_HYDRATION_PARAMETERS', response)
          context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', false)
        }
      })
    },
    async updateHydrationParameters (context) {
      Object.keys(context.state.hydrationParams).forEach(async key => {
        let data = context.state.hydrationParams[key].lowerHydrationBoundary
        data.percentHydratedStart = String(Number(data.percentHydratedStart).toFixed(2))
        data.percentHydratedEnd = String(Number(data.percentHydratedEnd).toFixed(2))
        // console.log(data)
        // await apiLib.updateData('sysadmin/hydration-params/' + context.state.hydrationParams[key].level, data, false, true)
      })
    }
  },
  getters: {
    getterStartOfDayValue: (state) => (alertTypebandId) => {
      return state.hydrationParams[alertTypebandId].lowerHydrationBoundary.percentHydratedStart
    },
    getterEndOfDayValue: (state) => (alertTypebandId) => {
      return state.hydrationParams[alertTypebandId].lowerHydrationBoundary.percentHydratedEnd
    }
  }
}
