<template>
  <div class="page-container">
    <div class="landing-sys-admin">
      <h1 class="pg-header">eDroplet Administration</h1>
      <v-container v-if="$vuetify.breakpoint.smAndUp" grid-list-xs12>
      <!-- <v-container v-else="$vuetify.breakpoint.smAndDown" grid-list-xs6> -->
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="common-subhead">Administrator Management</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <v-btn
            type="button"
            to="/systemadmins"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Admin Users
          </v-btn>
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="common-subhead">Defaults Administration</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <v-btn
            type="button"
            to="/defaultintervals"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Default Intervals
          </v-btn>
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="common-subhead">Data Tables</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <v-btn
            type="button"
            to="/titles"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Titles
          </v-btn>
          <v-btn
            type="button"
            to="/containertypes"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Container Types
          </v-btn>
          <v-btn
            type="button"
            to="/genderoptions"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Gender Options
          </v-btn>
          <v-btn
            type="button"
            to="/conditions"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Conditions
          </v-btn>
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="common-subhead">Message options</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <v-btn
            type="button"
            to="/textmessages"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Text/Email Messages
          </v-btn>
          <v-btn
            type="button"
            to="/voicemessages"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Voice Message Defaults
          </v-btn>
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="common-subhead">Hydration Parameters</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <v-btn
            type="button"
            to="/hydrationparameters"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Hydration Parameters
          </v-btn>
        </v-container>
      </v-container>
    </div>
    <div class="landing-cli-admin">
      <h1 class="pg-header">Main Menu</h1>
      <v-container grid-list-xs,sm,md,lg,xl>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="common-subhead">Authorised Persons</h2>
          <v-divider class="my-1" color="#00a1cd"></v-divider>
          <v-btn
            type="button"
            to="/personaldetails"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Personal Details
          </v-btn>
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="common-subhead">eDroplet Settings</h2>
          <v-divider color="#00a1cd"></v-divider>
          <v-btn
            type="button"
            to="/voicemessages"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Voice Message Management
          </v-btn>
          <v-btn
            type="button"
            to="/intervalsettings"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Interval Settings Management
          </v-btn>
          <v-btn
            type="button"
            to="/conditions"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Conditions
          </v-btn>
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="common-subhead">eDroplet Management</h2>
          <v-divider color="#00a1cd"></v-divider>
          <v-btn
            type="button"
            to="/edropletmanagement"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            eDroplet Management
          </v-btn>
        </v-container>
        <v-container grid-list-xs,sm,md,lg,xl>
          <h2 class="common-subhead">Carer Settings</h2>
          <v-divider color="#00a1cd"></v-divider>
          <v-btn
            type="button"
            to="/personnelsettings"
            outline
            color="primary"
            class="root-nav-btn"
            block
          >
            Personnel Settings
          </v-btn>
        </v-container>
      </v-container>
    </div>
  </div>
</template>

<script>
import BaseButtonComponent from '@/components/sub/SubMenuBtn.vue'
export default {
  name: 'Landing',
  data () {
    return {

    }
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
