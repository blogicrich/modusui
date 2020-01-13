<template>
  <v-container>
    <v-layout row align-center fill-height>
      <BaseViewHeader
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
      />
      <v-spacer></v-spacer>
    </v-layout>
    <v-container v-if="intervals">
    <h2 class="pg-subheader text-primary">eDroplet Reminder Interval Options</h2>
    <v-divider
      class="mx-1"
      color="#00a1cd"
      >
    </v-divider>
      <v-layout row wrap fill-height justify-space-between>
        <v-flex xs12 lg6>
          <BaseRadioOptions
            @radio-option-changed="setNewUpdateObject"
            :radioConfig="intervals.blueLightFlashingIntervals"
            :defaultValue="setDefaultValue('blueLightFlashingIntervals', 'blueLightFlashingIntervalId')"
            :groupHeader="drinkGroupHeader"
            :groupDescription="drinkRadioDescription"
            :radioHeader="drinkRadioHeader"
            :height="height"
            suffix=" mins"
          />
        </v-flex>
        <v-flex xs12 lg6>
          <BaseRadioOptions
            @radio-option-changed="setNewUpdateObject"
            :radioConfig="intervals.voiceReminderIntervals"
            :groupHeader="voiceGroupHeader"
            :defaultValue="setDefaultValue('voiceReminderIntervals', 'spokenReminderId')"
            :groupDescription="voiceRadioDescription"
            :radioHeader="voiceRadioHeader"
            :height="height"
            suffix=" mins"
          />
        </v-flex>
      </v-layout>
      <h2 class="pg-subheader text-primary">eDroplet Comms Interval Options</h2>
      <v-divider
        class="mx-2"
        color="#00a1cd"
        >
      </v-divider>
    <v-layout row wrap fill-height justify-space-between>
      <v-flex xs12 lg6>
        <BaseRadioOptions
          @radio-option-changed="setNewUpdateObject"
          :radioConfig="intervals.wakeUpIntervals"
          :defaultValue="setDefaultValue('wakeUpIntervals', 'wakeUpIntervalId')"
          :groupHeader="wakeUpGroupHeader"
          :groupDescription="wakeUpRadioDescription"
          :radioHeader="wakeUpRadioHeader"
          :height="height"
          suffix=" mins"
        />
      </v-flex>
      <v-flex xs12 lg6>
        <BaseRadioOptions
          @radio-option-changed="setNewUpdateObject"
          :radioConfig="intervals.buServerIntervals"
          :defaultValue="setDefaultValue('buServerIntervals', 'buServerIntervalId')"
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
        <v-btn
        v-if="newDefaultValue"
        class="root-nav-btn"
        @click="save"
        color="primary"
        large
        >Save
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
import apiLib from '@/services/apiLib'

export default {
  name: 'IntervalSettingsManagement',
  components: {
    BaseRadioOptions,
    SubPageNavButton,
    selectComponent
  },
  computed: {
    user: function () {
      return this.$store.state.eDropletApp.selectedUser.userId
    },
    height () {
      var cardHeight = 0
      if (this.$vuetify.breakpoint.smAndUp) cardHeight = '225px'
      if (this.$vuetify.breakpoint.xsOnly) cardHeight = '380px'
      return cardHeight
    }
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'notification_important',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Interval Settings Management',
      // BaseUserSelect
      intervals: null,
      multiple: false,
      selectAll: 'Select all',
      searchName: 'Search user..',
      cliadminReadUrl: 'cliadmin/interval-settings/',
      cliadminWriteUrl: 'cliadmin/interval-settings/',
      newDefaultValue: false,
      updateObj: {},
      drinkGroupHeader: 'Blue light flashing interval options',
      drinkRadioDescription: 'Time between drink reminders - (Blue light flashing)',
      drinkRadioHeader: 'Please select an option from the following:',
      voiceGroupHeader: 'Voice Interval Options',
      voiceRadioDescription: 'Time between drink reminders - (Voice message)',
      voiceRadioHeader: 'Time interval in minutes',
      wakeUpGroupHeader: 'Wake-up Interval Options',
      wakeUpRadioDescription: 'Time between wake up and first communication of the day - (Voice message)',
      wakeUpRadioHeader: 'Time interval in minutes',
      commsGroupHeader: 'Communication Interval Options',
      commsRadioDescription: 'Time between edroplet communications - (Voice message)',
      commsRadioHeader: 'Time interval in minutes'
    }
  },
  methods: {
    // Sets the new value of the API update object
    setDefaultValue (key, parameter) {
      const id = this.intervals.currentSettings[parameter]
      const time = this.intervals[key].find(values => values[parameter] === id)
      const values = this.intervals[key]
      console.log(id, time, values)
      console.log(id)
      return time
    },
    setUpdateObject (intervals) {
      this.updateObj = {
        blueLightFlashingIntervalId: intervals.blueLightFlashingIntervals.find(e => e.default === true).blueLightFlashingIntervalId,
        buServerIntervalId: intervals.buServerIntervals.find(e => e.default === true).buServerIntervalId,
        voiceReminderIntervalId: intervals.voiceReminderIntervals.find(e => e.default === true).spokenReminderId,
        wakeUpIntervalId: intervals.wakeUpIntervals.find(e => e.default === true).wakeUpIntervalId
      }
      // console.log(this.updateObj)
    },
    // Sets the new value of the radio group and appends to updateObject
    setNewUpdateObject (obj) {
      const key = Object.keys(obj.items[obj.index])[0]
      console.log('set value - obj: ', obj)
      if (obj.defaultValue === obj.newValue) {
        this.newDefaultValue = false
      } else {
        this.newDefaultValue = true
        this.updateObj[key] = obj.items[obj.index][key]
      }
      
      // console.log(obj.items[obj.index])
      // console.log(Object.keys(obj.items[obj.index])[0])
      // console.log(this.updateObj)
    },
    // Posts update requests
    save () {
      apiLib.updateData(this.cliadminWriteUrl + this.user, this.updateObj, true, true).then(() => {
        apiLib.getData(this.cliadminReadUrl + this.user)
      })
      this.newDefaultValue = false
    }
  },
  mounted () {
    apiLib.getData(this.cliadminReadUrl + this.user).then((response) => {
      this.intervals = response
      this.setUpdateObject(response)
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.newDefaultValue === true) {
      let answer = window.confirm('Do you really want to leave? You will loose all unsaved changes!')
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
