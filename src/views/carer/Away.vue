<template>
  <v-container>
    <h1>Consumption per day</h1>
    <base-calendar :events="dayReports" :colorStatusPairs="colorStatusPairs"></base-calendar>
  </v-container>
</template>

<script>
import reportStore from '@/store/StoreGetRaport'
import BaseCalendarComponent from '@/components/base/BaseCalendarComponent.vue'
console.log(reportStore.fetchReport())

export default {
  components: {
    'base-calendar': BaseCalendarComponent
  },
  data: () => ({
    dayReports: [
      {
        // hydrationLevel: apiLib.getData('/carer/reports-snapshot/:userId', aggregatedHyration, hydrationTarget, dateTime),
        category: 'Hydrated',
        hydrationLevel: '9L/6L',
        date: '2019-03-01'
      },
      {
        category: 'Little Dehydrated',
        hydrationLevel: '5L/6L',
        date: '2019-03-01'
      },
      {
        category: 'Dehydrated',
        hydrationLevel: '3L/6L',
        date: '2019-03-01'
      },
      {
        category: 'Unpaired Category',
        hydrationLevel: '?L/6L',
        date: '2019-03-01'
      },
      {
        category: 'hYdRAteD',
        hydrationLevel:
          'You can place as many as you want on one day. (Not that this app would want to.)',
        date: '2019-03-01'
      },
      {
        category: 'Hydrated',
        hydrationLevel: '9L/6L',
        date: '2019-03-02'
      },
      {
        category: 'Dehydrated',
        hydrationLevel: '0L/6L',
        date: '2019-03-03'
      },
      {
        category: 'Little Dehydrated',
        hydrationLevel: '5L/6L',
        date: '2019-03-04'
      },
      {
        category: 'What a strange string this is.',
        hydrationLevel: '9L/6L',
        date: '2019-03-05'
      },
      {
        category: 'Alexa, how do I escape the primary colour?',
        hydrationLevel: "Yeah, I wouldn't make the titles too long. :U",
        date: '2019-03-06'
      }
    ],
    colorStatusPairs: [
      { color: 'green', status: 'Hydrated' },
      { color: 'orange', status: 'Little Dehydrated' },
      { color: 'red', status: 'Dehydrated' }
    ]
  })
}
</script>
