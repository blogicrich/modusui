<template>
  <v-layout wrap>
    <v-flex xs12 class="mb-3">
      <v-sheet height="650">
        <v-calendar ref="calendar" :type="type" v-model="today" :end="today" @change="onChange" color="primary">
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
    <v-flex xs6 class="text-xs-left">
      <v-btn color="primary" @click="$refs.calendar.prev()">
        <v-icon dark left>keyboard_arrow_left</v-icon>Prev
      </v-btn>
    </v-flex>
    <v-flex xs6 class="text-xs-right">
      <v-btn color="primary" @click="$refs.calendar.next()">Next
        <v-icon right dark>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import calendarEvent from '@/components/base/BaseCalendarEventComponent'

export default {
  components: { calendarEvent },
  data: () => ({
    today: Date(),
    type: 'month'
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
        if (
          this.colorStatusPairs[i].status.toLowerCase() === status.toLowerCase()
        ) {
          return this.colorStatusPairs[i].color
        }
      }
      return 'primary'
    },
    onChange: function (event) {
      this.$emit('change', { 'month': event.start.month, 'year': event.start.year })
    }
  }
}
</script>
