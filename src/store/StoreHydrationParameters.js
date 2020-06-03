import apiLib from '../services/apiLib.js'

export const moduleHydrationParameters = {
  state: {
    hydrationParamsLoading: false,
    defaultHydrationParamsChanged: false,
    hydrationParams: [],
    hydrationParamsClone: [],
  },
  mutations: {
    INCREMENT_PARAMETER (state, data) {
      state.hydrationParams.forEach(element => {
        if (data.timePeriod === 'start' && data.id === element.lowerHydrationBoundaryId) {
          element.lowerHydrationBoundary.percentHydratedStart++
        }
        if (data.timePeriod === 'end' && data.id === element.lowerHydrationBoundaryId) {
          element.lowerHydrationBoundary.percentHydratedEnd++
        }
      })
    },
    DECREMENT_PARAMETER (state, data) {
      state.hydrationParams.forEach(element => {
        if (data.timePeriod === 'start' && data.id === element.lowerHydrationBoundaryId) {
          element.lowerHydrationBoundary.percentHydratedStart--
        }
        if (data.timePeriod === 'end' && data.id === element.lowerHydrationBoundaryId) {
          element.lowerHydrationBoundary.percentHydratedEnd--
        }
      })
    },
    SET_HYDRATION_PARAMETERS (state, data) {
      state.hydrationParams = data
      state.hydrationParamsClone = JSON.parse(JSON.stringify(state.hydrationParams))
    },
    // START
    UPDATE_DEHYDRATED_START (state, data) {
      state.hydrationParams.find(e => e.description === 'Dehydrated').lowerHydrationBoundary.percentHydratedStart = data.value
    },
    UPDATE_HYDRATED_START (state, data) {
      state.hydrationParams.find(e => e.description === 'Hydrated').lowerHydrationBoundary.percentHydratedStart = data.value
    },
    UPDATE_OVERHYDRATED_START (state, data) {
      state.hydrationParams.find(e => e.description === 'Over Hydrated').lowerHydrationBoundary.percentHydratedStart = data.value
    },
    UPDATE_SEVERLEY_OVERHYDRATED_START (state, data) {
      state.hydrationParams.find(e => e.description === 'Severely over hydrated').lowerHydrationBoundary.percentHydratedStart = data.value
    },
    // END
    UPDATE_DEHYDRATED_END (state, data) {
      state.hydrationParams.find(e => e.description === 'Dehydrated').lowerHydrationBoundary.percentHydratedEnd = data.value
    },
    UPDATE_HYDRATED_END (state, data) {
      state.hydrationParams.find(e => e.description === 'Hydrated').lowerHydrationBoundary.percentHydratedEnd = data.value
    },
    UPDATE_OVERHYDRATED_END (state, data) {
      state.hydrationParams.find(e => e.description === 'Over Hydrated').lowerHydrationBoundary.percentHydratedEnd = data.value
    },
    UPDATE_SEVERLEY_OVERHYDRATED_END (state, data) {
      state.hydrationParams.find(e => e.description === 'Severely over hydrated').lowerHydrationBoundary.percentHydratedEnd = data.value
    },
    RESET_HYDRATION_PARAMS (state) {
      context.commit('UPDATE_DEHYDRATED_START', state.hydrationParams.find(e => e.description === 'Dehydrated').lowerHydrationBoundary.percentHydratedEnd)
    },
    SET_HYDRATION_PARAMS_LOAD_STATUS (state, data) {
      state.hydrationParamsLoading = data
    },
  },
  actions: {
    fetchHydrationParameters (context) {
      context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', true)
      return apiLib.getData('sysadmin/hydration-params').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_HYDRATION_PARAMETERS', null)
          context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', false)
          // context.commit('SET_HYDRATION_PARAMS_DEFAULT_STATUS', false)
        } else {
          context.commit('SET_HYDRATION_PARAMETERS', response)
          context.commit('SET_HYDRATION_PARAMS_LOAD_STATUS', false)
          // context.commit('SET_HYDRATION_PARAMS_DEFAULT_STATUS', false)
        }
      })
    },
    refreshHydrationParameters (context) {
      context.dispatch('fetchHydrationParameters')
    },
    async updateHydrationParameters (context) {
      context.state.hydrationParams.forEach(async element => {
        let data = element.lowerHydrationBoundary
        await apiLib.updateData('sysadmin/hydration-params/' + element.level, data, false, true)
      })
  
    }
  }
}