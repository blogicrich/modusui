<template lang="html">
  <v-layout column>
    <baseSelect
      :users="users"
      :selectAll="selectAll"
      :searchName="searchName"
      :multiple="multiple"
    ></baseSelect>
    <subAlertCard
      :dataBox="dataBox1"
      :radioText="radioText"
      :radios="radios"
      :data="data"
      :headerText="intervalOptions"
    ></subAlertCard>
    <subAlertCard
      :dataBox="dataBox2"
      :radioText="radioText"
      :radios="radios"
      :data="data"
      :headerText="advancedOptions"
    >
      <v-icon slot="btnSlot" large @click="iconClicked">expand_more</v-icon>
    </subAlertCard>
  </v-layout>
</template>

<script>
import subAlertCard from '@/components/sub/subIntervalSettingsComponent.vue'
import baseSelect from '@/components/base/BaseUserSelectComponent.vue'

export default {
  components: {
    subAlertCard,
    baseSelect
  },
  data () {
    return {
      multiple: false,
      selectAll: 'Select all',
      searchName: 'Search user..',
      intervalOptions: 'eDroplet Reminder Interval Options',
      advancedOptions: 'Advanced Options (Power saving)',
      users: [
        { userId: '1', name: 'Elsa' },
        { userId: '2', name: 'Tamara' },
        { userId: '3', name: 'Daniek' },
        { userId: '4', name: 'Mitchell' },
        { userId: '5', name: 'Jasper' },
        { userId: '6', name: 'Bram' },
        { userId: '7', name: 'Kevin' },
        { userId: '8', name: 'Julian' },
        { userId: '9', name: 'Patricia' }
      ],
      data: [
        { blueLight: '20', voiceInter: '40', wakeUp: 'never', commInter: '20' }
      ],
      radios: ['20', '40', '60', 'never'],
      radioText: 'Time interval in Minutes:',
      dataBox1: [
        { settingText: 'Blue Light flashing interval', cardText: 'Time between Drink reminder. (Blue light flasing)' },
        { settingText: 'Voice interval options', cardText: 'Time between Drink reminders. (Voice message)' }
      ],
      dataBox2: [
        { settingText: 'Wake Up interval', cardText: 'Time between Wake up and first eDroplet/portal Communications of the day.' },
        { settingText: 'Communication interval', cardText: 'Time interval between eDroplet/portal communications.' }
      ]
    }
  },
  methods: {
    iconClicked () {
      console.log('eafeafaf');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
.cardBorder {
  border: 3px solid $vuetify-primary;
}
</style>
