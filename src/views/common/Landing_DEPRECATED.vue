<template>
  <v-container grid-list-md text-xs-center>
    <v-dialog v-if="redirecting" max-width="87%">
    </v-dialog>
    <h1 class="pg-header">eDroplet Administration</h1>
      <v-layout v-if="this.user == 'SYSTEM ADMINISTRATOR'" row wrap>
        <v-flex xs12 md6>
          <h2 class="pg-subheader text-primary">Administrator Management</h2>
          <v-divider class="mb-2" color="#00a1cd"></v-divider>
          <SubLandingNavButton
            title="System Administrators"
            route="/systemadmins"
          />
        </v-flex>
        <v-flex xs12 md6>
          <h2 class="pg-subheader text-primary text-primary">Defaults Administration</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <SubLandingNavButton
            title="Interval Options"
            route="/intervaloptions"
          />
        </v-flex>
        <v-flex xs12 md6>
          <h2 class="pg-subheader text-primary text-primary">Data Tables</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <SubLandingNavButton
            title="Titles"
            route="/titles"
          />
          <SubLandingNavButton
            title="Container Types"
            route="/containertypes"
          />
          <SubLandingNavButton
            title="Gender Options"
            route="/genderoptions"
          />
          <SubLandingNavButton
            title="Conditions Options"
            route="/conditionsoptions"
          />
        </v-flex>
        <v-flex xs12 md6>
          <h2 class="pg-subheader text-primary text-primary">Message options</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <SubLandingNavButton
            title="Text/Email Messages"
            route="/textmessages"
          />
          <SubLandingNavButton
            title="Voice Message Defaults"
            route="/voicemessages"
          />
        </v-flex>
        <v-flex xs12 md6>
          <h2 class="pg-subheader text-primary text-primary">Hydration Parameters</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <SubLandingNavButton
            title="Hydration Parameters"
            route="/hydrationparameters"
          />
        </v-flex>
    </v-layout>
    <div v-if="this.user == 'CLIENT ADMINISTRATOR'" class="landing-cli-admin">
      <h1 class="pg-header">Main Menu</h1>
        <v-layout row wrap>
        <v-flex xs12 md6>
          <h2 class="pg-subheader text-primary text-primary">Authorised Persons</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <SubLandingNavButton
            title="Personal Details"
            route="/personaldetails"
          />
        </v-flex>
        <v-flex xs12 md6>
          <h2 class="pg-subheader text-primary text-primary">eDroplet Settings</h2>
          <v-divider color="#00a1cd"></v-divider>
          <SubLandingNavButton
            title="Voice Message Management"
            route="/voicemessages"
          />
          <SubLandingNavButton
            title=" Interval Settings Management"
            route="/intervalsettings"
          />
          <SubLandingNavButton
            title="Conditions"
            route="/conditions"
          />
        </v-flex>
        <v-flex xs12 md6>
          <h2 class="pg-subheader text-primary text-primary">eDroplet Management</h2>
          <v-divider color="#00a1cd"></v-divider>
          <SubLandingNavButton
            title="eDroplet Management"
            route="/edropletmanagement"
          />
        </v-flex>
        <v-flex xs12 md6>
          <h2 class="pg-subheader text-primary text-primary text-center">Carer Settings</h2>
          <v-divider color="#00a1cd"></v-divider>
          <SubLandingNavButton
            title="Personnel Settings"
            route="/personnelsettings"
          />
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import SubLandingNavButton from '@/components/sub/SubLandingNavButton.vue'
export default {
  name: 'Landing',
  components: {
    SubLandingNavButton
  },
  data () {
    return {
      user: JSON.parse(localStorage.auth).level,
      redirecting: false
    }
  },
  watch: {

  },
  mounted () {
    console.log(this.$route)
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
