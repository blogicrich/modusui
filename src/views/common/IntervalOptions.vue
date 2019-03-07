<template>
  <v-container grid-list-md text-xs-center>
    <selectComponent
      v-if="userPerms"
      :users="users"
      :selectAll="selectAll"
      :searchName="searchName"
      :multiple="multiple"
    ></selectComponent>
    <h1 class="pg-header">eDroplet Administration</h1>
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
            :radioConfig="lightOptions"
            :defaultValue="setValues(lightOptions)"
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
            :radioConfig="voiceOptions"
            :groupHeader="voiceGroupHeader"
            :defaultValue="setValues(voiceOptions)"
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
          :radioConfig="wakeUpOptions"
          :defaultValue="setValues(wakeUpOptions)"
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
          :radioConfig="commsOptions"
          :defaultValue="setValues(commsOptions)"
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
    <v-snackbar
      v-model="snack"
      bottom
      :timeout="timeout"
      :color="snackColor"
    >
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
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
  // mixins: [getData, postData],
  data () {
    return {
      multiple: false,
      selectAll: 'Select all',
      searchName: 'Search user..',
      users: [
        { name: 'Elsa' },
        { name: 'Tamara' },
        { name: 'Daniek' },
        { name: 'Mitchell' },
        { name: 'Jasper' },
        { name: 'Bram' },
        { name: 'Kevin' },
        { name: 'Julian' },
        { name: 'Patricia' },
        { name: 'Marcel' },
        { name: 'Fred' },
        { name: 'Joke' },
        { name: 'Kaily' },
        { name: 'Michelle' },
        { name: 'Lisa' },
        { name: 'Cheyenne' },
        { name: 'Shalina' },
        { name: 'Naomi' },
        { name: 'Leeroy' }
      ],
      userPerms: false,
      readUrl: 'intervalget',
      writeUrl: 'intervalupdate',
      newDefaultValue: false,
      editedItems: [],
      intervalTypes: ['/bluelight', '/wakeup', '/voice', '/communication'],
      intervalIds: ['blueLightFlashingIntervalId', 'spokenReminderId', 'wakeUpIntervalId', 'buServerIntervalId'],
      snackColor: 'primary',
      snackText: '',
      snack: false,
      timeout: 6000,
      lightOptions: [],
      drinkGroupHeader: 'Blue light flashing interval options',
      drinkRadioDescription: 'Time betweeen drink reminders - (Blue light flashing)',
      drinkRadioHeader: 'Please select an option from the following:',
      voiceOptions: [],
      voiceGroupHeader: 'Voice Interval Options',
      voiceRadioDescription: 'Time betweeen drink reminders - (Voice message)',
      voiceRadioHeader: 'Time interval in minutes',
      wakeUpOptions: [],
      wakeUpGroupHeader: 'Wake-up Interval Options',
      wakeUpRadioDescription: 'Time betweeen wake up and first communication of the day - (Voice message)',
      wakeUpRadioHeader: 'Time interval in minutes',
      commsOptions: [],
      commsGroupHeader: 'Communication Interval Options',
      commsRadioDescription: 'Time betweeen edroplet communications - (Voice message)',
      commsRadioHeader: 'Time interval in minutes'
    }
  },
  methods: {
    async getValues () {
      for (var i = 0; i < this.intervalTypes.length; i++) {
        let url = this.readUrl + this.intervalTypes[i]
        let arr = await apiLib.getData(url)
        switch (this.intervalTypes[i]) {
          case '/bluelight':
            this.lightOptions = arr
            break
          case '/wakeup':
            this.wakeUpOptions = arr
            break
          case '/voice':
            this.voiceOptions = arr
            break
          case '/communication':
            this.commsOptions = arr
            break
          default:
        }
      }
    },
    // Sets the default radio button value following getValues
    setValues (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].default === 'Y') return Number(arr[i].time)
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
        this.snackText = await this.postData(this.writeUrl + '/' + this.editedItems[i].type, { id: this.editedItems[i].id, type: this.editedItems[i].type })
        if (this.snackText === 'Updated Interval Options') {
          this.snackColor = 'success'
          this.snack = true
        } else {
          this.snackColor = 'error'
          this.snack = true
        }
      }
      await this.getValues()
      this.newDefaultValue = false
      this.editedItems = []
    }
  },
  computed: {
    height () {
      var cardHeight = 0
      if (this.$vuetify.breakpoint.smAndUp) cardHeight = '225px'
      if (this.$vuetify.breakpoint.xsOnly) cardHeight = '380px'
      return cardHeight
    }
  },
  mounted () {
    this.getValues()
    if (localStorage.auth.level === 'CLIENT ADMINISTRATOR') this.userPerms = true
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
