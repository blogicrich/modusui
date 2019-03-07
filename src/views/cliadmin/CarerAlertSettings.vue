<template lang="html">
  <v-container>
    <subAlertCard
      :carerName="carerName"
      :users="users"
      :personnelsettings="personnelsettings"
      :textCheckboxes="textCheckboxes"
      :selectLabel="selectLabel"
    ></subAlertCard>
  </v-container>
</template>

<script>
import subAlertCard from '@/components/sub/subAlertCardComponent.vue'

export default {
  components: {
    subAlertCard
  },
  data () {
    return {
      carerName: 'Carer1',
      selectLabel: 'Alert Messages',
      personnelsettings: [
        'Dehydrated',
        'Still Dehydrated',
        'Rehydrated',
        'Over Hydrated',
        'Still Over Hydrated',
        'No drink',
        'User has Drunk',
        'Low Battery',
        'Base Offline',
        'Base is now Communicating'
      ],
      textCheckboxes: 'Communication Method (Please Check Applicable)',
      users: [
        {
          carerId: '1',
          givenName: 'Piet',
          familyName: 'Puk',
          alertTypeMessage: ['Low Battery'],
          communicationDescription: 'sms'
        },
        {
          carerId: '2',
          givenName: 'Kabouter',
          familyName: 'Plop',
          alertTypeMessage: ['Dehydrated', 'No drink'],
          communicationDescription: 'email'
        },
        {
          carerId: '3',
          givenName: 'Snow',
          familyName: 'White',
          alertTypeMessage: ['Base is now Communicating', 'Base Offline'],
          communicationDescription: 'sms'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
</style>
