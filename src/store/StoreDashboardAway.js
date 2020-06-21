import apiLib from '../services/apiLib.js'

export const moduleDashboardAway = {
  state: {
    awayLoading: false,
    awayPeriods: []
  },
  mutations: {
    SET_AWAY_PERIODS (state, data) {
      state.awayPeriods = data
    },
    SET_AWAY_PERIODS_LOAD_STATE (state, data) {
      state.awayLoading = data
    }
  },
  actions: {
    fetchAwayPeriods (context, payload) {
      // const user = rootGetters.getterSelectedUser.userId
      context.commit('SET_AWAY_PERIODS_LOAD_STATE', true)
      apiLib.getData('carer/away/' + payload.id + '/' + payload.startDate + '/' + payload.endDate, true).then((response) => {
        if (typeof response === 'undefined') {
          context.commit('SET_AWAY_PERIODS', [])
          context.commit('SET_AWAY_PERIODS_LOAD_STATE', false)
        } else {
          context.commit('SET_AWAY_PERIODS', response)
          context.commit('SET_AWAY_PERIODS_LOAD_STATE', false)
        }
      })
    }
  }
}
