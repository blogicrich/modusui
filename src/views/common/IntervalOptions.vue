<template>
  <v-container grid-list-md text-xs-center>
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
      <SubPageNavButton title="Home" route="/landing" large/>
      <v-btn class="root-nav-btn" @click="save(lightOptions, voiceOptions, wakeUpOptions, commsOptions)" color="primary" large>Save</v-btn>
    </v-layout>
  </v-container>
</template>

<script>

import BaseRadioOptions from '@/components/base/BaseRadioOptionsSelectComponent.vue'
import SubPageNavButton from '@/components/sub/SubPageNavButton.vue'
import { getData, postData } from '@/mixins/apiRequests'

export default {
  name: 'IntervalOptions',
  components: {
    BaseRadioOptions,
    SubPageNavButton
  },
  mixins: [getData, postData],
  data () {
    return {
      readUrl: 'intervalget',
      writeUrl: 'intervalupdate',
      intervalTypes: ['/bluelight', '/wakeup', '/voice', '/communication'],
      intervalIds: ['blueLightFlashingIntervalId', 'spokenReminderId', 'wakeUpIntervalId', 'buServerIntervalId'],

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
        let arr = await this.getData(url)
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
    // Sets the default radio button value
    setValues (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].default === 'Y') return Number(arr[i].time)
      }
    },
    async setNewValue (obj) {
      for (var i = 0; i < this.intervalIds.length; i++) {
        if (obj.items[obj.index].hasOwnProperty(this.intervalIds[i])) {
          let type = ''
          // let url = ''
          let id = obj.items[obj.index][this.intervalIds[i]]
          let interval = obj.items[obj.index].time
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
          }
          await this.postData(this.writeUrl + '/' + type, { id: id, type: type })
          await this.getValues()
          console.log(id)
          console.log(type)
          console.log(this.writeUrl)
        }
      }
    },
    // save (...intervalObjs) {
    //   for (var ints of intervalObjs) {
    //     for (var i = 0; i < ints.length; i++) {
    //       if (ints[i].default === 'Y') {
    //         console.log(ints[i])
    //       }
    //     }
    //   }
    // }
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
  },
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm('Do you really want to leave? You will loose all unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
