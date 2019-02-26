<template>
  <v-layout wrap>
    <h1 style="background: none" class="mb-1 align-center">{{ title }}</h1>

    <v-flex xs12 class="mb-3">
      <v-sheet height="650">
        <v-calendar ref="calendar" v-model="today" :type="type" color="primary">
          <v-layout slot="day" slot-scope="{ present, past, date }" fill-height>
            <template v-if="past && tracked[date]">
              <v-sheet
                v-for="(percent, i) in tracked[date]"
                :key="i"
                :title="category[i]"
                :color="colors[i]"
                :width="`${percent}%`"
              />
            </template>
          </v-layout>
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
export default {
  /* eslint-disable */
  data: () => ({
    title: "Consumption",
    today: Date,
    type: "month",
    typeOptions: [
      { text: "Day", value: "day" },
      { text: "Week", value: "week" },
      { text: "Month", value: "month" }
    ],
    tracked: {
      "2019-02-04": [100],
      "2019-02-09": [100],
      "2019-02-12": [100],
      "2019-02-18": [100],
      "2019-02-24": [100],
      "2019-02-03": [0, 100],
      "2019-02-07": [0, 100],
      "2019-02-13": [0, 100],
      "2019-02-16": [0, 100],
      "2019-02-25": [0, 100],
      "2019-02-02": [0, 0, 100],
      "2019-02-06": [0, 0, 100],
      "2019-02-14": [0, 0, 100],
      "2019-02-14": [0, 0, 100],
      "2019-02-20": [0, 0, 100],
      "2019-02-27": [0, 0, 100],
      "2019-02-17": [0, 0, 100],
    },
    colors: ["#4CAF50", "#FF9800", "#F44336"],
    category: ["Hydrated", "Little Dehydrated", "Dehydrated"]
  })
};
</script>