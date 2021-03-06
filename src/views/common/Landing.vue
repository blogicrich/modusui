<template>
  <v-container fluid>
    <BaseViewHeader
      class="mb-2"
      :headerIcon="headerIcon"
      :iconColor="iconColor"
      :headerText="headerText"
      fullWidth
    />
    <v-layout
      class="mx-4"
      v-if="user.find(level => level === 'SYSTEM ADMINISTRATOR')"
      row
      wrap
      align-start
      justify-start
    >
      <v-flex sm6 lg4>
        <v-layout class="ma-2 menu-header-container" row wrap align-start justify-center>
          <v-icon
            class="ma-1"
            medium
            color="white"
          >
            table_chart
          </v-icon>
          <h2 class="ma-1 secondary--text">Data Tables</h2>
        </v-layout>
        <BaseLinkComponent
          routerTitle="Titles"
          link="/titles"
          tooltipText="Define/Edit Titles to be used for Identification"
          icon="perm_identity"
          colorIcon="#006480"
        />
        <BaseLinkComponent
          routerTitle="Container Types"
          link="/containertypes"
          tooltipText="Define/Edit custom container types and their volumes"
          icon="local_drink"
          colorIcon="#006480"
        />
        <BaseLinkComponent
          routerTitle="Gender Options"
          link="/genderoptions"
          tooltipText="Define/Edit Genders to be used for Identification"
          icon="wc"
          colorIcon="#006480"
        />
        <BaseLinkComponent
          routerTitle="Conditions Options"
          link="/conditionsoptions"
          tooltipText="Define/Edit Conditions to be cross-referenced to eDroplet Users"
          icon="local_pharmacy"
          colorIcon="#006480"
        />
      </v-flex>
      <v-flex sm6 lg4>
        <v-layout class="ma-2 menu-header-container" row wrap align-center justify-center>
          <v-icon
            class="ma-1"
            medium
            color="white"
          >
            notifications_active
          </v-icon>
          <h2 class="ma-1 secondary--text">Message Options</h2>
        </v-layout>
        <BaseLinkComponent
          routerTitle="Text/Email Messages"
          link="/textmessages"
          tooltipText="Set the Alert Text and Email Message templates"
          icon="message"
          colorIcon="#006480"
        />
        <BaseLinkComponent
          routerTitle="Hydration Parameters"
          link="/hydrationparameters"
          tooltipText="Define the Hydration status boundaries"
          icon="local_drink"
          colorIcon="#006480"
        />
        <BaseLinkComponent
          routerTitle="Interval Options"
          link="/intervaloptions"
          tooltipText="Define and edit Genders to be used for Identification"
          icon="notification_important"
          colorIcon="#006480"
        />
      </v-flex>
      <v-flex sm6 lg4>
        <v-layout class="ma-2 menu-header-container" row wrap align-center justify-center>
          <v-icon
            class="ma-1"
            medium
            color="white"
          >
            people
          </v-icon>
          <h2 class="ma-1 secondary--text">Admin Management</h2>
        </v-layout>
        <BaseLinkComponent
          routerTitle="System Administrators"
          link="/systemadmins"
          tooltipText="Add and Manage Authorised System Administrators"
          icon="person"
          colorIcon="#006480"
        />
      </v-flex>
    </v-layout>
    <v-layout v-if="user.find(level => level === 'CLIENT ADMINISTRATOR')" row wrap align-start justify-start class="landing-cli-admin">
      <v-flex sm6 lg4>
        <v-layout class="ma-2 menu-header-container" row wrap align-center justify-center>
          <v-icon
            class="ma-1"
            medium
            color="white"
          >
            people
          </v-icon>
          <h2 class="ma-1 secondary--text">Authorised Persons</h2>
        </v-layout>
        <BaseLinkComponent
          routerTitle="Personal Details"
          link="/personaldetails"
          tooltipText="Add and manage authorised people on this account"
          icon="person"
          colorIcon="#006480"
        />
        <BaseLinkComponent
          routerTitle="Carer Settings"
          link="/carersettings"
          tooltipText="Change settings and user assignment for carers"
          icon="people"
          colorIcon="#006480"
        />
      </v-flex>
      <v-flex sm6 lg4>
        <v-layout class="ma-2 menu-header-container" row wrap align-center justify-center>
          <v-icon
            class="ma-1"
            medium
            color="white"
          >
            local_drink
          </v-icon>
          <h2 class="ma-1 secondary--text">User Settings</h2>
        </v-layout>
        <BaseLinkComponent
          routerTitle="User Conditions"
          link="/usercondition"
          tooltipText="Record user conditions and consumption modifiers"
          icon="local_pharmacy"
          colorIcon="#006480"
        />
        <BaseLinkComponent
          routerTitle="User Settings Management"
          link="/usersettings"
          tooltipText="Set communication intervals, wake and sleep time settings"
          icon="access_alarm"
          colorIcon="#006480"
        />
      </v-flex>
      <v-flex sm6 lg4>
        <v-layout class="ma-2 menu-header-container" row wrap align-center justify-center>
          <v-icon
            class="ma-1"
            medium
            color="white"
          >
            supervisor_account
          </v-icon>
          <h2 class="ma-1 secondary--text">eDroplet Management</h2>
        </v-layout>
        <BaseLinkComponent
          routerTitle="eDroplet Management"
          link="/edropletmanagement"
          tooltipText="Manage the eDroplets on this account"
          icon="local_drink"
          colorIcon="#006480"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import BaseLinkComponent from '@/components/base/BaseLinkComponent.vue'
import BaseViewHeader from '@/components/base/BaseViewHeaderComponent.vue'

export default {
  name: 'Landing',
  components: {
    BaseLinkComponent,
    BaseViewHeader
  },
  data () {
    return {
      headerIcon: 'settings',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'eDroplet System Administration'
    }
  },
  computed: {
    user: function () {
      return this.$store.getters.level
    }
  }
}

</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
  .menu-header-container {
    background-color:var(--v-accent-base);
    border-radius:10px;
  }
</style>
