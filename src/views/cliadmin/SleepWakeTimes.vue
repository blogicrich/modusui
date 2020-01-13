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
    </v-layout>
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

// import apiLib from '@/services/apiLib'

export default {
  computed: {
    user: function () {
      return this.$store.state.eDropletApp.selectedUser.userId
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
      wakeUpTime: '07:00',
      wakeUpTimeRules: [
        v => v !== null || 'Sleep time is required'
      ],
      // Sleep time pickers
      sleepTime: '22:00',
      showSleepTimePicker: false,
      sleepTimeRules: [
        v => v !== null || 'Sleep time is required'
      ],
    }
  },
  methods: {
    change () {
      this.$emit('input', {
        wakeUpTime: this.wakeUpTime,
        sleepTime: this.sleepTime,
      })
    },
  },
  mounted () {

  },
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
</style>