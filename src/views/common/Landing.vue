<template>
  <div class="page-container">
    <div class="landing-sys-admin">
      <h1 class="pg-header">eDroplet Administration</h1>
      <v-container v-if="$vuetify.breakpoint.smAndUp" xs12>
      <!-- <v-container v-else="$vuetify.breakpoint.smAndDown" grid-list-xs6> -->
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="pg-subhead">Administrator Management</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <SubNavButton
            title="System Administrators"
            route="/systemadmins"
          />
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="pg-subhead">Defaults Administration</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <SubNavButton
            title="default Intervals"
            route="/defaultintervals"
          />
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="pg-subhead">Data Tables</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <SubNavButton
            title="Titles"
            route="/titles"
          />
          <SubNavButton
            title="Container Types"
            route="/containertypes"
          />
          <SubNavButton
            title="Gender Options"
            route="/genderoptions"
          />
          <SubNavButton
            title="Conditions"
            route="/conditions"
          />
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="pg-subhead">Message options</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <SubNavButton
            title="Text/Email Messages"
            route="/textmessages"
          />
          <SubNavButton
            title="Voice Message Defaults"
            route="/voicemessages"
          />
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="pg-subhead">Hydration Parameters</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <SubNavButton
            title="Hydration Parameters"
            route="/hydrationparameters"
          />
        </v-container>
      </v-container>
    </div>
    <div class="landing-cli-admin">
      <h1 class="pg-header">Main Menu</h1>
      <v-container grid-list-xs,sm,md,lg,xl>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="pg-subhead">Authorised Persons</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <SubNavButton
            title="Personal Details"
            route="/personaldetails"
          />
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="pg-subhead">eDroplet Settings</h2>
          <v-divider color="#00a1cd"></v-divider>
          <SubNavButton
            title="Voice Message Management"
            route="/voicemessages"
          />
          <SubNavButton
            title=" Interval Settings Management"
            route="/intervalsettings"
          />
          <SubNavButton
            title="Conditions"
            route="/conditions"
          />
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="pg-subhead">eDroplet Management</h2>
          <v-divider color="#00a1cd"></v-divider>
          <SubNavButton
            title="eDroplet Management"
            route="/edropletmanagement"
          />
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="pg-subhead">Carer Settings</h2>
          <v-divider color="#00a1cd"></v-divider>
          <SubNavButton
            title="Personnel Settings"
            route="/personnelsettings"
          />
        </v-container>
      </v-container>
    </div>
  </div>
</template>

<script>
import SubNavButton from '@/components/sub/SubNavButton.vue'
export default {
  name: 'Landing',
  components: {
    SubNavButton
  },
  // data () {
  //   return {
  //     type: String,
  //     outline: Boolean,
  //     btnColor: String,
  //     btnClass: String,
  //     block: Boolean,
  //     title: String,
  //     route: String
  //   }
  // }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
