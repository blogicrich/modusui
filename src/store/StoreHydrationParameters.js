import apiLib from '../services/apiLib.js'
import Vue from 'vue'

export const moduleHydrationParameters = {
  state: {
    hydrationParamsLoading: false,
    defaultHydrationParamsChanged: false,
    hydrationParams: [],
    hydrationParamsClone: []
  },
  mutations: {
    SET_HYDRATION_PARAMETERS (state, data) {
      state.hydrationParams = data
      state.hydrationParamsClone = JSON.parse(JSON.stringify(data))
    },
    SET_HYDRATION_PARAMS_LOAD_STATUS (state, data) {
      state.hydrationParamsLoading = data
    },
    INCREMENT_START (state, data) {
      const newValue = Number(state.hydrationParams[data.index].lowerHydrationBoundary.percentHydratedStart) + 1
      Vue.set(state.hydrationParams[data.index].lowerHydrationBoundary, 'percentHydratedStart', newValue.toFixed(2))
    },
    DECREMENT_START (state, data) {
      const newValue = Number(state.hydrationParams[data.index].lowerHydrationBoundary.percentHydratedStart) - 1
      Vue.set(state.hydrationParams[data.index].lowerHydrationBoundary, 'percentHydratedStart', newValue.toFixed(2))
    },
    INCREMENT_END (state, data) {
      const newValue = Number(state.hydrationParams[data.index].lowerHydrationBoundary.percentHydratedEnd) + 1
      Vue.set(state.hydrationParams[data.index].lowerHydrationBoundary, 'percentHydratedEnd', newValue.toFixed(2))
    },
    DECREMENT_END (state, data) {
      const newValue = Number(state.hydrationParams[data.index].lowerHydrationBoundary.percentHydratedEnd) - 1
      Vue.set(state.hydrationParams[data.index].lowerHydrationBoundary, 'percentHydratedEnd', newValue.toFixed(2))
    },
    // START
    UPDATE_START (state, data) {
      const newValue = Number(data.value)
      Vue.set(state.hydrationParams[data.index].lowerHydrationBoundary, 'percentHydratedStart', newValue)
    },
    // END
    UPDATE_END (state, data) {
      const newValue = Number(data.value)
      Vue.set(state.hydrationParams[data.index].lowerHydrationBoundary, 'percentHydratedEnd', newValue)
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
      context.state.hydrationParams.forEach(async element => {
        let data = element.lowerHydrationBoundary
        await apiLib.updateData('sysadmin/hydration-params/' + element.level, data, false, true)
      })
    }
  }
}
