<template>
  <v-app>
    <v-toolbar
      v-if="authenticated.state"
      color="white"
      app
      :clipped-left="clipped"
    >
      <img alt="" src="./assets/ed_logo.svg"><img>
      <v-spacer></v-spacer>
      <v-icon outline class="mx-2" color="primary">person_outline</v-icon>
      <span v-if="authenticated.state && $vuetify.breakpoint.smAndUp">Logged in as: {{ user }}</span>
    </v-toolbar>
    <v-fade-transition>
      <v-navigation-drawer
        v-if="(authenticated.level === 'CARER' || authenticated.level === 'CLIENT ADMINISTRATOR / CARER') && authenticated.state && $vuetify.breakpoint.lgAndUp"
        class="primary"
        mini-variant
        mini-variant-width="94"
        disable-route-watcher
        app
        clipped
        flat
      >
        <v-layout column fill-height align-center justify-space-between>
          <BaseAppNavBtn
            v-if="authenticated.level !== 'CARER'"
            my-3
            right
            btnIcon="settings"
            btnColor="white"
            iconColor="white"
            route="landing"
            tip="Administration"
          />
          <BaseAppNavBtn
            my-3
            right
            v-for="item in items"
            :key="item.title"
            :btnIcon="item.btnIcon"
            :btnColor="item.btnColor"
            :iconColor="item.iconColor"
            :route="item.route"
            :tip="item.tip"
          />
        </v-layout>
      </v-navigation-drawer>
      <v-navigation-drawer
        v-if="(authenticated.level === 'CARER' || authenticated.level === 'CLIENT ADMINISTRATOR / CARER') && authenticated.state && $vuetify.breakpoint.smAndUp"
        class="primary"
        disable-route-watcher
        mini-variant
        mini-variant-width="160"
        app
        clipped
        flat
      >
        <v-layout v-if="authenticated.level && $vuetify.breakpoint.mdAndDown" column fill-height align-start justify-start>
          <BaseAppNavBtn
            v-if="authenticated.level !== 'CARER'"
            my-3
            right
            btnIcon="settings"
            btnColor="white"
            iconColor="white"
            route="landing"
            tip="Administration"
          />
          <BaseAppNavBtn
            my-3
            right
            v-for="item in items"
            :key="item.title"
            :btnIcon="item.btnIcon"
            :btnColor="item.btnColor"
            :iconColor="item.iconColor"
            :route="item.route"
            :tip="item.tip"
            :title="item.title"
          />
        </v-layout>
      </v-navigation-drawer>
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
        v-if="(authenticated.level === 'SYSTEM ADMINISTRATOR' || authenticated.level === 'CLIENT ADMINISTRATOR') && authenticated.state && $vuetify.breakpoint.smAndUp"
        :class="(authenticated.level === 'CARER') ? 'hide' : 'elevation-5 pa-4' "
        :fixed="fixed"
        color="white"
        app
      >
        <v-layout row fill height align-space-between justify-space-between>
          <v-layout class="pt-2" row align-center justify-start>
            <span style="align-center">Version: ALPHA</span>
          </v-layout>
          <BaseAppNavBtn
            btnIcon="home"
            btnColor="primary"
            route="landing"
            tip="Home"
            top
          />
          <BaseAppNavBtn
            v-if="(authenticated.level === 'CLIENT ADMINISTRATOR / CARER')"
            btnIcon="dashboard"
            btnColor="primary"
            route="dashboard"
            tip="Dashboard"
            top
          />
          <BaseAppNavBtn
            btnIcon="exit_to_app"
            btnColor="primary"
            route="login"
            tip="Logout"
            top
          />
        </v-layout>
      </v-footer>
    </v-fade-transition>
    <BaseAppSnackbar
      :snack="snackState"
      :timeout="snackTimeout"
      :snackColor="snackColor"
      :snackText="snackText"
    />
  </v-app>
</template>

<script>
/* eslint-disable */
import BaseAppNavBtn from '@/components/base/BaseAppNavFooterBtn.vue'
import BaseAppSnackbar from '@/components/base/BaseAppSnackbar.vue'
import { EventBus } from '@/mixins/eventBus.js'
import { setTimeout } from 'timers'


export default {
  name: 'App',
  components: {
    BaseAppNavBtn,
    BaseAppSnackbar
  },
  data () {
    return {
      // Snackbar
      snackState: false,
      snackText: '',
      snackColor: '',
      snackTimeout: 0,
      alerts: 0,
      authenticated: {
        state: false,
        level: null,
        token: ''
      },
      items: [
        {
          title: 'Dashboard',
          btnIcon: 'dashboard',
          btnColor: 'white',
          iconColor: 'white',
          route: 'dashboard',
          tip: 'Go to Dashboard'
        },
        {
          title: 'Alerts',
          btnIcon: 'notification_important',
          btnColor: 'white',
          iconColor: 'white',
          route: 'alerts',
          tip: 'View Alerts'
        },
        {
          title: 'Add Drinks',
          btnIcon: 'local_drink',
          btnColor: 'white',
          iconColor: 'white',
          route: 'additionaldrinks',
          tip: 'Add Drinks'
        },
        {
          title: 'Away',
          btnIcon: 'calendar_today',
          btnColor: 'white',
          iconColor: 'white',
          route: 'away',
          tip: 'Record time away'
        },
        {
          title: 'Reports',
          btnIcon: 'report',
          btnColor: 'white',
          iconColor: 'white',
          route: 'reports',
          tip: 'Reports'
        },
        {
          title: 'Logout',
          btnIcon: 'exit_to_app',
          btnColor: 'white',
          iconColor: 'white',
          route: '',
          tip: 'Exit application'
        }
      ],
      clipped: true,
      fixed: false,
      // title: '',
      user: ''
    }
  },
  methods: {
    setAuthenticated (newStatus) {
      this.authenticated.state = newStatus.state
      this.authenticated.level = newStatus.level
      this.authenticated.token = newStatus.token
      localStorage.auth = JSON.stringify(this.authenticated)
      this.user = newStatus.level
      // console.log(JSON.parse(localStorage.auth))
      if ((newStatus.level === 'SYSTEM ADMINISTRATOR' || newStatus.level === 'CLIENT ADMINISTRATOR' || newStatus.level === 'CLIENT ADMINISTRATOR / CARER') && newStatus.token) {
        this.$router.push('/landing')
      } else if (newStatus.level === 'CARER') {
        this.$router.push('/dashboard')
      }
    },
    showSnack (eventPayload) {
      console.log("FIRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRED!!!!", eventPayload.text, eventPayload.color, eventPayload.state, eventPayload.time)
      this.snackText = eventPayload.text 
      this.snackColor = eventPayload.color
      this.snackTimeout = eventPayload.time
      this.snackState = eventPayload.state
    },
    clickHandler() {
      console.log('SNACKMSG')
    },
    logout () {
      this.authenticated = null
      localStorage.removeItem('auth')
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
  created () {
    if (!this.authenticated.state) {
      this.$router.replace('/login')
    }
    console.log(this.authenticated)
  },
  mounted () {
    EventBus.$on('snack-msg', data => {
      this.showSnack(data)
    })//this.showSnack())
  },
  destroyed () {
    EventBus.$off('snack-msg', this.showSnack())
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
  position:absolute;
  top:2px;
  left: 12px;
  height: inherit;
  padding: 5px;
}
</style>
