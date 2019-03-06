<template>
  <v-container>
    <h1>Consumption per day</h1>
    <base-calendar :events="getDayReports()" :colorStatusPairs="colorStatusPairs"></base-calendar>
  </v-container>
</template>

<script>
import store from '@/store'
import BaseCalendarComponent from '@/components/base/BaseCalendarComponent'
console.log(store.state.report.reportsSnapshot)

export default {
  components: {
    'base-calendar': BaseCalendarComponent
  },
  data: () => ({
    dayReports: [
      {
        // hydrationLevel: apiLib.getData('/carer/reports-snapshot/:userId', aggregatedHyration, hydrationTarget, dateTime),
        status: 'Hydrated',
        hydrationLevel: '9L/6L',
        date: '2019-03-01'
      },
      {
        status: 'Little Dehydrated',
        hydrationLevel: '5L/6L',
        date: '2019-03-01'
      },
      {
        status: 'Dehydrated',
        hydrationLevel: '3L/6L',
        date: '2019-03-01'
      },
      {
        status: 'Unpaired status',
        hydrationLevel: '?L/6L',
        date: '2019-03-01'
      },
      {
        status: 'hYdRAteD',
        hydrationLevel:
          'You can place as many as you want on one day. (Not that this app would want to.)',
        date: '2019-03-01'
      },
      {
        status: 'Hydrated',
        hydrationLevel: '9L/6L',
        date: '2019-03-02'
      },
      {
        status: 'Dehydrated',
        hydrationLevel: '0L/6L',
        date: '2019-03-03'
      },
      {
        status: 'Little Dehydrated',
        hydrationLevel: '5L/6L',
        date: '2019-03-04'
      },
      {
        status: 'What a strange string this is.',
        hydrationLevel: '9L/6L',
        date: '2019-03-05'
      },
      {
        status: 'Alexa, how do I escape the primary colour?',
        hydrationLevel: "Yeah, I wouldn't make the titles too long. :U",
        date: '2019-03-06'
      }
    ],
    colorStatusPairs: [
      { color: 'green', status: 'Hydrated' },
      { color: 'orange', status: 'Little Dehydrated' },
      { color: 'red', status: 'Dehydrated' }
    ]
  }),
  methods: {
    getDayReports: function () {
      let dayReports = []
      let apiData = store.state.report.reportsSnapshot
      for (let i = 0; i < apiData.length; i++) {
        let dayReport = apiData[i]
        let status = this.getDescription(dayReport.hydrationActualDayId)
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
    getDescription: function (hydrationActualDayId) {
      
    }
  }
}
</script>
