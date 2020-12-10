<template>
  <v-form>
    <v-text-field
      label="MAC Address"
      v-model="macAddress"
      :rules="macAddressRules"
      hint="Formatting: FF-FF-FF-FF-FF-FF"
      :disabled="loading"
    />
    <v-layout v-if="loading" mt-2>
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </v-layout>
    <v-layout v-if="availabilityState !== null && !loading" mt-2>
      <div v-if="availabilityState === 'AVAILABLE'">
        <v-icon color="success">check</v-icon><span class="ml-1">Connected Droplet is available.</span>
      </div>
      <div v-else-if="availabilityState === 'ALLOCATED'">
        <v-icon color="error">block</v-icon><span class="ml-1">Connected Droplet already belongs to an account.</span>
      </div>
      <div v-else-if="availabilityState === 'NOT_FOUND'">
        <v-icon color="error">close</v-icon><span class="ml-1">Connected Droplet does not exist or has yet to communicate (make sure you've inserted the batteries and that the Connected Droplet has internet access).</span>
      </div>
    </v-layout>
    <v-layout mt-4>
      <v-btn
        flat
        class="ml-0"
        color="grey darken-2"
        @click="$emit('done')"
      >
        Cancel
      </v-btn>
      <v-spacer />
      <v-btn
        class="mr-0"
        color="primary"
        :disabled="availabilityState !== 'AVAILABLE'"
        @click="addDroplet"
      >
        Add Connected Droplet
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      validAddress: false,
      macAddress: null,
      formattedAddress: null,
      macAddressRules: [
        v => this.validAddress || 'Enter a valid MAC Address (e.g. FF-FF-FF-FF-FF-FF)'
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.cliAdminDroplets.loading,
      authenticated: state => state.eDropletApp.getters.authenticated,
      availabilityState: state => state.cliAdminDroplets.queryResult
    })
  },
  watch: {
    macAddress () {
      const formatted = this.macAddress
        .toUpperCase()
        .replace(/:/g, '-')

      if (/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(formatted)) {
        this.validAddress = true
        this.formattedAddress = formatted
        this.$store.dispatch('fetchAvailabilityState', formatted)
      } else {
        this.validAddress = false
      }
    }
  },
  methods: {
    addDroplet () {
      this.$store.dispatch('registerDroplet', { macAddress: this.formattedAddress }).then(() => {
        if (this.authenticated) {
          this.$store.dispatch('fetchDroplets')
        }
        this.$emit('done')
      })
    }
  },
  mounted () {
    this.validAddress = false
    this.macAddress = null
    this.$store.commit('SET_AVAILABILITY_QUERY_RESULTS', { macAddress: null, availabilityState: null })
  }
}
</script>
