import apiLib from '../services/apiLib.js'
import Vue from 'vue'

const bounce = 500

export const moduleHydrationParameters = {
  state: {
    hydrationParamsLoading: false,
    hydrationParamsError: false,
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
    SET_HYDRATION_PARAMS_ERROR_STATUS (state, data) {
      state.hydrationParamsError = data
    },
    INCREMENT_START (state, data) {
      console.log(data)
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
      state.hydrationParams[data.index].lowerHydrationBoundary = Object.assign({}, state.hydrationParams[data.index].lowerHydrationBoundary, { percentHydratedEnd: newValue })
    }
  },
  actions: {
    fetchHydrationParameters (context) {
      context.commit('SET_HYDRATION_PARAMS_ERROR_STATUS', false)
      context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', true)
      return apiLib.getData('sysadmin/hydration-params').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_HYDRATION_PARAMETERS', null)
          context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', false)
          context.commit('SET_HYDRATION_PARAMS_ERROR_STATUS', true)
        } else {
          // CONVERT ALL HYDRATION VALUES TO NUMBERS TO FOR VALIDATION
          const params = response
          params.forEach(element => {
            element.lowerHydrationBoundary.percentHydratedEnd = Number(element.lowerHydrationBoundary.percentHydratedEnd)
            element.lowerHydrationBoundary.percentHydratedStart = Number(element.lowerHydrationBoundary.percentHydratedStart)
          })
          context.commit('SET_HYDRATION_PARAMETERS', params)
          setTimeout(() => {
            context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', false)
          }, bounce)
        }
      })
    },
    async updateHydrationParameters (context) {
      try {
        const jobs = []
        context.commit('SET_HYDRATION_PARAMS_ERROR_STATUS', false)
        for (const parameter of context.state.hydrationParams) {
          const { lowerHydrationBoundary } = parameter
          const originalLowerHydrationBoundary = context.state
            ._originalHydrationParams.find(originalParameter => parameter.level === originalParameter.level).lowerHydrationBoundary
          if (
            parseFloat(lowerHydrationBoundary.percentHydratedStart) !== parseFloat(originalLowerHydrationBoundary.percentHydratedStart) ||
            parseFloat(lowerHydrationBoundary.percentHydratedEnd) !== parseFloat(originalLowerHydrationBoundary.percentHydratedEnd)
          ) {
            jobs.push(apiLib.updateData(`sysadmin/hydration-params/${parameter.level}`, {
              percentHydratedStart: lowerHydrationBoundary.percentHydratedStart,
              percentHydratedEnd: lowerHydrationBoundary.percentHydratedEnd
            }, false, true))
          }
        }
        await Promise.all(jobs)
      } catch (error) {
        context.commit('SET_HYDRATION_PARAMS_ERROR_STATUS', true)
        context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', false)
      }
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
    },
    getterValidationValues: (state) => {
      const startDehydrated = state.hydrationParams.find(param => param.description === 'Dehydrated')
      const startOverHydrated = state.hydrationParams.find(param => param.description === 'Over Hydrated')
      const endDehydrated = state.hydrationParams.find(param => param.description === 'Dehydrated')
      const endOverHydrated = state.hydrationParams.find(param => param.description === 'Over Hydrated')
      return {
        startDehydrated: startDehydrated.lowerHydrationBoundary.percentHydratedStart,
        startOverHydrated: startOverHydrated.lowerHydrationBoundary.percentHydratedStart,
        endDehydrated: endDehydrated.lowerHydrationBoundary.percentHydratedEnd,
        endOverHydrated: endOverHydrated.lowerHydrationBoundary.percentHydratedEnd
      }
    }
  }
}
