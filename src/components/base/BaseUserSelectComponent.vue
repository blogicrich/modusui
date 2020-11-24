<template>
  <v-menu
    v-model="showMenu"
    absolute
    offset-y
    :close-on-content-click="closeOnclick"
    full-width
  >
    <!-- eslint-disable-next-line -->
    <template v-slot:activator="{ on }">
      <v-card
        hover
        ref="selected-user-tile"
        class="pa-3"
        v-on="on"
      >
        <v-layout
          row
          fill-height
          align-center
          justify-space-between
        >
          <!-- DESKTOP -->
          <v-flex
            v-if="$vuetify.breakpoint.lgAndUp"
            class="text-truncate"
          >
            <v-layout
              row
              fill-height
              align-center
              justify-start
            >
              <v-icon
                large
                color="primary"
              >
                group
              </v-icon>
              <transition
                name="component-fade"
                mode="out-in"
              >
                <p class="headline font-weight-medium primary--text text-truncate ma-2">
                  {{ $vuetify.breakpoint.xlOnly ? 'Connected eDroplet User: ' : 'eDroplet User: ' }}
                </p>
              </transition>
              <transition
                name="component-fade"
                mode="out-in"
              >
                <p class="headline font-weight-medium accent--text ma-2">
                  {{ getDisplayName(selectedUser) }}
                </p>
              </transition>
            </v-layout>
          </v-flex>
          <!-- MOBILE -->
          <v-flex
            v-if="$vuetify.breakpoint.mdAndDown"
          >
            <v-layout
              row
              fill-height
              align-center
              justify-start
            >
              <v-icon
                medium
                color="primary"
              >
                group
              </v-icon>
              <transition
                name="component-fade"
                mode="out-in"
              >
                <p class="headline font-weight-medium accent--text ma-2">
                  {{ getDisplayName(selectedUser) }}
                </p>
              </transition>
            </v-layout>
          </v-flex>
          <v-icon
            v-if="selectedUser.hydrationStatus"
            large
            :title="getStatus(selectedUser)"
            :color="getColour(selectedUser)"
          >
            notification_important
          </v-icon>
          <v-icon
            v-if="selectedUser.hydrationStatus"
            large
            :title="getStatus(selectedUser)"
            :color="getColour(selectedUser)"
          >
            {{ getMood(selectedUser) }}
          </v-icon>
        </v-layout>
      </v-card>
    </template>
    <!-- USER LIST -->
    <v-list
      two-line
      subheader
      class="ma-0 pa-0 userList"
    >
      <v-list-tile @click="searchTileClicked">
        <v-text-field
          class="ma-1"
          v-model="search"
          prepend-icon="search"
        />
      </v-list-tile>
      <v-list-tile
        avatar
        dense
        double-line
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
          <v-list-tile-sub-title>{{ user.comments || 'No comments' }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon
            v-if="user.hydrationStatus"
            :title="getStatus(user)"
            :color="getColour(user)"
          >
            {{ getMood(user) }}
          </v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile v-if="searchResults.length === 0">
        <v-flex>
          <p class="primary--text text-xs-center"> NO USERS MATCHING <br>{{ search }}</p>
        </v-flex>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  name: 'BaseUserSelectComponent',
  data () {
    return {
      closeOnclick: false,
      search: '',
      showMenu: false,
      on: false,
      colourMapping: {
        Green: this.$vuetify.theme.success,
        Amber: this.$vuetify.theme.warning,
        Red: this.$vuetify.theme.error
      }
    }
  },
  props: {
    roles: Array,
    users: Array,
    selectedUser: Object
  },
  computed: {
    searchResults (user) {
      return this.users.filter((user) => this.getDisplayName(user).toLowerCase().match(this.search.toLowerCase()))
    }
  },
  methods: {
    getColour (user) {
      if (user.hydrationStatus && user.hydrationStatus.RAG) {
        return this.colourMapping[user.hydrationStatus.RAG]
      } else {
        return '#bec5b0'
      }
    },
    getDisplayName (user) {
      return user.salutation || `${user.deptPerson.person.givenName} ${user.deptPerson.person.familyName}`
    },
    getMood (user) {
      if (user.hydrationStatus && user.hydrationStatus.description) {
        return user.hydrationStatus.description === 'Hydrated' ? 'mood' : 'mood_bad'
      } else {
        return 'mood'
      }
    },
    getStatus (user) {
      if (user.hydrationStatus && user.hydrationStatus.description) {
        return `This user is ${user.hydrationStatus.description.toLowerCase()}`
      } else {
        return 'Hydration status unknown'
      }
    },
    searchTileClicked () {
      this.closeOnclick = false
    },
    userSelected (user) {
      this.closeOnclick = true
      this.$emit('user-selected', user)
    }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";

.selectedUser {
  background-color: var(--v-tertiary-base);
}

.text-overflow-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
