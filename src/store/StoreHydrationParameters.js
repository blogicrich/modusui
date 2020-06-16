import apiLib from '../services/apiLib.js'
import Vue from 'vue'

export const moduleHydrationParameters = {
  state: {
    hydrationParamsLoading: false,
    hydrationParams: [],
    _originalHydrationParams: []
  },
  mutations: {
    SET_HYDRATION_PARAMETERS (state, data) {
      state.hydrationParams = data
      // Shallow copy with some exceptions.
      state._originalHydrationParams = data.map(param => {
        param.lowerHydrationBoundary = { ...param.lowerHydrationBoundary }
        return { ...param }
      })
    },
    SET_HYDRATION_PARAMS_LOAD_STATUS (state, data) {
      state.hydrationParamsLoading = data
    },
    INCREMENT_START (state, data) {
      state.hydrationParams[data.index].lowerHydrationBoundary.percentHydratedStart++
      Vue.set(state.hydrationParams, data.index, state.hydrationParams[data.index])
    },
    DECREMENT_START (state, data) {
      state.hydrationParams[data.index].lowerHydrationBoundary.percentHydratedStart--
      Vue.set(state.hydrationParams, data.index, state.hydrationParams[data.index])
    },
    INCREMENT_END (state, data) {
      state.hydrationParams[data.index].lowerHydrationBoundary.percentHydratedEnd++
      Vue.set(state.hydrationParams, data.index, state.hydrationParams[data.index])
    },
    DECREMENT_END (state, data) {
      state.hydrationParams[data.index].lowerHydrationBoundary.percentHydratedEnd--
      Vue.set(state.hydrationParams, data.index, state.hydrationParams[data.index])
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
    async updateHydrationParameters ({ state }) {
      const jobs = []
      for (const parameter of state.hydrationParams) {
        const { lowerHydrationBoundary } = parameter
        const originalLowerHydrationBoundary = state
          ._originalHydrationParams.find(originalParameter => parameter.level === originalParameter.level).lowerHydrationBoundary

        if (
          parseFloat(lowerHydrationBoundary.percentHydratedStart) !== parseFloat(originalLowerHydrationBoundary.percentHydratedStart) ||
          parseFloat(lowerHydrationBoundary.percentHydratedEnd) !== parseFloat(originalLowerHydrationBoundary.percentHydratedEnd)
        ) {
          jobs.push(apiLib.updateData(`sysadmin/hydration-params/${parameter.level}`, {
            percentHydratedStart: lowerHydrationBoundary.percentHydratedStart,
            percentHydratedEnd: lowerHydrationBoundary.percentHydratedEnd
          }, false, false))
        }
      }
      await Promise.all(jobs)
    }
  },
  getters: {
    getterStartOfDayValue: (state) => (alertBoundariesAlertTypeBandId) => {
      if (!state.hydrationParams) {
        return null
      }

      const parameter = state.hydrationParams.find(param => param.alertBoundariesAlertTypeBandId === alertBoundariesAlertTypeBandId)
      return parameter ? parameter.lowerHydrationBoundary.percentHydratedStart : null
    },
    getterEndOfDayValue: (state) => (alertBoundariesAlertTypeBandId) => {
      if (!state.hydrationParams) {
        return null
      }

      const parameter = state.hydrationParams.find(param => param.alertBoundariesAlertTypeBandId === alertBoundariesAlertTypeBandId)
      return parameter ? parameter.lowerHydrationBoundary.percentHydratedEnd : null
    }
  }
}
