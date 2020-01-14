<template lang="html">
  <v-container>
     <v-layout row align-center fill-height>
      <BaseViewHeader
        class="mb-2"
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
      />
      <v-spacer></v-spacer>
    </v-layout v-if="wakeUpTime && sleepTime">
    <v-menu
      ref="wakeUpTimePicker"
      v-model="showWakeUpTimePicker"
      :close-on-content-click="false"
      :nudge-right="60"
      :return-value.sync="wakeUpTime"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          class="mx-3"
          v-model="wakeUpTime"
          label="Wake up time"
          prepend-icon="brightness_5"
          readonly
          v-on="on"
          :rules="wakeUpTimeRules"
          @change="change"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="showWakeUpTimePicker"
        v-model="wakeUpTime"
        full-width
        @click:minute="$refs.wakeUpTimePicker.save(wakeUpTime)"
      ></v-time-picker>
    </v-menu>
    <v-menu
      ref="sleepTimePicker"
      v-model="showSleepTimePicker"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="sleepTime"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          class="mx-3"
          v-model="sleepTime"
          label="Sleep time"
          prepend-icon="brightness_3"
          readonly
          v-on="on"
          :rules="sleepTimeRules"
          @change="change"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="showSleepTimePicker"
        v-model="sleepTime"
        full-width
        @click:minute="$refs.sleepTimePicker.save(sleepTime)"
      ></v-time-picker>
    </v-menu>
  </v-container>
</template>

<script>

export default {
  name: 'WakeSleepTimes',
  computed: {
    wakeUpTime: {
      get () {
        console.log(this.$store.state.wakeSleepTimes.times.wakeUpTime)
        return this.$store.state.wakeSleepTimes.times.wakeUpTime
      },
      set (newValue) {
        this.$store.commit('UPDATE_WAKEUPTIME', newValue)
      }
    },
    sleepTime: {
      get () {
        console.log(this.$store.state.wakeSleepTimes.times.sleepTime)
        return this.$store.state.wakeSleepTimes.times.sleepTime
      },
      set (newValue) {
        this.$store.commit('UPDATE_SLEEPTIME', newValue)      
      }
    },
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_drink',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Sleep and Wake up Times',
      // Wake up time pickers
      showWakeUpTimePicker: false,
      // wakeUpTime: '07:00',
      wakeUpTimeRules: [
        v => v !== null || 'Sleep time is required'
      ],
      // Sleep time pickers
      // sleepTime: '22:00',
      showSleepTimePicker: false,
      sleepTimeRules: [
        v => v !== null || 'Sleep time is required'
      ],
    }
  },
  methods: {
    change () {
      // console.log(this.convertTimeToSecondsFromMidnight(this.wakeUpTime), this.convertTimeToSecondsFromMidnight(this.sleepTime))
    },
    convertTimeToSecondsFromMidnight (time) {
      const startOfDay = this.$moment().startOf('day')
      return this.$moment(time, 'HH:mm').diff(startOfDay, 'seconds')
    }
  },
  mounted() {
    this.$store.dispatch('fetchWakeSleepTimes')
  },
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
</style>