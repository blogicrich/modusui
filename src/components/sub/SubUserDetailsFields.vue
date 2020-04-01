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
      label="Daily Other Hydration (Optional)"
      type="number"
      step="0.01"
      v-model="dailyOtherHydrationConsumption"
      append-icon="L"
      @change="change"
    ></v-text-field>
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
    <v-slider
      v-model="voiceMessageVolume"
      append-icon="volume_up"
      prepend-icon="volume_down"
      hint="Connected Droplet volume"
      persistent-hint
      @change="change"
    ></v-slider>
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
      wakeUpTime: '7:00',
      showWakeUpTimePicker: false,
      sleepTime: '22:00',
      showSleepTimePicker: false,
      voiceMessageVolume: 75,
      dailyOtherHydrationConsumption: 0,

      genderIdRules: [
        v => v !== null || 'Gender is required'
      ],

      wakeUpTimeRules: [
        v => v !== null || 'Wake up time is required'
      ],

      sleepTimeRules: [
        v => v !== null || 'Sleep time is required'
      ]
    }
  },
  methods: {
    change () {
      this.$emit('input', {
        genderId: this.genderId,
        wakeUpTime: this.wakeUpTime,
        sleepTime: this.sleepTime,
        voiceMessageVolume: this.voiceMessageVolume,
        dailyOtherHydrationConsumption: this.dailyOtherHydrationConsumption
      })
    }
  },
  watch: {
    value (newValue) {
      this.genderId = newValue.genderId
      this.wakeUpTime = newValue.wakeUpTime
      this.sleepTime = newValue.sleepTime
      this.voiceMessageVolume = newValue.voiceMessageVolume
      this.dailyOtherHydrationConsumption = newValue.dailyOtherHydrationConsumption
    }
  },
  computed: {
    genderOptions () {
      return this.genders.map(gender => { return { text: gender.description, value: gender.genderId } })
    }
  }
}
</script>
