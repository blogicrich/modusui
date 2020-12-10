<template>
  <v-app>
    <!-- HEADER -->
    <v-toolbar
      v-if="authenticated && !wizardActive"
      color="white"
      app
      :clipped-left="clipped"
    >
      <img
        v-if="$vuetify.breakpoint.smAndDown"
        @click="setDrawerState()"
        src="./assets/ed_logo.svg"
      >
      <img>
      <img
        v-if="$vuetify.breakpoint.mdAndUp"
        @click="setDrawerState()"
        src="./assets/ed_logo.svg"
      ><img>
      <v-spacer />
      <v-layout row fill-height wrap align-center justify-end>
        <v-icon
          v-if="$vuetify.breakpoint.mdAndUp"
          outline
          medium
          class="mx-2"
          color="primary"
        >
          person_outline
        </v-icon>
        <v-icon
          v-if="$vuetify.breakpoint.smAndDown"
          outline
          small
          class="mx-1"
          color="primary"
        >
          person_outline
        </v-icon>
        <v-chip
          v-show="$vuetify.breakpoint.mdAndUp"
          v-for="(role, index) in level"
          :key="'md' + index"
          color="secondary"
          text-color="primary"
        >
          {{ levelDisplay(role) }}
        </v-chip>
        <v-chip
          v-show="$vuetify.breakpoint.smAndDown"
          v-for="(role, index) in level"
          small
          :key="'sm' + index"
          color="secondary"
          text-color="primary"
        >
          {{ levelDisplay(role) }}
        </v-chip>
      </v-layout>
    </v-toolbar>
    <!-- SIDEBAR -->
    <transition-group name="fade" mode="in-out" appear>
      <!-- FOR MD AND UP -->
      <v-navigation-drawer
        v-if="
          level.includes('CARER') &&
            authenticated &&
            $vuetify.breakpoint.lgAndUp &&
            !wizardActive
        "
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
            v-if="level.includes('CARER') && level.includes('CLIENT ADMINISTRATOR')"
            my-3
            right
            btnIcon="settings"
            btnColor="white"
            iconColor="white"
            route="landing"
            name="landing"
            tip="Administration"
            @nav-btn-clicked="$router.push('/landing')"
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
            :name="item.name"
            @nav-btn-clicked="$router.push({ name: item.name })"
          />
        </v-layout>
      </v-navigation-drawer>
      <!-- FOR MD AND DOWN -->
      <v-navigation-drawer
        v-model="drawerState"
        v-if="
          level.includes('CARER') &&
            authenticated &&
            $vuetify.breakpoint.mdAndDown
        "
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
            v-if="level.includes('CARER') && level.includes('CLIENT ADMINISTRATOR')"
            my-3
            right
            btnIcon="settings"
            btnColor="white"
            iconColor="white"
            route="landing"
            tip="Administration"
            title="Administration"
            name="landing"
            @nav-btn-clicked="$router.push('/landing')"
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
            :name="item.name"
            @nav-btn-clicked="$router.push({ name: item.name, params: { headerIcon: item.btnIcon, headerText: item.title } })"
          />
        </v-layout>
      </v-navigation-drawer>
    </transition-group>
    <!-- ROUTER VIEW -->
    <v-container :class="containerStyle">
      <v-content>
        <v-slide-y-transition mode="out-in">
          <router-view @authenticated="setAuthenticated" />
        </v-slide-y-transition>
      </v-content>
    </v-container>
    <!-- FOOTER -->
    <v-fade-transition>
      <v-footer
        v-if="authenticated && !wizardActive"
        height="34"
        :fixed="fixed"
        color="white"
        app
      >
        <v-layout row fill height align-center justify-center>
          <v-layout row fill-height align-center justify-start>
            <span
              class="ml-3 caption text-xs-center"
            >
              Version: 0.1.1
            </span>
          </v-layout>
          <BaseAppNavBtn
            btnIcon="home"
            btnColor="primary"
            route="landing"
            tip="Home"
            name="landing"
            top
            @nav-btn-clicked="$router.push('/landing')"
          />
          <BaseAppNavBtn
            v-if="
              level.find((level) => level === 'CARER') && authenticated
            "
            btnIcon="dashboard"
            btnColor="primary"
            route="dashboard"
            tip="Dashboard"
            name="dashboard"
            top
            @nav-btn-clicked="$router.push({ name: 'dashboard' })"
          />
          <BaseAppNavBtn
            btnIcon="exit_to_app"
            btnColor="primary"
            route="login"
            name="login"
            tip="Logout"
            top
            @nav-btn-clicked="logout"
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
      <v-btn dark flat @click="snackState = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import BaseAppNavBtn from '@/components/base/BaseAppNavFooterBtn.vue'
import { EventBus } from '@/mixins/eventBus.js'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    BaseAppNavBtn
  },
  data () {
    return {
      drawerState: false,
      snackState: false,
      snackText: '',
      snackColor: '',
      snackTimeout: 0,
      appNavConfig: { footer: true, sideMenu: true, header: true },
      items: [
        {
          title: 'Dashboard',
          btnIcon: 'dashboard',
          btnColor: 'white',
          iconColor: 'white',
          route: 'carer/dashboard',
          name: 'dashboard',
          tip: 'Go to Dashboard'
        },
        {
          title: 'Add Drinks',
          btnIcon: 'local_drink',
          btnColor: 'white',
          iconColor: 'white',
          route: 'carer/additionaldrinks',
          name: 'additionaldrinks',
          tip: 'Add Drinks'
        },
        {
          title: 'Away',
          btnIcon: 'calendar_today',
          btnColor: 'white',
          iconColor: 'white',
          route: 'carer/away',
          name: 'away',
          tip: 'Record time away'
        },
        {
          title: 'Daily Report',
          btnIcon: 'menu_book',
          btnColor: 'white',
          iconColor: 'white',
          route: 'carer/dailyreport',
          name: 'dailyreport',
          tip: 'View Daily Report'
        },
        {
          title: 'Logout',
          btnIcon: 'exit_to_app',
          btnColor: 'white',
          iconColor: 'white',
          route: 'login',
          name: 'login',
          tip: 'Exit application'
        }
      ],
      clipped: true,
      fixed: false
    }
  },
  methods: {
    setDrawerState () {
      this.drawerState = !this.drawerState
    },
    setAuthenticated (newStatus) {
      if (this.level) {
        if (
          this.level.find((level) => level === 'SYSTEM ADMINISTRATOR') ||
          this.level.find((level) => level === 'CLIENT ADMINISTRATOR')
        ) {
          this.$router.push('/landing')
        }
        if (
          this.level.find((level) => level === 'CARER') ||
          (this.level.find((level) => level === 'CARER') &&
            this.level.find((level) => level === 'CLIENT ADMINISTRATOR'))
        ) {
          this.$router.push({ name: 'dashboard' })
        }
      } else {
        this.$store.commit('CLEAR_STATE')
      }
    },
    showSnack (eventPayload) {
      this.snackText = eventPayload.text
      this.snackColor = eventPayload.color
      this.snackTimeout = eventPayload.time
      this.snackState = eventPayload.state
    },
    logout () {
      if (this.$route.path !== '/login') {
        if (this.authenticated) {
          this.$store
            .dispatch('LOGOUT')
            .then(() => {
              this.$router.push('/login')
            })
        } else {
          this.$router.push('/login')
        }
      }
    },
    home () {
      this.$router.push('/landing')
    },
    levelDisplay (level) {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return level
      } else if (this.$vuetify.breakpoint.smAndDown) {
        if (level.includes('CARER')) {
          return 'CARER'
        } else if (level.includes('CLIENT ADMINISTRATOR')) {
          return 'CLI ADMIN'
        } else if (level.includes('SYSTEM ADMINISTRATOR')) {
          return 'SYS ADMIN'
        }
      }
    }
  },
  computed: {
    containerStyle () {
      if (this.$route.name === 'login' || this.$route.name === 'forgotpassword' || this.$route.name === 'registration') {
        return 'fill-height fluid'
      } else {
        return 'fluid'
      }
    },
    userLevel () {
      const greeting = 'LOGGED IN AS: '
      let concatUser = ''
      for (let i = 0; i < this.level; i++) {
        const element = String(this.level[i])
        concatUser = concatUser + element + ' '
      }
      return greeting + concatUser
    },
    authenticated: function () {
      return this.$store.getters.authenticated
    },
    level: function () {
      return this.$store.getters.level || []
    },
    loadStatus: function () {
      return this.$store.getters.authDataLoading
    },
    isActive: function () {
      return this.$store.getters.isActive
    },
    ...mapState({
      wizardActive: (state) => state.gettingStartedWizard.wizardActive
    })
  },
  watch: {
    authenticated: function () {
      if (!this.authenticated) {
        this.logout()
      }
    },
    '$route' (to, from) {
      if (to.name !== from.name) {
        this.drawerState = false
      }

      if (!['/', '/register'].includes(to.path) && !this.authenticated) {
        this.logout()
      }
    }
  },
  created () {
    EventBus.$on('snack-msg', (data) => {
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

img {
  position: absolute;
  top: 2px;
  left: 12px;
  height: inherit;
  padding: 5px;
}

</style>
