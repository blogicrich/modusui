<template lang="html">
<v-container>
  <v-layout row align-center fill-height>
    <v-icon v-if="apiData.length > 0" large color="primary">settings</v-icon>
    <h1 v-if="apiData.length > 0" class="pg-header">eDroplet Administration</h1>
    <v-spacer></v-spacer>
    <selectComponent
      v-if="userPerms"
      :users="users"
      :selectAll="selectAll"
      :searchName="searchName"
      :multiple="multiple"
      @get-selected-user="getSelectedUser"
    ></selectComponent>
  </v-layout>
  <v-layout column>
    <baseSelect
      :users="users"
      :selectAll="selectAll"
      :searchName="searchName"
      @get-selected-user="getSelectedUser"
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
<v-container>
</template>

<script>
import subAlertCard from '@/components/sub/subIntervalSettingsComponent.vue'
import baseSelect from '@/components/base/BaseUserSelectComponent.vue'
import apiLib from '@/services/apiLib.js'

export default {
  components: {
    subAlertCard,
    baseSelect
  },
  data () {
    return {
      multiple: false,
      user: '',
      data: [],
      selectAll: 'Select all',
      searchName: 'Search user..',
      intervalOptions: 'eDroplet Reminder Interval Options',
      advancedOptions: 'Advanced Options (Power saving)',
      users: [
        { userId: '21', name: 'TEST ID 001' },
        { userId: '22', name: 'Tamara' },
        { userId: '23', name: 'Daniek' },
        { userId: '24', name: 'Mitchell' },
        { userId: '25', name: 'Jasper' },
        { userId: '26', name: 'Bram' },
        { userId: '27', name: 'Kevin' },
        { userId: '28', name: 'Julian' },
        { userId: '29', name: 'Patricia' }
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
      console.log('collapse')
    },
    getSelectedUser (user) {
      let vals = apiLib.getData('cliadmin/')
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
