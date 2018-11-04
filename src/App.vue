<template>
  <v-app>
    <v-toolbar
      v-if="authenticated.state"
      color="white"
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon v-if="$vuetify.breakpoint.mdAndUp" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <img alt="" src="./assets/ed_logo.svg"><img>
      <v-spacer></v-spacer>
      <span v-if="authenticated.state && $vuetify.breakpoint.smAndUp">Logged in as: {{ user }}</span>
      <v-btn v-if="$vuetify.breakpoint.lgAndUp" class="ml-2" id="logout" icon @click.stop="home">
        <v-icon medium>home</v-icon>
      </v-btn>
      <v-btn v-if="$vuetify.breakpoint.mdAndDown" class="ml-1" id="logout" icon @click.stop="home">
        <v-icon medium>home</v-icon>
      </v-btn>
      <v-btn v-if="$vuetify.breakpoint.lgAndUp" class="ml-2" id="logout" icon @click.stop="logout">
        <v-icon medium>exit_to_app</v-icon>
      </v-btn>
      <v-btn v-if="$vuetify.breakpoint.mdAndDown" class="ml-1" id="logout" icon @click.stop="logout">
        <v-icon medium>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer id ='nav-drawer' v-if="authenticated.state"
      width=160
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      value="false"
    >
        <!-- <v-list>
            <img alt="" src="./assets/ed_logo.svg"><img>
            <v-list-tile
                value="true"
                v-for="(item, i) in items"
                :key="i"
            >
            <v-list-tile-action>
                <v-icon id="menu-icon" size="50" v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
        </v-list> -->
    </v-navigation-drawer>
      <v-content>
        <!-- <v-container fluid> -->
        <v-slide-y-transition mode="out-in">
          <!-- <v-container xs12> -->
          <keep-alive>
            <router-view class="px-0" @authenticated="setAuthenticated"/>
          </keep-alive>
        <!-- </v-container> -->
        </v-slide-y-transition>
        <!-- </v-container> -->
      </v-content>
    <v-footer
      class="elevation-5 pa-1"
      v-if="authenticated.state"
      :fixed="fixed"
      color="white"
      app
    >
      <span v-if="$vuetify.breakpoint.smAndUp">Version: 0.1.0</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      authenticated: {
        state: false,
        userId: null
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
      this.authenticated.userId = newStatus.userId
      localStorage.auth = JSON.stringify(this.authenticated)
      if (newStatus.state) {
        this.$router.push('/landing')
      }
    },
    logout () {
      this.authenticated = { state: false, userId: null }
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
  background-color: $bg-grey;
}
img {
  height: inherit;
  padding: 5px;
}
</style>
