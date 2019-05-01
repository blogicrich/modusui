<template>
  <keep-alive>
  <v-container fluid>
    <v-layout row fill-height align-start justify-center>
    <BaseViewHeader
      class="mb-2"
      :headerIcon="headerIcon"
      :iconColor="iconColor"
      :headerText="headerText"
    />
    </v-layout>
    <v-layout class="mx-4" v-if="user.find(level => level === 'SYSTEM ADMINISTRATOR')" row wrap align-start justify-start>
      <v-flex sm6 lg4>
        <v-layout class="ma-2" row wrap align-start justify-center style="background-color:#003c4d;border-radius:10px;">
          <v-icon
            class="ma-1"
            medium
            color="white"
            >table_chart
          </v-icon>
          <h2 class="ma-1 text-white">Data Tables</h2>
        </v-layout>
        <BaseLinkComponent
          routerTitle= "Titles"
          link="/titles"
          tooltipText="Define/Edit Titles to be used for Identification"
          icon="perm_identity"
          colorIcon="#006480"
        />
        <BaseLinkComponent
          routerTitle= "Container Types"
          link="/containertypes"
          tooltipText="Define/Edit custom container types and their volumes"
          icon="local_drink"
          colorIcon="#006480"
        />
        <BaseLinkComponent
          routerTitle= "Gender Options"
          link="/genderoptions"
          tooltipText="Define/Edit Genders to be used for Identification"
          icon="wc"
          colorIcon="#006480"
        />
        <BaseLinkComponent
          routerTitle= "Conditions Options"
          link="/conditionsoptions"
          tooltipText="Define/Edit Conditions to be cross-referenced to eDroplet Users"
          icon="local_pharmacy"
          colorIcon="#006480"
        />
      </v-flex>
      <v-flex sm6 lg4>
        <v-layout class="ma-2" row wrap align-center justify-center style="background-color:#003c4d;border-radius:10px;">
          <v-icon
            class="ma-1"
            medium
            color="white"
            >notifications_active
          </v-icon>
          <h2 class="ma-1 text-white">Message Options</h2>
        </v-layout>
        <BaseLinkComponent
          routerTitle= "Text/Email Messages"
          link="/textmessages"
          tooltipText="Set the Alert Text and Email Message templates"
          icon="message"
          colorIcon="#006480"
        />
        <BaseLinkComponent
          routerTitle= "Voice Message Defaults"
          link="/voicemessages"
          tooltipText="Upload and set the default voice messages for new eDroplets"
          icon="record_voice_over"
          colorIcon="#006480"
        />
        <BaseLinkComponent
          routerTitle= "Hydration Parameters"
          link="/hydrationparameters"
          tooltipText="Define the Hydration status boundaries"
          icon="local_drink"
          colorIcon="#006480"
        />
        <BaseLinkComponent
          routerTitle= "Interval Options"
          link="/intervaloptions"
          tooltipText="Define and edit Genders to be used for Identification"
          icon="notification_important"
          colorIcon="#006480"
        />
      </v-flex>
      <v-flex sm6 lg4>
        <v-layout class="ma-2" row wrap align-center justify-center style="background-color:#003c4d;border-radius:10px;">
          <v-icon
            class="ma-1"
            medium
            color="white"
            >people
          </v-icon>
          <h2 class="ma-1 text-white">Admin Management</h2>
        </v-layout>
        <BaseLinkComponent
          routerTitle= "System Administrators"
          link="/systemadmins"
          tooltipText="Add and Manage Authorised System Administrators"
          icon="person"
          colorIcon="#006480"
        />
      </v-flex>
    </v-layout>
    <v-layout v-if="user.find(level => level === 'CLIENT ADMINISTRATOR')" row wrap align-start justify-start class="landing-cli-admin">
        <v-flex sm6 lg3>
          <v-layout class="ma-2" row wrap align-center justify-center style="background-color:#003c4d;border-radius:10px;">
            <v-icon
              class="ma-1"
              medium
              color="white"
              >people
            </v-icon>
            <h2 class="ma-1 text-white">Authorised Persons</h2>
          </v-layout>
          <BaseLinkComponent
            routerTitle= "Personal Details"
            link="/personaldetails"
            tooltipText="Add and manage authorised people on this account"
            icon="person"
            colorIcon="#006480"
          />

        </v-flex>
        <v-flex sm6 lg3>
          <v-layout class="ma-2" row wrap align-center justify-center style="background-color:#003c4d;border-radius:10px;">
            <v-icon
              class="ma-1"
              medium
              color="white"
              >local_drink
            </v-icon>
            <h2 class="ma-1 text-white">eDroplet Settings</h2>
          </v-layout>
          <BaseLinkComponent
            routerTitle= "Voice Message Management"
            link="/voicemessages"
            tooltipText="Upload and set custom voice messages for your eDroplets"
            icon="record_voice_over"
            colorIcon="#006480"
          />
          <BaseLinkComponent
            routerTitle= "Interval Settings Management"
            link="/intervaloptions"
            tooltipText="Set the reminder and Communication intervals for your eDroplets"
            icon="notification_important"
            colorIcon="#006480"
          />
          <BaseLinkComponent
            routerTitle= "Conditions"
            link="/conditions"
            tooltipText="Record any conditions and subsequent consumption modifiers for eDroplet Users"
            icon="priority_high"
            colorIcon="#006480"
          />
        </v-flex>
        <v-flex sm6 lg3>
          <v-layout class="ma-2" row wrap align-center justify-center style="background-color:#003c4d;border-radius:10px;">
            <v-icon
              class="ma-1"
              medium
              color="white"
              >supervisor_account
            </v-icon>
            <h2 class="ma-1 text-white">eDroplet Management</h2>
          </v-layout>
          <!-- <BaseLinkComponent
            routerTitle= "Personnel Settings"
            link="/personnelsettings"
            tooltipText="Set the desired Alert notifications for designated Carers"
            icon="notifications_active"
            colorIcon="#006480"
          /> -->
          <BaseLinkComponent
            routerTitle= "eDroplet Management"
            link="/edropletmanagement"
            tooltipText="Manage the eDroplets on this account. Assign them to users or deactivate them"
            icon="local_drink"
            colorIcon="#006480"
          />
        </v-flex>
        <v-flex sm6 lg3>
          <v-layout class="ma-2" row wrap align-center justify-center style="background-color:#003c4d;border-radius:10px;">
            <v-icon
              class="ma-1"
              medium
              color="white"
              >supervisor_account
            </v-icon>
            <h2 class="ma-1 text-white">Carer Settings</h2>
          </v-layout>
          <!-- <BaseLinkComponent
            routerTitle= "Personnel Settings"
            link="/personnelsettings"
            tooltipText="Set the desired Alert notifications for designated Carers"
            icon="notifications_active"
            colorIcon="#006480"
          /> -->
          <BaseLinkComponent
            routerTitle= "Carer / Alert Settings"
            link="/careralertsettings"
            tooltipText="Manage alert settings"
            icon="local_drink"
            colorIcon="#006480"
          />
        </v-flex>
      </v-layout>
    </v-container>
    </keep-alive>
  </template>

<script>

import SubLandingNavButton from '@/components/sub/SubLandingNavButton.vue'
import BaseLinkComponent from '@/components/base/BaseLinkComponent.vue'
import BaseViewHeader from '@/components/base/BaseViewHeaderComponent.vue'

export default {
  name: 'Landing',
  components: {
    BaseLinkComponent,
    SubLandingNavButton,
    BaseViewHeader
  },
  data () {
    return {
      user: '',
      redirecting: false,
      headerIcon: 'settings',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'eDroplet Client Administration'
    }
  },
  created () {
    this.user = JSON.parse(localStorage.auth).level
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
