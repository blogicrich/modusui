<template>
  <div>
    <v-select
      v-model="genderId"
      :items="genderOptions"
      :rules="genderIdRules"
      label="Gender"
      @change="change"
    />
    <v-text-field
      label="Daily Other Hydration"
      type="number"
      step="0.01"
      :rules="dailyOtherHydrationConsumptionRules"
      v-model="dailyOtherHydrationConsumption"
      append-icon="L"
      @change="change"
    />
    <v-menu
      ref="wakeUpTimePicker"
      v-model="showWakeUpTimePicker"
      :close-on-content-click="false"
      :nudge-right="40"
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
          v-model="wakeUpTime"
          label="Wake up time"
          prepend-icon="brightness_5"
          readonly
          v-on="on"
          :rules="wakeUpTimeRules"
          @change="change"
        />
      </template>
      <v-time-picker
        v-if="showWakeUpTimePicker"
        v-model="wakeUpTime"
        full-width
        @click:minute="$refs.wakeUpTimePicker.save(wakeUpTime)"
      />
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
          v-model="sleepTime"
          label="Sleep time"
          prepend-icon="brightness_3"
          readonly
          v-on="on"
          :rules="sleepTimeRules"
          @change="change"
        />
      </template>
      <v-time-picker
        v-if="showSleepTimePicker"
        v-model="sleepTime"
        full-width
        @click:minute="$refs.sleepTimePicker.save(sleepTime)"
      />
    </v-menu>
    <v-slider
      v-model="voiceMessageVolume"
      append-icon="volume_up"
      prepend-icon="volume_down"
      hint="Connected Droplet volume"
      persistent-hint
      @change="change"
    />
    <v-text-field
      label="Miscellaneous Adjustements"
      type="number"
      step="0.01"
      :rules="miscellaneousAdjustmentRules"
      v-model="miscellaneousAdjustment"
      append-icon="L"
      @change="change"
    />
    <v-text-field
      label="Comments"
      :rules="commentsRules"
      v-model="comments"
      @change="change"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    genders: Array
  },
  data () {
    return {
      genderId: null,
      wakeUpTime: 25200,
      showWakeUpTimePicker: false,
      sleepTime: 79200,
      showSleepTimePicker: false,
      voiceMessageVolume: 75,
      dailyOtherHydrationConsumption: 0,
      miscellaneousAdjustment: 0,
      comments: '',

      genderIdRules: [
        v => v !== null || 'Gender is required'
      ],

      wakeUpTimeRules: [
        v => v !== null || 'Wake up time is required'
      ],

      sleepTimeRules: [
        v => v !== null || 'Sleep time is required'
      ],

      dailyOtherHydrationConsumptionRules: [
        v => v <= 99.99 || 'Number too large',
        v => v >= 0 || 'Number too low'
      ],

      miscellaneousAdjustmentRules: [
        v => v <= 99.99 || 'Number too large',
        v => v >= -99.99 || 'Number too low'
      ],

      commentsRules: [
        v => v.length <= 256 || 'Comments are too long'
      ]
    }
  },
  methods: {
    change () {
      this.$emit('input', {
        genderId: this.genderId,
        wakeUpTime: this.timeStringToSeconds(this.wakeUpTime),
        sleepTime: this.timeStringToSeconds(this.sleepTime),
        voiceMessageVolume: this.voiceMessageVolume,
        dailyOtherHydrationConsumption: this.dailyOtherHydrationConsumption,
        miscellaneousAdjustment: this.miscellaneousAdjustment,
        comments: this.comments
      })
    },
    timeStringToSeconds (string) {
      const [hourString, minutesString] = string.split(':')
      return parseInt(hourString) * 3600 + parseInt(minutesString) * 60
    },
    secondsToTimeString (seconds) {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds - hours * 3600) / 60)
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }
  },
  watch: {
    value (newValue) {
      this.genderId = newValue.genderId
      this.wakeUpTime = this.secondsToTimeString(newValue.wakeUpTime)
      this.sleepTime = this.secondsToTimeString(newValue.sleepTime)
      this.voiceMessageVolume = newValue.voiceMessageVolume
      this.dailyOtherHydrationConsumption = newValue.dailyOtherHydrationConsumption
      this.miscellaneousAdjustment = newValue.miscellaneousAdjustment
      this.comments = newValue.comments
    }
  },
  computed: {
    genderOptions () {
      return this.genders.map(gender => { return { text: gender.description, value: gender.genderId } })
    }
  }
}
</script>
