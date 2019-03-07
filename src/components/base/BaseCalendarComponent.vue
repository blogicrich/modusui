<template>
  <v-layout wrap>
    <h1 style="background: none" class="mb-2 align-center">{{ title }}</h1>

    <v-flex xs12 class="mb-3">
      <v-sheet height="650">
        <v-calendar :value="today" color="primary">
          <template v-slot:day="{ date }">
            <calendarEvent
              v-for="(event, index) in eventsMap[date]"
              :key="index"
              :title="event.status"
              :color="getColorByStatus(event.status)"
              :menuText="event.hydrationLevel"
            ></calendarEvent>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import calendarEvent from '@/components/base/BaseCalendarEventComponent'

export default {
  components: { calendarEvent },
  data: () => ({
    today: Date()
  }),
  props: {
    events: Array,
    colorStatusPairs: Array
  },
  computed: {
    eventsMap: function () {
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    }
  },
  methods: {
    getColorByStatus: function (status) {
      for (let i = 0; i < this.colorStatusPairs.length; i++) {
        if (this.colorStatusPairs[i].status.toLowerCase() === status.toLowerCase()) {
          return this.colorStatusPairs[i].color
        }
      }
      return 'primary'
    }
  }
}
</script>
