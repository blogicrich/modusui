<template lang="html">
  <v-container>
    <v-layout row align-center fill-height>
      <BaseViewHeader
        class="mx-2 mb-4"
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
      />
      <v-spacer></v-spacer>
    </v-layout>
    <!-- <v-divider class="ma-2" color="#00a1cd"></v-divider> -->
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
import subAlertCard from '@/components/sub/subAlertCardComponent'
import apiLib from '@/services/apiLib'

export default {
  components: {
    subAlertCard
  },
  mounted () {
    apiLib.getData('/cliadmin/personnelsettings/21', true, true).then((response) => {
      console.log(response)
    })
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_drink',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Alert Settings Management',
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
