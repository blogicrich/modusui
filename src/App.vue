<template>
  <v-app
    v-touch="{
    left: () => swipe('Left'),
    right: () => swipe('Right'),
    up: () => swipe('Up'),
    down: () => swipe('Down')
  }">
    <!-- HEADER -->
    <v-toolbar
      v-if="authenticated.state"
      color="white"
      app
      :clipped-left="clipped"
    >
      <img v-if="$vuetify.breakpoint.smAndDown" @click="drawerState = true" alt="" src="./assets/ed_logo.svg"><img>
      <img v-if="$vuetify.breakpoint.mdAndUp" alt="" src="./assets/ed_logo.svg"><img>
      <v-spacer></v-spacer>
      <v-layout row fill-height wrap justify-end>
        <v-icon outline medium class="mx-2" color="primary">person_outline</v-icon>
        <v-chip class="ml-1 mt-3 mb-3" v-for="(level, index) in user" :key="index" color="secondary" text-color="primary">{{ levelDisplay(level) }}</v-chip>
      </v-layout>
    </v-toolbar>
    <!-- SIDEBAR -->
    <transition-group name="navBtns">
      <!-- FOR MD AND UP -->
      <v-navigation-drawer
        v-if="user.find(level => level === 'CARER') && authenticated.state && $vuetify.breakpoint.mdAndUp"
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
      <!-- FOR SM AND DOWN -->
      <v-navigation-drawer
        v-model="drawerState"
        v-if="user.find(level => level === 'CARER') && authenticated.state && $vuetify.breakpoint.smAndDown"
        key="bp-sm"
        class="primary"
        disable-route-watcher
        mini-variant
        mini-variant-width="160"
        temporary
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
    <!-- ROUTER VIEW -->
    <v-container class="px-0" fluid>
      <v-content>
        <v-slide-y-transition mode="out-in">
          <router-view class="px-0" @authenticated="setAuthenticated"/>
        </v-slide-y-transition>
      </v-content>
    </v-container>
    <!-- FOOTER -->
    <v-fade-transition>
      <v-footer
        v-if="
          user.find(level => level === 'SYSTEM ADMINISTRATOR') ||
          user.find(level => level === 'CLIENT ADMINISTRATOR') &&
          !(user.find(level => level === 'CARER')) &&
          this.authenticated.state"
        :fixed="fixed"
        color="white"
        app
      >
        <v-layout row fill height align-space-between justify-space-between>
          <v-layout class="pt-2" row align-center justify-start>
            <span class="ml-3" style="align-center">Version: ALPHA</span>
          </v-layout>
          <BaseAppNavBtn
            btnIcon="home"
            btnColor="primary"
            route="landing"
            tip="Home"
            top
          />
          <BaseAppNavBtn
            v-if="user.find(level => level === 'CARER') && this.authenticated.state"
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
    <!-- SNACKBAR -->
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
      drawerState: false,
      swipeDirection: '',
      // Snackbar
      snackState: false,
      snackText: '',
      snackColor: '',
      snackTimeout: 0,
      authenticated: {},
      appNavConfig: {footer: true, sideMenu: true, header: true},
      navFooter: '',
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
          title: 'Consumption',
          btnIcon: 'date_range',
          btnColor: 'white',
          iconColor: 'white',
          route: 'consumptioncalender',
          tip: 'View consumption'
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
    swipe (direction) {
      this.swipeDirection = direction
    },
    setAuthenticated (newStatus) {
      localStorage.auth = JSON.stringify(newStatus)
      this.authenticated = newStatus
      if (this.authenticated.level) {
        this.user = this.authenticated.level
        if (this.user.find(level => level === 'SYSTEM ADMINISTRATOR') || this.user.find(level => level === 'CLIENT ADMINISTRATOR') && newStatus.token) {
          this.navFooter = true
          this.$router.push('/landing')
        }
        if (this.user.find(level => level === 'CARER') || 
        (this.user.find(level => level === 'CARER') && this.user.find(level => level === 'CLIENT ADMINISTRATOR')) && newStatus.token) {
          this.navFooter = false
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
      localStorage.removeItem('auth')
      this.$router.push('/login')
    },
    home () {
      this.$router.push('/landing')
    },
    levelDisplay (level) {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return level
      } else if (this.$vuetify.breakpoint.smAndDown) {
        if(level.includes('CARER')) {
          return 'CARER'
        } else if (level.includes('CLIENT ADMINISTRATOR')) {
          return 'CLI ADMIN'
        } else if (level.includes('SYSTEM ADMINISTRATOR')) {
          return 'SYS ADMIN'
        }
      }
    },

  },
  computed: {
    userLevel () {
      const greeting = 'LOGGED IN AS: '
      let concatUser = ''
      for (let i = 0; i < this.user.length; i++) {
        const element = String(this.user[i])
        concatUser = concatUser + element + ' '
      }
      return greeting + concatUser
    },
  },
  watch: {
    swipeDirection: function () {
      if (this.swipeDirection === 'Right') {
        this.drawerState = true
        this.swipeDirection = ''
      }
    },
    authenticated: function () {
      console.log('Auth changed: ', this.authenticated)
      if (this.authenticated.state === null) this.logout()
    },
  },
  mounted () {
    if (this.authenticated.state === null || this.authenticated.state === undefined) {
      this.logout()
    }
    EventBus.$on('snack-msg', data => {
      this.showSnack(data)
    })
  },
  destroyed () {
    EventBus.$off('snack-msg')
    // userLevel = null
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
