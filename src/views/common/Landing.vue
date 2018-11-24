<template>
  <v-container grid-list-md text-xs-center>
    <v-dialog v-if="redirecting" max-width="87%">
    </v-dialog>
    <h1 class="pg-header">eDroplet Administration</h1>
    <v-layout v-if="this.user == 'SYSTEM ADMINISTRATOR'" row wrap>
      <v-flex xs12 sm10 md6 lg4 offset-lg2 offset-sm1>
        <v-expansion-panel popout :value="openExp">
          <v-expansion-panel-content style="background-color:transparent;">
            <div slot="header">
              <h2 class="landing-subhead" style="background-color:#003c4d;">
                <v-icon x-large color="white">table_chart</v-icon>
                <span>Data Tables</span>
              </h2>
            </div>
            <v-card style="background-color:transparent;">
              <v-card-text>
                <BaseLinkComponent
                  routerTitel= "Titles"
                  link="/titles"
                  tooltipText="Define/Edit Titles to be used for Identification"
                  icon="perm_identity"
                  colorIcon="#003c4d"
                />
                <BaseLinkComponent
                  routerTitel= "Container Types"
                  link="/containertypes"
                  tooltipText="Define/Edit custom container types and their volumes"
                  icon="local_drink"
                  colorIcon="#003c4d"
                />
                <BaseLinkComponent
                  routerTitel= "Gender Options"
                  link="/genderoptions"
                  tooltipText="Define/Edit Genders to be used for Identification"
                  icon="wc"
                  colorIcon="#003c4d"
                />
                <BaseLinkComponent
                  routerTitel= "Conditions Options"
                  link="/conditionsoptions"
                  tooltipText="Define/Edit Conditions to be cross-referenced to eDroplet Users"
                  icon="local_pharmacy"
                  colorIcon="#003c4d"
                />
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex xs12 sm10 md6 lg4 offset-sm1 offset-md0>
        <v-expansion-panel popout :value="openExp">
          <v-expansion-panel-content style="background-color:transparent;">
            <div slot="header">
              <h2 class="landing-subhead" style="background-color:#006480;">
                <v-icon x-large color="white">notifications_active</v-icon>
                Message options
              </h2>
            </div>
            <v-card style="background-color:transparent;">
              <v-card-text>
                <BaseLinkComponent
                  routerTitel= "Text/Email Messages"
                  link="/textmessages"
                  tooltipText="Set the Alert Text and Email Message templates"
                  icon="message"
                  colorIcon="#006480"
                />
                <BaseLinkComponent
                  routerTitel= "Voice Message Defaults"
                  link="/voicemessages"
                  tooltipText="Upload and set the default voice messages for new eDroplets"
                  icon="record_voice_over"
                  colorIcon="#006480"
                />
                <BaseLinkComponent
                  routerTitel= "Hydration Parameters"
                  link="/hydrationparameters"
                  tooltipText="Define the Hydration status boundaries"
                  icon="local_drink"
                  colorIcon="#006480"
                />
                <BaseLinkComponent
                  routerTitel= "Interval Options"
                  link="/intervaloptions"
                  tooltipText="Define and edit Genders to be used for Identification"
                  icon="notification_important"
                  colorIcon="#006480"
                />
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex xs12 sm10 md6 lg4 offset-lg2 offset-sm1>
        <v-expansion-panel popout :value="openExp">
          <v-expansion-panel-content style="background-color:transparent;">
            <div slot="header">
              <h2 class="landing-subhead" style="background-color:#00a1cd;">
                <v-icon x-large color="white">people</v-icon>
                Admin Management
              </h2>
            </div>
            <v-card style="background-color:transparent;">
              <v-card-text>
                <BaseLinkComponent
                  routerTitel= "System Administrators"
                  link="/systemadmins"
                  tooltipText="Add and Manage Authorised System Administrators"
                  icon="person"
                  colorIcon="#00a1cd"
                />
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>

    <div v-if="this.user == 'CLIENT ADMINISTRATOR'" class="landing-cli-admin">
      <h1 class="pg-header">Main Menu</h1>
      <v-layout row wrap>
        <v-flex xs12 sm10 md6 lg4 offset-lg2 offset-sm1>
          <v-expansion-panel popout :value="openExp">
            <v-expansion-panel-content style="background-color:transparent;">
              <div slot="header">
                <h2 class="landing-subhead" style="background-color:#003c4d;">
                  <v-icon x-large color="white">people</v-icon>
                  Authorised Persons
                </h2>
              </div>
              <v-card style="background-color:transparent;">
                <v-card-text>
                  <BaseLinkComponent
                    routerTitel= "Personal Details"
                    link="/personaldetails"
                    tooltipText="Add and manage authorised people on this account"
                    icon="person"
                    colorIcon="#003c4d"
                  />
                  <BaseLinkComponent
                    routerTitel= "Conditions"
                    link="/conditions"
                    tooltipText="Record any conditions and subsequent consumption modifiers for eDroplet Users"
                    icon="priority_high"
                    colorIcon="#003c4d"
                  />
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <v-flex xs12 sm10 md6 lg4 offset-sm1 offset-md0>
          <v-expansion-panel popout :value="openExp">
            <v-expansion-panel-content style="background-color:transparent;">
              <div slot="header">
                <h2 class="landing-subhead" style="background-color:#006480;">
                  <v-icon x-large color="white">local_drink</v-icon>
                  eDroplet Settings
                </h2>
              </div>
              <v-card style="background-color:transparent;">
                <v-card-text>
                  <BaseLinkComponent
                    routerTitel= "Voice Message Management"
                    link="/voicemessages"
                    tooltipText="Upload and set custom voice messages for your eDroplets"
                    icon="record_voice_over"
                    colorIcon="#006480"
                  />
                  <BaseLinkComponent
                    routerTitel= "Interval Settings Management"
                    link="/intervalsettings"
                    tooltipText="Set the reminder and Communication intervals for your eDroplets"
                    icon="notification_important"
                    colorIcon="#006480"
                  />
                  <BaseLinkComponent
                    routerTitel= "eDroplet Management"
                    link="/edropletmanagement"
                    tooltipText="Manage the eDroplets on this account. Assign them to users or deactivate them"
                    icon="local_drink"
                    colorIcon="#006480"
                  />
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <v-flex xs12 sm10 md6 lg4 offset-lg2 offset-sm1>
          <v-expansion-panel popout :value="openExp">
            <v-expansion-panel-content style="background-color:transparent;">
              <div slot="header">
                <h2 class="landing-subhead" style="background-color:#00a1cd;">
                  <v-icon x-large color="white">supervisor_account</v-icon>
                  Carer Settings
                </h2>
              </div>
              <v-card style="background-color:transparent;">
                <v-card-text>
                  <BaseLinkComponent
                    routerTitel= "Personnel Settings"
                    link="/personnelsettings"
                    tooltipText="Set the desired Alert notifications for designated Carers"
                    icon="notifications_active"
                    colorIcon="#00a1cd"
                  />
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import SubLandingNavButton from '@/components/sub/SubLandingNavButton.vue'
import BaseLinkComponent from '@/components/base/BaseLinkComponent.vue'
export default {
  name: 'Landing',
  components: {
    BaseLinkComponent,
    SubLandingNavButton
  },
  data () {
    return {
      openExp: 1,
      user: JSON.parse(localStorage.auth).level,
      redirecting: false
    }
  },
  watch: {

  },
  mounted () {
    console.log(this.$route)
    if (this.$vuetify.breakpoint.name !== 'xs') {
      this.openExp = 0
    }
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";

img {
  height: inherit;
  padding: 5px;
}
</style>
