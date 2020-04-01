<template>
  <v-container>
    <v-layout row align-center fill-height>
      <BaseViewHeader
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
        showChips
        :chipsText="userText"
      />
      <v-spacer></v-spacer>
    </v-layout>
    <v-container v-if="intervalSettings">
      <h2 class="pg-subheader text-primary">eDroplet Reminder Interval Options</h2>
      <v-divider class="mx-1" color="#00a1cd"></v-divider>
      <v-layout row wrap fill-height justify-space-between>
        <v-flex xs12 lg6>
          <BaseRadioOptions
            @radio-option-changed="onChange"
            :radioConfig="intervalSettings.blueLightFlashingIntervals"
            :defaultValue="selectedBlueLightFlashingInterval.time"
            :groupHeader="drinkGroupHeader"
            :groupDescription="drinkRadioDescription"
            :radioHeader="drinkRadioHeader"
            :height="height"
            suffix=" mins"
          />
        </v-flex>
        <v-flex xs12 lg6>
          <BaseRadioOptions
            @radio-option-changed="onChange"
            :radioConfig="intervalSettings.voiceReminderIntervals"
            :groupHeader="voiceGroupHeader"
            :defaultValue="selectedVoiceReminderInterval.time"
            :groupDescription="voiceRadioDescription"
            :radioHeader="voiceRadioHeader"
            :height="height"
            suffix=" mins"
          />
        </v-flex>
      </v-layout>
      <h2 class="pg-subheader text-primary">eDroplet Comms Interval Options</h2>
      <v-divider class="mx-2" color="#00a1cd"></v-divider>
      <v-layout row wrap fill-height justify-space-between>
        <v-flex xs12 lg6>
          <BaseRadioOptions
            @radio-option-changed="onChange"
            :radioConfig="intervalSettings.wakeUpIntervals"
            :defaultValue="selectedWakeUpInterval.time"
            :groupHeader="wakeUpGroupHeader"
            :groupDescription="wakeUpRadioDescription"
            :radioHeader="wakeUpRadioHeader"
            :height="height"
            suffix=" mins"
          />
        </v-flex>
        <v-flex xs12 lg6>
          <BaseRadioOptions
            @radio-option-changed="onChange"
            :radioConfig="intervalSettings.buServerIntervals"
            :defaultValue="selectedBuServerInterval.time"
            :groupHeader="commsGroupHeader"
            :groupDescription="commsRadioDescription"
            :radioHeader="commsRadioHeader"
            :height="height"
            suffix=" mins"
          />
        </v-flex>
      </v-layout>
      <v-layout row justify-center align-center>
        <v-fade-transition>
          <v-btn v-if="!intervalsPristine" class="root-nav-btn" @click="save" color="primary" large>
            Save
            <v-icon class="ma-1">save</v-icon>
          </v-btn>
        </v-fade-transition>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>

import BaseRadioOptions from '@/components/base/BaseRadioOptionsSelectComponent.vue'
import SubPageNavButton from '@/components/sub/SubPageNavButton.vue'
import selectComponent from '@/components/base/BaseUserSelectComponent.vue'
import { mapState } from 'vuex'

export default {
  name: 'IntervalSettingsManagement',
  components: {
    BaseRadioOptions,
    SubPageNavButton,
    selectComponent
  },
  computed: {
    ...mapState({
      intervalSettings: state => state.intervalSettings.intervalSettings,
      selectedIntervals: state => state.intervalSettings.intervalSettings.currentSettings
    }),

    selectedBlueLightFlashingInterval () {
      return this.intervalSettings.blueLightFlashingIntervals.find(
        interval => interval.blueLightFlashingIntervalId === this.selectedIntervals.blueLightFlashingIntervalId
      )
    },

    selectedBuServerInterval () {
      return this.intervalSettings.buServerIntervals.find(
        interval => interval.buServerIntervalId === this.selectedIntervals.buServerIntervalId
      )
    },

    selectedWakeUpInterval () {
      return this.intervalSettings.wakeUpIntervals.find(
        interval => interval.wakeUpIntervalId === this.selectedIntervals.wakeUpIntervalId
      )
    },

    selectedVoiceReminderInterval () {
      return this.intervalSettings.voiceReminderIntervals.find(
        interval => interval.spokenReminderId === this.selectedIntervals.spokenReminderId
      )
    },

    height () {
      var cardHeight = 0
      if (this.$vuetify.breakpoint.smAndUp) cardHeight = '225px'
      if (this.$vuetify.breakpoint.xsOnly) cardHeight = '380px'
      return cardHeight
    },
    userText: function () {
      let val = this.$store.getters.getterSelectedUser.givenName
      return val
    }
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'notification_important',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Interval Settings Management',
      // BaseUserSelect
      multiple: false,
      selectAll: 'Select all',
      searchName: 'Search user..',
      cliadminReadUrl: 'cliadmin/interval-settings/',
      cliadminWriteUrl: 'cliadmin/interval-settings/',
      intervalsPristine: true,
      updatedIntervals: {},
      drinkGroupHeader: 'Blue light flashing interval options',
      drinkRadioDescription: 'Time between drink reminders - (Blue light flashing)',
      drinkRadioHeader: 'Please select an option from the following:',
      voiceGroupHeader: 'Voice Interval Options',
      voiceRadioDescription: 'Time between drink reminders - (Voice message)',
      voiceRadioHeader: 'Time interval in minutes',
      wakeUpGroupHeader: 'Wake-up Interval Options',
      wakeUpRadioDescription: 'Time between wake up and first communication of the day',
      wakeUpRadioHeader: 'Time interval in minutes',
      commsGroupHeader: 'Communication Interval Options',
      commsRadioDescription: 'Time between edroplet communications - (Timer)',
      commsRadioHeader: 'Time interval in minutes'
    }
  },
  methods: {
    onChange (change) {
      this.intervalsPristine = false
      const newInterval = change.items[change.index]

      // HACK: Find the correct intervalId key and apply it to the update object.
      for (const key of Object.keys(this.selectedIntervals)) {
        if (Object.keys(newInterval).includes(key)) {
          this.updatedIntervals[key] = newInterval[key]
        }
      }
    },
    save () {
      this.$store.dispatch('updateIntervalSettings', this.updatedIntervals).then(() => {
        this.intervalsPristine = true
        this.$store.dispatch('fetchIntervalSettings')
      })
    }
  },
  mounted () {
    this.$store.dispatch('fetchIntervalSettings').then(() => {
      this.updatedIntervals = { ...this.selectedIntervals }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (!this.intervalsPristine && !window.confirm('Do you really want to leave? You will lose all unsaved changes!')) {
      return next(false)
    }

    next()
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
