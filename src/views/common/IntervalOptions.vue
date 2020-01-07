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
        <!-- <selectComponent
          v-if="user.find(level => level === 'CLIENT ADMINISTRATOR')"
          slot="search"
          :users="users"
          :selectAll="selectAll"
          :searchName="searchName"
          :multiple="multiple"
          @get-selected-user="getSelectedUser"
        ></selectComponent> -->
    </v-layout>
    <v-container v-if="intervals.length > 0">
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
            :radioConfig="intervals[0].blueLightFlashingInterval"
            :defaultValue="intervals[0].blueLightFlashingInterval.find(val => val.default === true).time"
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
            :radioConfig="intervals[0].spokenReminder"
            :groupHeader="voiceGroupHeader"
            :defaultValue="intervals[0].spokenReminder.find(val => val.default === true).time"
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
          :radioConfig="intervals[0].wakeUpInterval"
          :defaultValue="intervals[0].wakeUpInterval.find(val => val.default === true).time"
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
          :radioConfig="intervals[0].buServerInterval"
          :defaultValue="intervals[0].buServerInterval.find(val => val.default === true).time"
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
  name: 'IntervalOptions',
  components: {
    BaseRadioOptions,
    SubPageNavButton,
    selectComponent
  },
  computed: {
    user: function () {
      return this.$store.getters.level
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
      headerText: 'Interval Options',
      // BaseUserSelect
      intervals: [],
      multiple: false,
      selectAll: 'Select all',
      searchName: 'Search user..',
      users: [],
      // user: JSON.parse(localStorage.getItem('auth')).level,
      sysadminReadUrl: 'sysadmin/interval-options',
      sysadminWriteUrl: 'sysadmin/interval-options',
      cliadminReadUrl: 'cliadmin/intervalsettings/',
      cliadminWriteUrl: 'intervalupdate',
      newDefaultValue: false,
      editedItems: [],
      updateObj: {},
      // intervalTypes: ['/bluelight', '/wakeup', '/voice', '/communication'],
      intervalIds: ['blueLightFlashingIntervalId', 'spokenReminderId', 'wakeUpIntervalId', 'buServerIntervalId'],
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
    getSelectedUser (user) {
      apiLib.getData(this.cliadminReadUrl, true).then(response => {
        this.intervals = response
      })
    },
    getValues () {
      if (this.user.find(level => level === 'CLIENT ADMINISTRATOR')) {
        apiLib.getData(this.cliadminReadUrl, true).then((response) => response)
        apiLib.getData('cliadmin/users', true).then(response => {
          this.users = response
        })
      }
      if (this.user.find(level => level === 'SYSTEM ADMINISTRATOR')) {
        let arr = apiLib.getData(this.sysadminReadUrl).then((response) => {
          console.log(response)
          return response
        })
        return arr
      }
    },
    // Sets the new value of the API update object
    setUpdateObject () {
      this.updateObj = {
        blueLightFlashingIntervalId: this.intervals[0].blueLightFlashingInterval.find(e => e.default === true).blueLightFlashingIntervalId,
        buServerIntervalId: this.intervals[0].buServerInterval.find(e => e.default === true).buServerIntervalId,
        spokenReminderId: this.intervals[0].spokenReminder.find(e => e.default === true).spokenReminderId,
        wakeUpIntervalId: this.intervals[0].wakeUpInterval.find(e => e.default === true).wakeUpIntervalId
      }
    },
    // Sets the new value of the radio group and appends to editedItems
    setNewUpdateObject (obj) {
      const key = Object.keys(obj.items[obj.index])[0]
      console.log('set value - obj: ', obj)
      if (obj.defaultValue === obj.newValue) {
        this.newDefaultValue = false
      } else {
        this.newDefaultValue = true
      }
      this.updateObj[key] = obj.items[obj.index][key]
      // console.log(obj.items[obj.index])
      // console.log(Object.keys(obj.items[obj.index])[0])
      // console.log(this.updateObj)
    },
    // Posts update requests
    async save () {
      // if (this.user.find(level => level === 'CLIENT ADMINISTRATOR')) {
      //   await apiLib.updateData(this.cliadminWriteUrl + '/' + this.editedItems[i].id, this.editedItems[i], true, true)
      // }
      if (this.user.find(level => level === 'SYSTEM ADMINISTRATOR')) {
        await apiLib.updateData(this.sysadminWriteUrl, this.updateObj, true, true)
        this.getValues()
        this.newDefaultValue = false
      }
    }
  },
  mounted () {
    if (this.user.find(level => level === 'CLIENT ADMINISTRATOR')) {
      this.getValues()
    } else if (this.user.find(level => level === 'SYSTEM ADMINISTRATOR')) {
      this.getValues().then((response) => {
        this.intervals = response
        this.setUpdateObject()
        console.log('intervals: ', this.intervals, this.updateObj)
      })
    }
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
      this.$store.dispatch('fetchIntervalOptions')
      next()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
