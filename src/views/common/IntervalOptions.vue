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
          :radioConfig="drinkIntervalSettings"
          :groupHeader="drinkGroupHeader"
          :groupDescription="drinkRadioDescription"
          :radioHeader="drinkRadioHeader"
          :height="height"
        />
      </v-flex>
      <v-flex xs12 lg6>
        <BaseRadioOptions
          :radioConfig="voiceIntervalSettings"
          :groupHeader="voiceGroupHeader"
          :groupDescription="voiceRadioDescription"
          :radioHeader="voiceRadioHeader"
          :height="height"
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
          :radioConfig="wakeUpIntervalSettings"
          :groupHeader="wakeUpGroupHeader"
          :groupDescription="wakeUpRadioDescription"
          :radioHeader="wakeUpRadioHeader"
          :height="height"
        />
      </v-flex>
      <v-flex xs12 lg6>
        <BaseRadioOptions
          :radioConfig="commsIntervalSettings"
          :groupHeader="commsGroupHeader"
          :groupDescription="commsRadioDescription"
          :radioHeader="commsRadioHeader"
          :height="height"
        />
      </v-flex>
    </v-layout>
    <v-layout row justify-center align-center>
      <SubPageNavButton title="Home" route="/landing" large/>
      <SubPageNavButton title="Save" large/>
    </v-layout>
  </v-container>
</template>

<script>
import BaseRadioOptions from '@/components/base/BaseRadioOptionsSelectComponent.vue'
import SubPageNavButton from '@/components/sub/SubPageNavButton.vue'
import { getData, postData } from '@/mixins/apiRequests'
import { crudOperations } from '@/mixins/CRUD'
export default {
  name: 'IntervalOptions',
  components: {
    BaseRadioOptions,
    SubPageNavButton
  },
  mixins: [crudOperations, getData, postData],
  data () {
    return {
      items: [],
      readUrl: 'intervalget',
      intervalTypes: ['/bluelight', '/wakeup', '/voice', '/communication'],
      drinkIntervalSettings: [
        { label: 'Radio-1', value: '1' },
        { label: 'Radio-2', value: '2' },
        { label: 'Radio-3', value: '3' },
        { label: 'Radio-4', value: '4' }
      ],
      drinkGroupHeader: 'Blue light flashing interval options',
      drinkRadioDescription: 'Time betweeen drink reminders - (Blue light flashing)',
      drinkRadioHeader: 'Please select an option from the following:',
      voiceIntervalSettings: [
        { label: 'Voice-1', value: '1' },
        { label: 'Voice-2', value: '2' },
        { label: 'Voice-3', value: '3' },
        { label: 'Voice-4', value: '4' }
      ],
      voiceGroupHeader: 'Voice interval options',
      voiceRadioDescription: 'Time betweeen drink reminders - (Voice message)',
      voiceRadioHeader: 'Time interval in minutes',
      wakeUpIntervalSettings: [
        { label: 'Comms-1', value: '1' },
        { label: 'Comms-2', value: '2' },
        { label: 'Comms-3', value: '3' },
        { label: 'Comms-4', value: '4' }
      ],
      wakeUpGroupHeader: 'Wake up interval options',
      wakeUpRadioDescription: 'Time betweeen wake up and first communication of the day - (Voice message)',
      wakeUpRadioHeader: 'Time interval in minutes',
      commsIntervalSettings: [
        { label: 'Comms-1', value: '1' },
        { label: 'Comms-2', value: '2' },
        { label: 'Comms-3', value: '3' },
        { label: 'Comms-4', value: '4' },
        { label: 'Comms-5', value: '5' }
      ],
      commsGroupHeader: 'Communication interval options',
      commsRadioDescription: 'Time betweeen edroplet communications - (Voice message)',
      commsRadioHeader: 'Time interval in minutes'
    }
  },
  methods: {
    setValues (items) {
      for (var i = 0; i < items.length; i++) {
        if (this.items[i].blueLightFlashingIntervalId) {
          for (var j = 0; j < this.drinkIntervalSettings.length; j++) {
            console.log(this.items[i].time)
            this.drinkIntervalSettings[j].label = this.items[i].time
          }
        }
      }
      console.log(this.drinkIntervalSettings)
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
  created () {

      switch (this.intervalTypes[i]) {
        case '/bluelight':
        for (var i = 0; i < vals.length; i++) {
          for (var j = 0; j < this.drinkIntervalSettings.length; j++) {
            // console.log('Hi');
            // console.log(this.drinkIntervalSettings[j].value)
            // console.log(this.drinkIntervalSettings[j])
            // this.drinkIntervalSettings[j].value = String(vals[i].time)
          }
          // this.drinkIntervalSettings.assign
        }
          this.items.push(vals)
          break
        case '/wakeup':
          this.items.push(vals)
          break
        case '/voice':
          this.items.push(vals)
          break
        case '/communication':
          this.items.push(vals)
          break
        default:
      }
      // console.log(url);
    },
    // this.items = arr
    // console.log(this.drinkIntervalSettings[0].value)
  // },
  mounted () {
    // let arr = []
    // for (var i = 0; i < this.intervalTypes.length; i++) {
    //   let url = this.readUrl + this.intervalTypes[i]
    //   this.items.push(this.getData(url))
    // }
    // console.log(this.items)
    this.setValues(this.items)
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
