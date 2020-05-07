import apiLib from '../services/apiLib.js'
import { dayPieObj } from '@/mixins/chartsObjects.js'

export const moduleDashboardDay = {
  state: {
    dashboardDayChartDataLoaded: false,
    dashboardDayUpdating: false,
    dashboardDayChartData: dayPieObj,
    dashboardDayChartTitle: ''
  },

  mutations: {
    SET_DASHBOARDDAY (state, data) {
      state.dashboardDayChartData = data
      state.dashboardDayChartTitle = 'Daily hydration status: ' + String(data.consumed) + ' L/' + String(data.target) + ' L' || ''
    },
    SET_DASHBOARDDAY_LOAD_STATUS (state, data) {
      state.dashboardDayChartDataLoaded = data
    },
    SET_DASHBOARDDAY_UPDATE_STATUS (state, data) {
      state.dashboardDayUpdating = data
    },
    RESET_DASHBOARDDAY_STATE (state) {
      state.dashboardDayChartDataLoaded = false
      state.dashboardDayUpdating = false
      state.dashboardDayChartData = []
      state.dashboardDayChartTitle = ''
    }
  },

  actions: {
    async fetchDashboardDayChartData (context, { userId, date }) {
      context.commit('SET_DASHBOARDDAY_UPDATE_STATUS', true)
      const response = await apiLib.getData('carer/dashboard-day/' + userId + '/' + date, false)
      if (typeof response === 'object') {
        const consumed = parseFloat(response[0].volumeConsumedViaEDroplet) + parseFloat(response[0].volumeConsumedViaOther)
        const target = parseFloat(response[0].hydrationTarget)
        let remaining = target - consumed
        let overHydrated = 0

        if (remaining < 0) {
          overHydrated = Math.abs(remaining)
          remaining = 0
        }

        const hydrated = consumed - overHydrated
        let data = {
          hydrated: hydrated ? hydrated.toFixed(2) : 0.00,
          target: target ? target.toFixed(2) : 0.00,
          remaining: remaining ? remaining.toFixed(2) : 0.00,
          overHydrated: overHydrated ? overHydrated.toFixed(2) : 0.00,
          consumed: consumed ? consumed.toFixed(2) : 0.00
        }

        context.commit('SET_DASHBOARDDAY', data)
        context.commit('SET_DASHBOARDDAY_LOAD_STATUS', true)
        context.commit('SET_DASHBOARDDAY_UPDATE_STATUS', false)
      } else {
        context.commit('SET_DASHBOARDDAY', dayPieObj)
        context.commit('SET_DASHBOARDDAY_LOAD_STATUS', false)
      }
    },
    resetDashboardDayState (context) {
      context.commit('RESET_DASHBOARDDAY_STATE')
    }
  }
}
