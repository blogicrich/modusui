import apiLib from '../services/apiLib.js'

export const moduleHydrationParameters = {
  state: {
    hydrationParamsLoading: false,
    defaultHydrationParamsChanged: false,
    dehydrated: {},
    hydrated: {},
    overHydrated: {},
    severelyOverHydrated: {}
  },
  mutations: {
    DECREMENT_PARAM (state, data) {
      Object.keys(state).forEach(function (key) {
        if (state[key].lowerHydrationBoundaryId === data.id && data.timePeriod === 'start') {
          state[key].lowerBoundaryPercentHydratedStart--
          state.defaultHydrationParamsChanged = true
        }
        if (state[key].lowerHydrationBoundaryId === data.id && data.timePeriod === 'end') {
          state[key].lowerBoundaryPercentHydratedEnd--
          state.defaultHydrationParamsChanged = true
        }
      })
    },
    INCREMENT_PARAM (state, data) {
      Object.keys(state).forEach(function (key) {
        if (state[key].lowerHydrationBoundaryId === data.id && data.timePeriod === 'start') {
          console.log(data.timePeriod === 'start')
          state[key].lowerBoundaryPercentHydratedStart++
          state.defaultHydrationParamsChanged = true
        }
        if (state[key].lowerHydrationBoundaryId === data.id && data.timePeriod === 'end') {
          console.log(data.timePeriod === 'end')
          state[key].lowerBoundaryPercentHydratedEnd++
          state.defaultHydrationParamsChanged = true
        }
      })
    },
    SET_HYDRATIONPARAMETERS (state, data) {
      state.defaultHydrationParamsChanged = false
      Object.keys(data).forEach(function (key) {
        if (state[key] && data[key]) {
          state[key] = data[key]
        } else {
          // HANDLE ERROR
        }
      })
    },
    UPDATE_HYDRATION_PARAM (state, data) {
      Object.keys(state).forEach(function (key) {
        if (state[key].lowerHydrationBoundaryId === data.id) {
          state[key].lowerBoundaryPercentHydratedStart = data.value
          state.defaultHydrationParamsChanged = true
        } else {
          state.defaultHydrationParamsChanged = true
        }
      })
    },
    SET_HYDRATION_PARAMS_LOAD_STATUS (state, data) {
      state.hydrationParamsLoading = data.value
    },
    SET_HYDRATION_PARAMS_DEFAULT_STATUS (state, data) {
      state.defaultHydrationParamsChanged = data.value
    }
  },
  actions: {
    refreshHydrationParameters (context) {
      return apiLib.getData('sysadmin/hydration-params').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_HYDRATIONPARAMETERS', null)
        } else {
          context.commit('SET_HYDRATIONPARAMETERS', response)
          context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', { value: false })
          context.commit('SET_HYDRATION_PARAMS_DEFAULT_STATUS', { value: false })
        }
      })
    },
    fetchHydrationParameters (context) {
      context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', { value: true })
      return apiLib.getData('sysadmin/hydration-params').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_HYDRATIONPARAMETERS', null)
          context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', { value: false })
          context.commit('SET_HYDRATION_PARAMS_DEFAULT_STATUS', { value: false })
        } else {
          context.commit('SET_HYDRATIONPARAMETERS', response)
          context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', { value: false })
          context.commit('SET_HYDRATION_PARAMS_DEFAULT_STATUS', { value: false })
        }
      })
    },
    updateHydrationParameters ({ dispatch, state }) {
      const payload = { dehydrated: state.dehydrated, hydrated: state.hydrated, overHydrated: state.overHydrated, severelyOverHydrated: state.severelyOverHydrated }
      return apiLib.updateData('/sysadmin/hydration-params', payload, false, true).then(() => {
        dispatch('refreshHydrationParameters')
      })
    }
  }
}
