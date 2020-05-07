import apiLib from '../services/apiLib.js'
import { hourLineBarObj } from '@/mixins/chartsObjects.js'

export const moduleDashboardHour = {
  state: {
    dashboardHourChartDataLoaded: false,
    dashboardHourUpdating: false,
    dashboardHourChartData: hourLineBarObj,
    dashboardHourChartTitle: ''
  },
  mutations: {
    // set the data
    SET_DASHBOARDHOUR (state, data) {
      state.dashboardHourChartData = data
      // if (data === null || data === undefined) {
      //   state.dashboardHourChartData.forEach(element => {
      //     element.value = null
      //   })
      // } else {
      //   data.forEach(dataElement => {
      //     state.dashboardHourChartData.find(stateElement => {

      //       if (stateElement.label === dataElement.label) {
      //         // Object.assign(stateElement, dataElement)
      //         stateElement.value = dataElement.value
      //       } else {
      //         state.dashboardHourChartData.push(dataElement)
      //         state.dashboardHourChartData.pop()
      //       }
      //     })
      //   })
      // }
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
      state.dashboardHourChartData = []
    }
  },
  actions: {
    async fetchDashboardHourChartData (context, payload) {
      context.commit('SET_DASHBOARDHOUR_UPDATE_STATUS', true)
      const response = await apiLib.getData('carer/dashboard-hour/' + payload.userId + '/' + payload.date, false, false)
      if (typeof response === 'object') {
        console.log(response)
        let arr = []
        response.forEach(element => {
          arr.push(
            {
              label: element.hour,
              value: parseFloat(element.volumeConsumedViaOther) +
              parseFloat(element.volumeConsumedViaEDroplet)
            }
          )
        })
        context.commit('SET_DASHBOARDHOUR', arr)
        context.commit('SET_DASHBOARDHOUR_CHART_TITLE', payload.formattedDate)
        context.commit('SET_DASHBOARDHOUR_UPDATE_STATUS', false)
        context.commit('SET_DASHBOARDHOUR_LOAD_STATUS', true)
      } else {
        context.commit('SET_DASHBOARDHOUR', hourLineBarObj)
        context.commit('SET_DASHBOARDHOUR_LOAD_STATUS', false)
      }
    },
    async resetDashboardHourState (context) {
      context.commit('RESET_DASHBOARDHOUR_STATE')
    }
  }
}
