<template>
  <base-calendar :dayReports="dayReports" :colorStatusPairs="colorStatusPairs"></base-calendar>
</template>

<script>
// "#4CAF50", "", "#F44336"
import BaseCalendarComponent from "../../components/base/BaseCalendarComponent.vue";

export default {
  /* eslint-disable */
  components: {
    "base-calendar": BaseCalendarComponent
  },
  data: () => ({
    dayReports: [
      {
        date: "2019-02-28",
        condition: "Hydrated",
        hydrationLevel: "9L/6L"
      }
    ],
    colorStatusPairs: [
      { color: "green", status: "Hydrated" },
      { color: "orange", status: "Little Dehydrated" },
      { color: "red", status: "Dehydrated" }
    ]
  })
};
</script>
