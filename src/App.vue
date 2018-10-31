<template>
  <v-app>
    <v-toolbar
      v-if="authenticated.state"
      color="white"
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <img alt="" src="./assets/ed_logo.svg"><img>
      <v-spacer></v-spacer>
      <span>Logged in as: {{ user }}</span>
      <v-btn id="logout" icon @click.stop="logout">
        <v-icon >exit_to_app</v-icon>
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
          <router-view @authenticated="setAuthenticated"/>
        <!-- </v-container> -->
        </v-slide-y-transition>
        <!-- </v-container> -->
      </v-content>
    <v-footer
      class="elevation-2 pa-1"
      v-if="authenticated.state"
      :fixed="fixed"
      color="white"
      app
    >
      <span>Version: 0.1.0</span>
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
