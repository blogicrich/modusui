<template>
  <v-form v-if="!error && !loading" @submit="saveChanges" @submit.prevent>
    <v-text-field
      md-6
      label="Friendly name"
      v-model="friendlyName"
      counter="45"
      :rules="friendlyNameRules"
    />
    <v-combobox
      md-6
      label="Assigned to user"
      :items="usersFormatted"
      v-model="selectedUser"
      item-text="text"
      item-value="value"
    />
    <v-layout>
      <v-btn class="ml-0" color="grey" flat @click="$emit('done-editing')">Cancel</v-btn>
      <v-spacer />
      <v-btn color="warning" flat @click="unlinkDialog = true">Unlink Connected Droplet</v-btn>
      <v-btn class="mr-0" color="primary" flat type="submit">
        Save Changes
      </v-btn>
    </v-layout>
    <v-dialog v-model="unlinkDialog" max-width="600">
      <v-card>
        <v-card-title primary-title>
          <v-container fluid pa-0>
            <div class="headline">Are you sure?</div>
            <div>
              You are about to unlink Connected Droplet
              <span class="font-weight-black">{{ droplet.friendlyName || 'No name set' }} ({{ droplet.macAddress }})</span>
              from your account. This will make it available for someone else to assign to their account. Only use this
              if you plan on selling or returning your Connected Droplet. If you simply want to prevent the droplet
              from generating data, set the user to "Unassigned".
            </div>
          </v-container>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            flat
            color="primary"
            @click="unlinkDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            @click="unlink"
          >
            <v-icon class="mr-2">warning</v-icon>Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
  <v-progress-circular v-else color="primary" indeterminate />
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
    },
    usersFormatted () {
      return [
        {
          text: 'Unassigned',
          value: null
        },
        ...this.users.map(user => {
          return {
            value: user.userId,
            text: user.deptPerson.person.salutation
          }
        })
      ]
    }
  },
  data: () => {
    return {
      friendlyName: '',
      initialFriendlyName: null,
      selectedUser: null,
      initialSelectedUser: null,
      unlinkDialog: false,
      friendlyNameRules: [
        v => v.length <= 45 || 'Friendly name too long'
      ]
    }
  },
  methods: {
    saveChanges () {
      const jobs = []

      if (this.friendlyName !== this.initialFriendlyName) {
        jobs.push(this.$store.dispatch('setDropletName', { friendlyName: this.friendlyName, baseId: this.droplet.baseId }))
      }

      if (this.selectedUser.value !== this.initialSelectedUser.value) {
        jobs.push(this.$store.dispatch('setDropletUser', { userId: this.selectedUser.value, baseId: this.droplet.baseId }))
      }

      Promise.all(jobs).then(() => {
        this.$store.dispatch('fetchDroplets')
        this.$emit('done-editing')
      })
    },
    initialize () {
      if (!this.droplet) {
        return
      }

      this.friendlyName = this.droplet.friendlyName || ''

      if (this.droplet.user) {
        this.selectedUser = {
          value: this.droplet.user.userId,
          text: this.droplet.user.salutation
        }
      } else {
        this.selectedUser = {
          value: null,
          text: 'Unassigned'
        }
      }

      this.initialFriendlyName = this.friendlyName
      this.initialSelectedUser = this.selectedUser

      this.$store.dispatch('fetchCliAdminUsers')
    },
    unlink () {
      this.$store.dispatch('unlinkDroplet', this.droplet.baseId).then(() => {
        this.$store.dispatch('fetchDroplets')
        this.$emit('done-editing')
      })
    }
  },
  watch: {
    droplet () {
      this.initialize()
    }
  },
  mounted () {
    this.initialize()
  }
}
</script>
