<template>
  <v-layout wrap>
    <h1 style="background: none" class="mb-2 align-center">{{ title }}</h1>

    <v-flex xs12 class="mb-3">
      <v-sheet height="650">
        <v-calendar :value="today" color="primary">
          <template v-slot:day="{ date }">
            <calendarEvent v-for="(event, index) in eventsMap[date]" :key="index" :title="event.category" :color="'green'" :menuText="event.hydrationLevel">
              
            </calendarEvent>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
// import apiLib from "C:/Users/tom/Documents/Dev/eDroplet/ui/src/services/apiLib.js";
import calendarEvent from '@/components/base/BaseCalendarEventComponent'

export default {
  components: {calendarEvent},
  data: () => ({
    title: "Consumption per day",
    today: Date(),
    events: [
      {
        category: 'Hydrated',
        hydrationLevel: '9L/6L',
        date: '2019-03-01',
      }
    ],
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
  computed: {
    eventsMap () {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
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
