<template>
  <v-container>
    <v-layout row align-center fill-height>
      <v-icon large color="primary">local_drink</v-icon>
      <h1 class="pg-header">Consumption Calender</h1>
    </v-layout>
    <v-divider
      class="mx-1 mb-2"
      color="#00a1cd"
      >
    </v-divider>

    <base-calendar class="mt-4" :events="getDayReports()" :colorStatusPairs="colorStatusPairs"></base-calendar>
  </v-container>
</template>

<script>
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
      let apiData = this.$store.state.report.reportsSnapshotGet
      for (let i = 0; i < apiData.length; i++) {
        let dayReport = apiData[i]
        let status = this.getDescription(dayReport.aggregatedHydration)
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

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
