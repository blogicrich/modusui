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
      <span v-if="authenticated.state">{{ user }}</span>
    </v-toolbar>
    <transition-group name="navBtns">
      <v-navigation-drawer
        v-if="user.find(level => level === 'CARER') && authenticated.state && $vuetify.breakpoint.lgAndUp"
        key="bp-lg"
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
            v-if="user.find(level => level === 'CARER') && user.find(level => level === 'CLIENT ADMINISTRATOR')"
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
        v-if="user.find(level => level === 'CARER') && authenticated.state && $vuetify.breakpoint.mdAndDown"
        key="bp-sm"
        class="primary"
        disable-route-watcher
        mini-variant
        mini-variant-width="160"
        app
        clipped
        flat
      >
        <v-layout column fill-height align-start justify-start>
          <BaseAppNavBtn
            v-if="user.find(level => level === 'CARER') && user.find(level => level === 'CLIENT ADMINISTRATOR')"
            my-3
            right
            btnIcon="settings"
            btnColor="white"
            iconColor="white"
            route="landing"
            tip="Administration"
            title="Administration"
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
    </transition-group>
    <v-container fluid>
      <v-content>
        <v-slide-y-transition mode="out-in">
          <router-view class="px-0" @authenticated="setAuthenticated"/>
        </v-slide-y-transition>
      </v-content>
    </v-container>
    <v-fade-transition>
      <v-footer
        v-if="user.find(level => level !== 'CARER') && authenticated.state"
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
            v-if="user.find(level => level === 'CLIENT ADMINISTRATOR')"
            btnIcon="dashboard"
            btnColor="primary"
            route="dashboard"
            tip="Dashboard"
            top
          />
          <BaseAppNavBtn
            btnIcon="exit_to_app"
            btnColor="primary"
            route="/"
            tip="Logout"
            top
          />
        </v-layout>
      </v-footer>
    </v-fade-transition>
    <v-snackbar
      v-model="snackState"
      :color="snackColor"
      :timeout="snackTimeout"
      bottom
    >
      {{ snackText }}
      <v-btn
        dark
        flat
        @click="snackState = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
/* eslint-disable */
import BaseAppNavBtn from '@/components/base/BaseAppNavFooterBtn.vue'
import { EventBus } from '@/mixins/eventBus.js'
import { setTimeout } from 'timers'
import { log, isArray } from 'util';


export default {
  name: 'App',
  components: {
    BaseAppNavBtn
  },
  data () {
    return {
      // Snackbar
      snackState: false,
      snackText: '',
      snackColor: '',
      snackTimeout: 0,
      authenticated: {},
      appNavConfig: {footer: true, sideMenu: true, header: true},
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
          route: 'login',
          tip: 'Exit application'
        }
      ],
      clipped: true,
      fixed: false,
      user: [],
    }
  },
  methods: {
    setAuthenticated (newStatus) {
      localStorage.auth = JSON.stringify(newStatus)
      this.authenticated = newStatus
      console.log(this.authenticated)
      if (this.authenticated.level) {
        this.user = this.authenticated.level
        if ((this.user[0] === 'SYSTEM ADMINISTRATOR' || this.user[0]  === 'CLIENT ADMINISTRATOR') && newStatus.token) { // REWRITE FOR WHOLE ARRAY
          this.$router.push('/landing')
        } else if (this.user[0] === 'CARER' && newStatus.token) {
          this.$router.push('/dashboard')
        }
      }
    },
    showSnack (eventPayload) {
      this.snackText = eventPayload.text
      this.snackColor = eventPayload.color
      this.snackTimeout = eventPayload.time
      this.snackState = eventPayload.state
    },
    logout () {
      // this.authenticated = null
      localStorage.removeItem('auth')
      // this.user = null
      this.$router.push('/login')
    },
    home () {
      this.$router.push('/landing')
    },
  },
  watch: {
    authenticated: function () {
      console.log('Auth changed: ', this.authenticated)
      if (this.authenticated.state === null) this.logout()
    },
  },
  mounted () {
    if (this.authenticated.state === null || this.authenticated.state === undefined) {
      this.$router.push('/login')
    }
    EventBus.$on('snack-msg', data => {
      this.showSnack(data)
    })
  },
  destroyed () {
    EventBus.$off('snack-msg')
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
