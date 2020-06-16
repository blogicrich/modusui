<template>
  <v-container>
    <v-layout row align-center fill-height>
      <v-icon large color="primary">local_drink</v-icon>
      <h1 class="pg-header">Consumption Calendar</h1>
      <v-spacer></v-spacer>
      <h1>{{ monthString }}</h1>
    </v-layout>
    <v-divider class="mx-1 mb-2" color="#00a1cd"></v-divider>

    <base-calendar
      class="mt-4"
      :events="getDayReports()"
      :colorStatusPairs="colorStatusPairs"
      @change="onChange"
    ></base-calendar>
  </v-container>
</template>

<script>
import BaseCalendarComponent from '@/components/base/BaseCalendarComponent'

export default {
  components: {
    'base-calendar': BaseCalendarComponent
  },
  data: () => ({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    colorStatusPairs: [
      { color: 'green', status: 'Hydrated' },
      { color: 'amber', status: 'Little Dehydrated' },
      { color: 'red', status: 'Dehydrated' },
      { color: 'amber', status: 'Little Overhydrated' },
      { color: 'red', status: 'Overhydrated' }
    ]
  }),
  methods: {
    getDayReports: function () {
      const dayReports = this.$store.state.report.reportDayReportsGet

      for (let i = 0; i < dayReports.length; i++) {
        const dayReport = dayReports[i]
        dayReports[i].status = this.getDescription(dayReport.status)
      }
      return dayReports
    },
    getDescription: function (aggregatedHydration) {
      if (aggregatedHydration <= 60) {
        return 'Dehydrated'
      } else if (aggregatedHydration <= 90) {
        return 'Little Dehydrated'
      } else if (aggregatedHydration >= 120) {
        return 'Little Overhydrated'
      } else if (aggregatedHydration >= 150) {
        return 'Overhydrated'
      } else {
        return 'Hydrated'
      }
    },
    onChange: function (value) {
      this.month = value.month - 1
      this.year = value.year
    }
  },
  computed: {
    monthString: function () {
      const monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return monthStrings[this.month] + ' ' + this.year
    }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
