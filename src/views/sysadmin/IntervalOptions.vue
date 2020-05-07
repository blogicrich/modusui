<template>
  <v-container fluid>
    <v-layout row align-center fill-height>
      <BaseViewHeader
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
      />
      <v-spacer></v-spacer>
    </v-layout>
    <!-- DESKTOP VIEW -->
    <v-container fluid v-if="intervals.length > 0 && $vuetify.breakpoint.mdAndUp">
      <v-layout row fill-height align-center justify-space-around>
          <BaseRadioOptions
            @radio-option-changed="setNewUpdateObject"
            :radioConfig="intervals[0].blueLightFlashingInterval"
            :defaultValue="intervals[0].blueLightFlashingInterval.find(val => val.default === true).time"
            :groupHeader="drinkGroupHeader"
            :groupDescription="drinkRadioDescription"
            :radioHeader="drinkRadioHeader"
            :height="height"
            suffix=" mins"
          />
          <BaseRadioOptions
            @radio-option-changed="setNewUpdateObject"
            :radioConfig="intervals[0].spokenReminder"
            :groupHeader="voiceGroupHeader"
            :defaultValue="intervals[0].spokenReminder.find(val => val.default === true).time"
            :groupDescription="voiceRadioDescription"
            :radioHeader="voiceRadioHeader"
            :height="height"
            suffix=" mins"
          />
      </v-layout>
      <v-layout row justify-center align-center>
        <v-fade-transition>
          <v-btn
            :disabled="!newDefaultValue"
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
    <!-- MOBILE VIEW -->
    <v-container v-if="intervals.length > 0 && $vuetify.breakpoint.smAndDown">
      <v-layout column fill-height align-center justify-space-around>
          <BaseRadioOptions
            @radio-option-changed="setNewUpdateObject"
            :radioConfig="intervals[0].blueLightFlashingInterval"
            :defaultValue="intervals[0].blueLightFlashingInterval.find(val => val.default === true).time"
            :groupHeader="drinkGroupHeader"
            :groupDescription="drinkRadioDescription"
            :radioHeader="drinkRadioHeader"
            :height="height"
            suffix=" mins"
          />
          <BaseRadioOptions
            @radio-option-changed="setNewUpdateObject"
            :radioConfig="intervals[0].spokenReminder"
            :groupHeader="voiceGroupHeader"
            :defaultValue="intervals[0].spokenReminder.find(val => val.default === true).time"
            :groupDescription="voiceRadioDescription"
            :radioHeader="voiceRadioHeader"
            :height="height"
            suffix=" mins"
          />
      </v-layout>
    <v-speed-dial
      v-if="newDefaultValue && $vuetify.breakpoint.mdAndDown"
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
        @click="save"
        color="primary"
        fab
        dark
        small
      >
        <v-icon>save</v-icon>
      </v-btn>
      <!-- <v-btn
        @click="reset"
        color="primary"
        fab
        dark
        small
      >
        <v-icon>refresh</v-icon>
      </v-btn> -->
    </v-speed-dial>
    </v-container>
  </v-container>
</template>

<script>

import BaseRadioOptions from '@/components/base/BaseRadioOptionsSelectComponent.vue'
import SubPageNavButton from '@/components/sub/SubPageNavButton.vue'
import apiLib from '@/services/apiLib'

export default {
  name: 'IntervalOptions',
  components: {
    BaseRadioOptions,
    SubPageNavButton
  },
  computed: {
    height () {
      var cardHeight = 0
      if (this.$vuetify.breakpoint.smAndUp) cardHeight = '225px'
      if (this.$vuetify.breakpoint.xsOnly) cardHeight = '380px'
      return cardHeight
    }
  },
  data () {
    return {
      fab: false,
      headerIcon: 'notification_important',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Interval Options',
      intervals: [],
      multiple: false,
      selectAll: 'Select all',
      searchName: 'Search user..',
      sysadminReadUrl: 'sysadmin/interval-options',
      sysadminWriteUrl: 'sysadmin/interval-options',
      newDefaultValue: false,
      updateObj: {},
      drinkGroupHeader: 'Blue light Interval Options',
      drinkRadioDescription: 'Time between drink reminders - Blue light flashing:',
      drinkRadioHeader: 'Please select an option from the following:',
      voiceGroupHeader: 'Voice Message Interval Options',
      voiceRadioDescription: 'Time between drink reminders - Voice message:',
      voiceRadioHeader: 'Time interval in minutes'
    }
  },
  methods: {
    // Get and set UI data
    setData () {
      apiLib.getData(this.sysadminReadUrl).then((response) => {
        this.intervals = response
        this.setUpdateObject(this.intervals)
        // console.log('intervals: ', this.intervals, this.updateObj)
      })
    },
    // Sets the new value of the API update object
    setUpdateObject (intervals) {
      this.updateObj = {
        blueLightFlashingIntervalId: intervals[0].blueLightFlashingInterval.find(e => e.default === true).blueLightFlashingIntervalId,
        buServerIntervalId: intervals[0].buServerInterval.find(e => e.default === true).buServerIntervalId,
        spokenReminderId: intervals[0].spokenReminder.find(e => e.default === true).spokenReminderId,
        wakeUpIntervalId: intervals[0].wakeUpInterval.find(e => e.default === true).wakeUpIntervalId
      }
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
    // Returns radio button cpnfig to stored values
    reset () {
      // this.setData()
    },
    // Posts update requests
    save () {
      apiLib.updateData(this.sysadminWriteUrl, this.updateObj, true, true).then(() => {
        apiLib.getData(this.sysadminReadUrl)
      })
      this.newDefaultValue = false
    }
  },
  mounted () {
    this.setData()
  },
  beforeRouteLeave (to, from, next) {
    if (this.newDefaultValue && !window.confirm('Do you really want to leave? You will lose all unsaved changes!')) {
      return next(false)
    }
    next()
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
