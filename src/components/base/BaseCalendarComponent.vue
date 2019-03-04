<template>
  <v-layout wrap>
    <h1 style="background: none" class="mb-2 align-center">{{ title }}</h1>

    <v-flex xs12 class="mb-3">
      <v-sheet height="650">
        <v-calendar ref="calendar" v-model="today" :type="type" color="primary">
        </v-calendar>
      </v-sheet>
    </v-flex>

    <v-flex sm4 xs12 class="text-sm-left text-xs-center">
      <v-btn @click="$refs.calendar.prev()">
        <v-icon dark left>keyboard_arrow_left</v-icon>Prev
      </v-btn>
    </v-flex>
    <v-flex sm4 xs12 class="text-xs-center">
      <v-select v-model="type" :items="typeOptions" label="Type"></v-select>
    </v-flex>
    <v-flex sm4 xs12 class="text-sm-right text-xs-center">
      <v-btn @click="$refs.calendar.next()">Next
        <v-icon right dark>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
// import apiLib from "C:/Users/tom/Documents/Dev/eDroplet/ui/src/services/apiLib.js";

export default {
  /* eslint-disable */
  data: () => ({
    title: "Consumption per day",
    today: Date(),
    type: "month",
    typeOptions: [
      { text: "Day", value: "day" },
      { text: "Week", value: "week" },
      { text: "Month", value: "month" }
    ],
    tracked: {
      // import data per person per day from Database
      "2019-02-04": [100],
      "2019-02-09": [100],
      "2019-02-12": [100],
      "2019-02-20": [100],
      "2019-02-28": [100],
      "2019-02-03": [0, 100],
      "2019-02-07": [0, 100],
      "2019-02-13": [0, 100],
      "2019-02-16": [0, 100],
      "2019-02-25": [0, 100],
      "2019-02-22": [0, 100],
      "2019-02-02": [0, 0, 100],
      "2019-02-06": [0, 0, 100],
      "2019-02-14": [0, 0, 100],
      "2019-02-17": [0, 0, 100],
      "2019-02-18": [0, 0, 100],
      "2019-02-27": [0, 0, 100]
    },
    // colors: custom function/class determines what color will be used depending on the category,
    category: ["Hydrated", "Little Dehydrated", "Dehydrated"],
    // category: apiLib.getData('/carer/condition/:userId', description, auth),
    hydrationLevel: ["5.0/6.0L", "3.0/6.0L", "1.0/6.0L"]
    // hydrationLevel: apiLib.getData('/carer/reports-snapshot/:userId', aggregatedHydration, hydrationTarget, auth),
  }),
  props: {
    dayReports: Array,
    colorStatusPairs: Array
  },
  methods: {
    getColorStatusPair: function(status) {
      for (let i = 0; i < this.category.length; i++)
        for (let j = 0; j < this.colorStatusPairs.length; j++)
          if (this.category[i] === this.colorStatusPairs[j])
            return this.colorStatusPairs[j];
    }
  }
};
</script>

 <style lang="scss" scoped>
@import "./public/scss/main.scss";

.calendarTitle {
  margin-left: 7.5px;
  margin-top: 5px;
}
.drinkAmount {
  text-align: end;
  margin-top: 38px;
  margin-right: 7.5px;
}
</style>
