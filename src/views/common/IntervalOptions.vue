<template>
  <v-container class="mx-4" grid-list-md text-xs-center>
    <v-layout row align-center fill-height>
      <BaseViewHeader
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
      />
        <v-spacer></v-spacer>
        <selectComponent
          v-if="user.find(level => level === 'SYSTEM ADMINISTRATOR')"
          slot="search"
          :users="users"
          :selectAll="selectAll"
          :searchName="searchName"
          :multiple="multiple"
          @get-selected-user="getSelectedUser"
        ></selectComponent>
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
            @radio-option-changed="setNewValue"
            :radioConfig="intervals[0].blueLightFlashingInterval"
            :defaultValue="0"
            :groupHeader="drinkGroupHeader"
            :groupDescription="drinkRadioDescription"
            :radioHeader="drinkRadioHeader"
            :height="height"
            suffix=" mins"
          />
        </v-flex>
        <v-flex xs12 lg6>
          <BaseRadioOptions
            @radio-option-changed="setNewValue"
            :radioConfig="intervals[0].spokenReminder"
            :groupHeader="voiceGroupHeader"
            :defaultValue="0"
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
          @radio-option-changed="setNewValue"
          :radioConfig="intervals[0].wakeUpInterval"
          :defaultValue="0"
          :groupHeader="wakeUpGroupHeader"
          :groupDescription="wakeUpRadioDescription"
          :radioHeader="wakeUpRadioHeader"
          :height="height"
          suffix=" mins"
        />
      </v-flex>
      <v-flex xs12 lg6>
        <BaseRadioOptions
          @radio-option-changed="setNewValue"
          :radioConfig="intervals[0].buServerInterval"
          :defaultValue="0"
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
      userLevel: JSON.parse(localStorage.getItem('auth')).level,
      sysadminReadUrl: 'sysadmin/interval-options',
      sysadminWriteUrl: 'sysadmin/interval-options',
      cliadminReadUrl: 'cliadmin/intervalsettings/81/80/2',
      cliadminWriteUrl: 'intervalupdate',
      newDefaultValue: false,
      editedItems: [],
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
  methods: {
    getSelectedUser (user) {
      apiLib.getData(this.cliadminReadUrl, true).then(response => {
        this.intervals = response
      })
    },
    getValues () {
      if (this.userLevel.find(level => level === 'CLIENT ADMINISTRATOR')) {
        apiLib.getData(this.cliadminReadUrl, true).then((response) => response)
        apiLib.getData('cliadmin/users', true).then(response => {
          this.users = response
        })
      }
      if (this.userLevel.find(level => level === 'SYSTEM ADMINISTRATOR')) {
        let arr = apiLib.getData(this.sysadminReadUrl).then((response) => {
          console.log(response)
          return response
        })
        return arr
      }
    },
    // Sets the default radio button value following getValues
    async setValues (key) {
      for (let i = 0; i < this.intervals.length; i++) {
        const element = this.intervals[i]['key']
        for (const item in element) {
          if (element.hasOwnProperty(item)) {
            console.log(item)
          }
        }
      }
    },
    // Sets the new value of the radio group and appends to editedItems
    setNewValue (obj) {
      if (obj.defaultValue === obj.newValue) {
        this.newDefaultValue = false
      } else {
        this.newDefaultValue = true
      }
      for (var i = 0; i < this.intervalIds.length; i++) {
        if (obj.items[obj.index].hasOwnProperty(this.intervalIds[i])) {
          let type = ''
          let id = obj.items[obj.index][this.intervalIds[i]]

          switch (this.intervalIds[i]) {
            case 'blueLightFlashingIntervalId':
              type = 'bluelight'
              break
            case 'wakeUpIntervalId':
              type = 'wakeup'
              break
            case 'spokenReminderId':
              type = 'voice'
              break
            case 'buServerIntervalId':
              type = 'communication'
              break
            default:
              type = 'error'
          }
          for (var j = 0; j < this.editedItems.length; j++) {
            if (this.editedItems[j].type === type) this.editedItems.splice(j - 1, 1)
          }
          this.editedItems.push({ id: id, type: type })
        }
      }
    },
    // Posts update requests
    async save () {
      for (var i = 0; i < this.editedItems.length; i++) {
        if (this.userLevel.find(level => level === 'CLIENT ADMINISTRATOR')) {
          await apiLib.postData(this.cliadminWriteUrl + '/' + this.editedItems[i].id, this.editedItems[i], true)
        } else if (this.userLevel.find(level => level === 'SYSTEM ADMINISTRATOR')) {
          await apiLib.postData(this.sysadminWriteUrl + '/' + this.editedItems[i].id, this.editedItems[i], true)
        }
      }
      await this.getValues()
      this.newDefaultValue = false
      this.editedItems = []
    }
  },
  mounted () {
    this.$store.dispatch('fetchIntervalOptions')
    if (this.userLevel.find(level => level === 'CLIENT ADMINISTRATOR')) {
      this.getValues()
      this.$store.dispatch('fetchIntervalOptions')
    } else if (this.userLevel.find(level => level === 'SYSTEM ADMINISTRATOR')) {
      this.getValues().then((response) => {
        this.intervals = response
      })
      this.$store.dispatch('fetchIntervalOptions')
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
      next()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
