<template>
  <v-app>
    <v-fade-transition>
      <v-toolbar
        v-if="authenticated.state"
        color="white"
        app
        :clipped-left="clipped"
      >
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <img alt="" src="./assets/ed_logo.svg"><img>
        <v-spacer></v-spacer>
        <v-icon outline class="mx-2" color="primary">person_outline</v-icon>
        <span v-if="authenticated.state && $vuetify.breakpoint.smAndUp">Logged in as: {{ user }}</span>
      </v-toolbar>
    </v-fade-transition>
    <v-container fluid>
      <v-content>
        <v-slide-y-transition mode="out-in">
          <router-view class="px-0" @authenticated="setAuthenticated"/>
        </v-slide-y-transition>
      </v-content>
    </v-container>
    <v-fade-transition>
      <v-footer
        v-if="authenticated.state && $vuetify.breakpoint.smAndUp"
        :class="(authenticated.level === 'CARER') ? 'hide' : 'elevation-5 pa-4' "
        :fixed="fixed"
        color="white"
        app
      >
        <v-layout row fill height align-space-between justify-space-between>
          <v-layout class="pt-2" row align-center justify-start>
            <span style="align-center">Version: 0.1.0</span>
          </v-layout>
          <BaseAppNavBtn
            btnIcon="home"
            btnColor="primary"
            route="landing"
          />
          <BaseAppNavBtn
            btnIcon="dashboard"
            btnColor="primary"
            route="landing"
          />
          <BaseAppNavBtn
            btnIcon="chrome_reader_mode"
            btnColor="primary"
            route="landing"
          />
          <BaseAppNavBtn
            btnIcon="settings"
            btnColor="primary"
            route="landing"
          />
          <BaseAppNavBtn
            btnIcon="exit_to_app"
            btnColor="primary"
            route="login"
          />
        </v-layout>
      </v-footer>
    </v-fade-transition>
  </v-app>
</template>

<script>
import BaseAppNavBtn from '@/components/base/BaseAppNavFooterBtn.vue'

export default {
  name: 'App',
  components: {
    BaseAppNavBtn
  },
  data () {
    return {
      authenticated: {
        state: false,
        level: null
      },
      clipped: true,
      drawer: false,
      fixed: false,
      title: '',
      user: 'User'
    }
  },
  methods: {
    setAuthenticated (newStatus) {
      this.authenticated.state = newStatus.state
      this.authenticated.level = newStatus.level
      localStorage.auth = JSON.stringify(this.authenticated)
      this.user = newStatus.level
      // console.log(JSON.parse(localStorage.auth))
      if (newStatus.level === 'SYSTEM ADMINISTRATOR' || newStatus.level === 'CLIENT ADMINISTRATOR' ) {
        this.$router.push('/landing')
      } else if (newStatus.level === 'CARER') {
        this.$router.push('/dashboard')
      }
    },
    logout () {
      this.authenticated = { state: false, level: null }
      localStorage.auth = JSON.stringify(this.authenticated)
      this.user = ''
      this.$router.push('/login')
    },
    home () {
      this.$router.push('/landing')
    }
  },
  watch: {
    authenticated: function () {
      console.log('Auth changed: ', this.authenticated)
    }
  },
  mounted () {
    if (!this.authenticated.state) {
      this.$router.replace('/login')
    }
  }
}
</script>
<style scoped lang="scss">
@import "./public/scss/main.scss";

.app-shell {
  background-color: $vuetify-secondary;
}
.hide {
  visibility: hidden;
}
img {
  height: inherit;
  padding: 5px;
}
</style>
