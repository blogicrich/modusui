import apiLib from '../services/apiLib.js'

const bounce = 500

export const moduleDashboardAway = {
  state: {
    awayLoading: false,
    awayError: false,
    awayPeriods: []
  },
  mutations: {
    SET_AWAY_PERIODS (state, data) {
      state.awayPeriods = data
    },
    SET_AWAY_PERIODS_LOAD_STATE (state, data) {
      state.awayLoading = data
    },
    SET_AWAY_PERIODS_ERROR_STATE (state, data) {
      state.awayError = data
    }
  },
  actions: {
    fetchAwayPeriods (context, payload) {
      try {
        context.commit('SET_AWAY_PERIODS_ERROR_STATE', false)
        context.commit('SET_AWAY_PERIODS_LOAD_STATE', true)
        apiLib.getData('carer/away/' + payload.id + '/' + payload.startDate + '/' + payload.endDate).then((response) => {
          if (typeof response === 'undefined' || !Array.isArray(response)) {
            context.commit('SET_AWAY_PERIODS', [])
            context.commit('SET_AWAY_PERIODS_LOAD_STATE', false)
          } else {
            context.commit('SET_AWAY_PERIODS', response)
            setTimeout(() => {
              context.commit('SET_AWAY_PERIODS_LOAD_STATE', false)
            }, bounce)
          }
        })
      } catch (error) {
        console.error(error)
        context.commit('SET_AWAY_PERIODS_ERROR_STATE', true)
        context.commit('SET_AWAY_PERIODS_LOAD_STATE', false)
      }
    }
  }
}
