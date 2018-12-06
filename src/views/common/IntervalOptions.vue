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
            :radioConfig="setValues(lightOptions, 'time', ' minutes')"
            :groupHeader="drinkGroupHeader"
            :groupDescription="drinkRadioDescription"
            :radioHeader="drinkRadioHeader"
            :height="height"
            v-on:value-changed="valueChanged"
          />
        </v-flex>
        <v-flex xs12 lg6>
          <BaseRadioOptions
            :radioConfig="setValues(voiceOptions, 'time', ' minutes')"
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
          :radioConfig="setValues(wakeUpOptions, 'time', ' minutes')"
          :groupHeader="wakeUpGroupHeader"
          :groupDescription="wakeUpRadioDescription"
          :radioHeader="wakeUpRadioHeader"
          :height="height"
        />
      </v-flex>
      <v-flex xs12 lg6>
        <BaseRadioOptions
          :radioConfig="setValues(commsOptions, 'time', ' minutes')"
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
      voiceOptions: [],
      drinkGroupHeader: 'Blue light flashing interval options',
      drinkRadioDescription: 'Time betweeen drink reminders - (Blue light flashing)',
      drinkRadioHeader: 'Please select an option from the following:',
      lightOptions: [],
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
            this.lightOptions.push(arr)
            break
          case '/wakeup':
            this.wakeUpOptions.push(arr)
            break
          case '/voice':
            this.voiceOptions.push(arr)
            break
          case '/communication':
            this.commsOptions.push(arr)
            break
          default:
        }
      }
    },
    setValues (items, key, suffix) {
      let arr = []
      for (var i = 0; i < items.length; i++) {
        for (var item in items[i]) {
          arr.push({ time:items[i][item][key], label:String(items[i][item][key] + suffix), value:items[i][item][key], default:items[i][item]['default'] })
          console.log(arr)
        }
      }
      return arr
    },
    valueChanged(selected) {
      console.log(selected);
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
