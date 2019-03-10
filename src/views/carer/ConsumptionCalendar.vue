<template>
  <v-container>
    <h1>Consumption per day</h1>
    <base-calendar :events="getDayReports()" :colorStatusPairs="colorStatusPairs"></base-calendar>
  </v-container>
</template>

<script>
import store from '@/store'
import BaseCalendarComponent from '@/components/base/BaseCalendarComponent'

export default {
  components: {
    'base-calendar': BaseCalendarComponent
  },
  data: () => ({
    colorStatusPairs: [
      { color: 'green', status: 'Hydrated' },
      { color: 'amber', status: 'Little Dehydrated' },
      { color: 'red', status: 'Dehydrated' },
      { color: 'amber', status: 'Little Overhydrated'},
      { color: 'red', status: 'Overhydrated'}
    ]
  }),
  methods: {
    getDayReports: function () {
      let dayReports = []
      let apiData = store.state.report.reportsSnapshot
      for (let i = 0; i < apiData.length; i++) {
        let dayReport = apiData[i]
        let status = this.getDescription(dayReport.aggregatedHyration)
        let hydrationLevel =
          dayReport.volumeConsumedViaEDroplet +
          dayReport.volumeConsumedViaOther +
          '/' +
          dayReport.hydrationTarget
        let date = dayReport.dateTime

        dayReports.push({
          status: status,
          hydrationLevel: hydrationLevel,
          date: date
        })
      }
      return dayReports
    },
    getDescription: function (aggregatedHydration) {
      if(aggregatedHydration <= 60) {
        return 'Dehydrated'
      } else if (aggregatedHydration <= 90) {
        return 'Little Dehydrated'
      } else if (aggregatedHydration >= 120) {
        return 'little Overhydrated'
      } else if (aggregatedHydration >= 150) {
        return 'Overhydrated'
      } else {
        return 'Hydrated'
      }
    }
  }
}
</script>
