<template>
  <v-container fluid>
    <BaseViewHeader
      :headerIcon="headerIcon"
      :iconColor="iconColor"
      :headerText="headerText"
      hasDivider
      fullWidth
    />
    <v-layout v-if="!intervalsLoading" row wrap fill-height justify-space-between>
      <v-flex :class="$vuetify.breakpoint.lgAndUp ? 'lg6' : 'xs12'">
        <BaseRadioOptions
          class="mx-4 my-2"
          groupIcon="online_prediction"
          :groupHeader="'Blue Light Flashing Interval Options'"
          :groupDescription="'Time between drink reminders - (Blue light flashing)'"
          :radioHeader="'Please select an option from the following:'"
        >
          <template v-slot:options>
            <v-radio-group
              :mandatory="false"
              v-model="blueLight"
              color="primary"
              :column="$vuetify.breakpoint.mdAndDown ? true : false"
            >
              <v-radio
                color="primary"
                v-for="(interval) in blueLightFlashingIntervals"
                :key="interval.blueLightFlashingIntervalId"
                :label="String(interval.time) + ' mins'"
                :value="interval.time"
                @change="$store.commit('SET_NEW_BLUE_LIGHT_INTERVAL', { id: interval.blueLightFlashingIntervalId, time: $event })"
              />
            </v-radio-group>
          </template>
        </BaseRadioOptions>
      </v-flex>
      <v-flex xs12 lg6>
        <BaseRadioOptions
          class="mx-4 my-2"
          groupIcon="record_voice_over"
          :groupHeader="'Voice Interval Options'"
          :groupDescription="'Time between drink reminders - (Voice message)'"
          :radioHeader="'Please select an option from the following:'"
        >
          <template v-slot:options>
            <v-radio-group
              :mandatory="false"
              v-model="spoken"
              color="primary"
              :column="$vuetify.breakpoint.mdAndDown ? true : false"
            >
              <v-radio
                color="primary"
                v-for="(interval) in spokenReminderIntervals"
                :key="interval.spokenReminderId"
                :label="String(interval.time) + ' mins'"
                :value="interval.time"
                @change="$store.commit('SET_NEW_SPOKEN_REMINDER_INTERVAL', { id: interval.spokenReminderId, time: $event })"
              />
            </v-radio-group>
          </template>
        </BaseRadioOptions>
      </v-flex>
    </v-layout>
    <v-layout v-if="$vuetify.breakpoint.lgAndUp" row justify-center align-center>
      <v-btn
        class="root-nav-btn"
        :disabled="!intervalsPristine"
        @click="save(selectedBlueLightInterval, selectedSpokenReminderInterval)"
        color="primary" large
      >
        Save
        <v-icon class="ma-1">save</v-icon>
      </v-btn>
      <v-btn
        class="root-nav-btn"
        :disabled="!intervalsPristine"
        @click="reset"
        color="primary" large
      >
        Reset
        <v-icon class="ma-1">refresh</v-icon>
      </v-btn>
    </v-layout>
    <v-speed-dial
      v-if="$vuetify.breakpoint.mdAndDown"
      v-model="fab"
      fixed
      :bottom="true"
      :right="true"
      direction="top"
      transition="v-fade-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="primary"
          dark
          fab
        >
          <v-icon>edit</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn
        :disabled="!intervalsPristine"
        @click="save"
        color="primary"
        fab
        dark
        small
      >
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn
        :disabled="!intervalsPristine"
        @click="reset"
        color="primary"
        fab
        dark
        small
      >
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-container>
</template>

<script>

import BaseRadioOptions from '@/components/base/BaseRadioOptionsSelectComponent.vue'
import { mapState } from 'vuex'

export default {
  name: 'IntervalOptions',
  components: {
    BaseRadioOptions
  },
  computed: {
    ...mapState({
      intervals: state => state.intervalOptions.intervals,
      intervalsLoading: state => state.intervalOptions.intervalsLoading,
      intervalsClone: state => state.intervalOptionsClone,
      originalBlueLightFlashingInterval: state => state.intervalOptions.intervalsClone.blueLightFlashingInterval.find(interval => interval.default === 'Y'),
      originalSpokenReminderInterval: state => state.intervalOptions.intervalsClone.spokenReminder.find(interval => interval.default === 'Y'),
      blueLightFlashingIntervals: state => state.intervalOptions.intervals.blueLightFlashingInterval,
      selectedBlueLightInterval: state => state.intervalOptions.intervals.blueLightFlashingInterval.find(interval => interval.default === 'Y'),
      selectedBlueLightIntervalId: state => state.intervalOptions.intervals.blueLightFlashingInterval.find(interval => interval.default === 'Y').blueLightFlashingIntervalId,
      spokenReminderIntervals: state => state.intervalOptions.intervals.spokenReminder,
      selectedSpokenReminderInterval: state => state.intervalOptions.intervals.spokenReminder.find(interval => interval.default === 'Y')
    }),
    intervalsPristine () {
      if (this.selectedBlueLightInterval.blueLightFlashingIntervalId !== this.originalBlueLightFlashingInterval.blueLightFlashingIntervalId ||
          this.selectedSpokenReminderInterval.spokenReminderId !== this.originalSpokenReminderInterval.spokenReminderId) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'notification_important',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Interval Options',
      // BaseRadioSelect
      spoken: null,
      blueLight: null,
      // Speed Dial
      fab: ''
    }
  },
  methods: {
    reset () {
      this.$store.commit('RESET_INTERVAL_OPTIONS')
      this.blueLight = this.selectedBlueLightInterval.time
      this.spoken = this.selectedSpokenReminderInterval.time
    },
    save () {
      this.$store.dispatch('updateIntervalOptions', {
        blueLightFlashingIntervalId: this.selectedBlueLightInterval.blueLightFlashingIntervalId,
        spokenReminderId: this.selectedSpokenReminderInterval.spokenReminderId
      })
    },
    async setData () {
      try {
        await this.$store.dispatch('fetchIntervals')
        this.blueLight = this.selectedBlueLightInterval.time
        this.spoken = this.selectedSpokenReminderInterval.time
      } catch (error) {
        // TBI
      }
    }
  },
  mounted () {
    this.setData()
  },
  beforeRouteLeave (to, from, next) {
    if (this.intervalsPristine && !window.confirm('Do you really want to leave? You will lose all unsaved changes!')) {
      return next(false)
    }
    next()
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
