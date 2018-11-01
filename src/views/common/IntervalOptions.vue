<template>
  <v-container grid-list-md text-xs-center>
    <h1 class="pg-header">eDroplet Administration</h1>
    <h2 class="pg-subheader">eDroplet Reminder Interval Options</h2>
    <v-divider
      class="mx-2"
      color="#00a1cd"
      >
    </v-divider>
    <v-layout row wrap fill-height align-space-between>
      <v-flex xs12 md6>
        <BaseRadioOptions
          :radioConfig="drinkIntervalSettings"
          :groupHeader="drinkGroupHeader"
          :groupDescription="drinkRadioDescription"
          :radioHeader="drinkRadioHeader"
        />
      </v-flex>
      <v-flex xs12 md6>
        <BaseRadioOptions
          :radioConfig="voiceIntervalSettings"
          :groupHeader="voiceGroupHeader"
          :groupDescription="voiceRadioDescription"
          :radioHeader="voiceRadioHeader"
        />
      </v-flex>
    </v-layout>
      <h2 class="pg-subheader">eDroplet Comms Interval Options</h2>
      <v-divider
        class="mx-2"
        color="#00a1cd"
        >
      </v-divider>
    <v-layout row wrap fill-height align-space-between justify-space-between>
      <v-flex xs12 md6>
        <BaseRadioOptions
          :radioConfig="wakeUpIntervalSettings"
          :groupHeader="wakeUpGroupHeader"
          :groupDescription="wakeUpRadioDescription"
          :radioHeader="wakeUpRadioHeader"
        />
      </v-flex>
      <v-flex xs12 md6>
        <BaseRadioOptions
          :radioConfig="commsIntervalSettings"
          :groupHeader="commsGroupHeader"
          :groupDescription="commsRadioDescription"
          :radioHeader="commsRadioHeader"
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
export default {
  name: 'IntervalOptions',
  components: {
    BaseRadioOptions,
    SubPageNavButton
  },
  data () {
    return {
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
        { label: 'Comms-4', value: '4' }
      ],
      commsGroupHeader: 'Communication interval options',
      commsRadioDescription: 'Time betweeen edroplet communications - (Voice message)',
      commsRadioHeader: 'Time interval in minutes'
    }
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
