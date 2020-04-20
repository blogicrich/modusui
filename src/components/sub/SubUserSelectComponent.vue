<template>
  <v-container class="pa-0 ma-0" fluid>
    <v-layout class="mx-1" v-bind="binding">
      <v-flex xs12 lg6>
        <v-layout class="mx-2" v-if="$vuetify.breakpoint.lgAndUp" row fill-height align-center justify-start>
          <v-icon large color="primary">group</v-icon>
          <h2 class="text-primary ml-2">Connected eDroplet Users</h2>
        </v-layout>
        <v-layout v-if="$vuetify.breakpoint.mdAndDown" row fill-height align-center justify-center>
          <v-icon class="mx-1" medium color="primary">group</v-icon>
          <h2 class="text-primary">Connected Droplet Users</h2>
        </v-layout>
      </v-flex>
      <v-flex xs12 lg6>
        <v-text-field class="ma-1" v-model="search" prepend-icon="search"></v-text-field>
      </v-flex>
    </v-layout>
    <v-list two-line subheader class="ma-0 pa-0 userList">
      <v-list-tile
        avatar
        dense
        v-for="user in searchResults"
        :key="user.userId"
        @click="userSelected(user)"
        :class="user.userId === selectedUser.userId ? 'selectedUser' : ''"
      >
        <v-list-tile-avatar>
          <v-icon large color="primary">person</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ getDisplayName(user) }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ user.comments || 'No comments'}}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-icon
            :title="getStatus(user)"
            :color="getColour(user)"
          >{{ getMood(user) }}</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      colourMapping: {
        'Green': '#00e676',
        'Amber': '#ffc400',
        'Red': '#ff1744'
      }
    }
  },
  props: {
    users: Array,
    selectedUser: Object
  },
  computed: {
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.mdAndDown) {
        binding.column = true
        binding.row = false
        binding.fillHeight = false
        binding.alignCenter = true
        binding.justifySpaceBetween = false
      }
      if (this.$vuetify.breakpoint.lgAndUp) {
        binding.column = false
        binding.row = true
        binding.fillHeight = true
        binding.alignCenter = true
        binding.justifySpaceBetween = true
      }
      return binding
    },
    searchResults () {
      return this.users.filter((user) => this.getDisplayName(user).toLowerCase().match(this.search.toLowerCase()))
    }
  },
  methods: {
    userSelected (item) {
      this.$emit('userSelected', item)
    },

    getDisplayName (user) {
      return user.salutation || `${user.givenName} ${user.familyName}`
    },

    getStatus (user) {
      if (user.hydrationStatus && user.hydrationStatus.description) {
        return `This user is ${user.hydrationStatus.description.toLowerCase()}`
      } else {
        return 'Hydration status unknown'
      }
    },

    getMood (user) {
      if (user.hydrationStatus && user.hydrationStatus.description) {
        return user.hydrationStatus.description === 'Hydrated' ? 'mood' : 'mood_bad'
      } else {
        return 'mood'
      }
    },

    getColour (user) {
      if (user.hydrationStatus && user.hydrationStatus.RAG) {
        return this.colourMapping[user.hydrationStatus.RAG]
      } else {
        return '#bec5b0'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";

.selectedUser {
  background-color: $table-row-hover;
}

.userList {
  overflow-y: auto;
}
</style>
