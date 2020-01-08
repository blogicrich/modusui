<template lang="html">
<v-container>
    <v-layout row fill-height align-center justify-end wrap>
      <BaseViewHeader
        class="mx-4 mb-4"
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
      />
      <v-spacer></v-spacer>
      <!-- <selectComponent
        slot="search"
        v-if="userPerms"
        :users="users"
        :selectAll="selectAll"
        :searchName="searchName"
        :multiple="multiple"
        @get-selected-user="getSelectedUser"
      ></selectComponent> -->
  </v-layout>
  <v-layout column>
    <!-- <baseSelect
      :users="users"
      :selectAll="selectAll"
      :searchName="searchName"
      @get-selected-user="getSelectedUser"
    ></baseSelect> -->
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
      <v-icon slot="btnSlot" large>expand_more</v-icon>
    </subAlertCard>
  </v-layout>
</v-container>
</template>

<script>
import subAlertCard from '@/components/sub/subIntervalSettingsComponent.vue'
import baseSelect from '@/components/base/BaseUserSelectComponent.vue'

export default {
  name: 'IntervalManagement',
  components: {
    subAlertCard,
    baseSelect
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'notification_important',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Interval Settings Management',
      // User Select
      multiple: false,
      user: '',
      selectAll: 'Select all',
      searchName: 'Search user..',
      // Interval Select
      intervalOptions: 'eDroplet Reminder Interval Options',
      advancedOptions: 'Advanced Options (Power saving)',
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
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm(
      'Do you really want to leave? You will loose all unsaved changes!'
    )
    if (answer) {
      next()
    } else {
      next(false)
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
