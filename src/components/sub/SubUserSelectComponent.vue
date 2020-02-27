<template>
  <v-layout column>
    <v-container fill-height align-center justify-center>
      <v-flex xs5 grow>
        <v-layout fluid fill-height align-center justify-start>
          <v-icon large color="primary">group</v-icon>
          <h2 class="table-header">Connected Droplet Users</h2>
        </v-layout>
      </v-flex>
      <v-flex xs7 shrink>
        <v-layout fill-height align-center justify-start>
          <v-icon>search</v-icon>
          <input type="text" class="searchbar" v-model="search" placeholder="Search user" />
        </v-layout>
      </v-flex>
    </v-container>
    <v-list two-line subheader class="userList">
      <v-list-tile
        avatar
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
  </v-layout>
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

.searchbar {
  border-bottom: 1px solid $vuetify-primary;
}

.selectedUser {
  background-color: $table-row-hover;
}

.userList {
  margin-top: -32px;
  max-height: 268px;
  overflow-y: auto;
}
</style>
