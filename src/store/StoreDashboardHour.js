import apiLib from '../services/apiLib.js'

export const moduleDashboardHour = {
  state: {
    dashboardHourChartDataLoaded: true,
    dashboardHourUpdating: false,
    dashboardHourChartData: {},
    dashboardHourChartTitle: ''
  },
  mutations: {
    SET_DASHBOARDHOUR (state, data) {
      state.dashboardHourChartData = data
    },
    SET_DASHBOARDHOUR_CHART_TITLE (state, data) {
      state.dashboardHourChartTitle = 'Activity on: ' + data
    },
    SET_DASHBOARDHOUR_UPDATE_STATUS (state, data) {
      state.dashboardHourUpdating = data
    },
    SET_DASHBOARDHOUR_LOAD_STATUS (state, data) {
      state.dashboardHourChartDataLoaded = data
    },
    RESET_DASHBOARDHOUR_STATE (state) {
      state.dashboardHourChartDataLoaded = false
      state.dashboardHourUpdating = false
      state.dashboardHourChartData = hourLineBarObj
    }
  },
  actions: {
    async fetchDashboardHourChartData (context, payload) {
      context.commit('SET_DASHBOARDHOUR_UPDATE_STATUS', true)
      const response = await apiLib.getData('carer/dashboard-hour/' + payload.userId + '/' + payload.date, false, false)
      if (typeof response === 'object') {
        // const arr = []
        // response.forEach(element => {
        //   arr.push(
        //     {
        //       label: element.hour,
        //       value: parseFloat(element.volumeConsumedViaOther) +
        //       parseFloat(element.volumeConsumedViaEDroplet)
        //     }
        //   )
        // })
        context.commit('SET_DASHBOARDHOUR', response)
        context.commit('SET_DASHBOARDHOUR_CHART_TITLE', payload.formattedDate)
        context.commit('SET_DASHBOARDHOUR_UPDATE_STATUS', false)
        context.commit('SET_DASHBOARDHOUR_LOAD_STATUS', true)
      } else {
        context.commit('SET_DASHBOARDHOUR_CHART_TITLE', payload.formattedDate)
        context.commit('SET_DASHBOARDHOUR', hourLineBarObj)
        context.commit('SET_DASHBOARDHOUR_LOAD_STATUS', true)
      }
    },
    async resetDashboardHourState (context) {
      context.commit('RESET_DASHBOARDHOUR_STATE')
    }
  },
  getters: {
    getterHourLineBarChartData: state => {
      return {
        labels: state.dashboardHourChartData.labels,
        datasets: [{
          label: 'Hydration in litres',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: state.dashboardHourChartData.volumeConsumedTotal
        }]
      }
    }
  }
}
