<template>
  <v-form v-if="!error && !loading">
    <v-text-field
      label="Friendly name"
      v-model="friendlyName"
      counter="45"
      :rules="friendlyNameRules"
    />
  </v-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    baseId: Number
  },
  computed: {
    ...mapState({
      dropletsLoading: state => state.cliAdminDroplets.loading,
      droplets: state => state.cliAdminDroplets.droplets,
      users: state => state.cliAdminUsers.cliAdminUsers,
      usersLoading: state => state.cliAdminUsers.cliAdminUsersLoading,
      usersError: state => state.cliAdminUsers.cliAdminUsersError
    }),
    droplet () {
      if (this.droplets) {
        return this.droplets.find(droplet => droplet.baseId === this.baseId)
      } else {
        return null
      }
    },
    loading () {
      return this.dropletsLoading || this.usersLoading
    },
    error () {
      return !this.droplet || this.usersError
    }
  },
  data: () => {
    return {
      error: false,
      friendlyName: null,
      userId: null,
      friendlyNameRules: [
        v => v.length <= 45 || 'Friendly name too long'
      ]
    }
  },
  watch: {
    droplet () {
      if (!this.droplet) {
        return
      }

      this.friendlyName = this.droplet.friendlyName
      this.userId = this.droplet.user ? this.droplet.user.userId : null
      this.$store.dispatch('fetchCliAdminUsers')
    }
  }
}
</script>
