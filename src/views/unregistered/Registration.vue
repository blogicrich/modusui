<template>
  <v-layout row fill-height align-center justify-space-around>
    <v-dialog :value="availabilityState !== 'AVAILABLE'" persistent width="700">
      <v-card v-if="availabilityState === 'NOT_FOUND'">
        <v-card-title class="headline lighten-2">This Connected Droplet has not come online yet</v-card-title>
        <v-card-text>Make sure the batteries are inserted correctly.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="retry" flat>Try Again</v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-if="availabilityState === 'ALLOCATED'">
        <v-card-title class="headline lighten-2">This Connected Droplet is already in use</v-card-title>
        <v-card-text>
          If you know who used this Connected Droplet previously, ask them to unlink it from their account. If this is
          a new Connected Droplet, contact the people who sold it to you.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn to="/login" flat>OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-layout column justify-center align-center v-if="isWaitingForResponse">
      <v-progress-circular
        class="ma-2"
        :rotate="180"
        :size="spinnerSize"
        :width="spinnerWidth"
        :color="primaryColor"
        indeterminate
      />
      <h2 class="headline font-weight-light">{{ loadingMessage }}</h2>
    </v-layout>
    <BasicRegDetailsForm
      v-if="titles"
      v-show="!isWaitingForResponse"
      :macAddress="macAddress"
      :titles="titles"
      :validAccountAcquired="validAccountAcquired"
      :duplicateAccount="duplicateAccount"
      @accountErrorAcknowledged="duplicateAccount = false"
      @submitAccountDetails="submitAccountDetails"
      @submitEdropletConfig="submitEdropletConfig"
    />
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import BasicRegDetailsForm from '@/components/sub/SubRegDetails'
import validation from '@/mixins/validation'

export default {
  name: 'Registration',
  components: {
    BasicRegDetailsForm
  },
  props: {
    unsanitizedMacAddress: String
  },
  data: function () {
    return {
      macAddress: null,
      isWaitingForResponse: true,
      validAccountAcquired: false,
      duplicateAccount: false,
      msg: '',
      primaryColor: 'primary',
      spinnerSize: '250',
      spinnerWidth: '15',
      loadingMessage: 'Checking Connected Droplet availability'
    }
  },
  methods: {
    retry () {
      this.isWaitingForResponse = true
      this.dropletAvailabilityError = false

      // Cooldown, we don't want the user spamming this check.
      setTimeout(() => {
        this.$store.dispatch('fetchPublicAvailabilityState', this.macAddress).then(() => {
          this.isWaitingForResponse = false
        })
      }, 2000)
    },
    showAlert (message, route) {
      alert(message)
      this.$router.push(route)
    },
    async submitAccountDetails (details) {
      this.loadingMessage = 'Creating new account...'
      this.validAccountAcquiredd = false
      this.isWaitingForResponse = true

      await this.$store.dispatch('registerAccount', {
        ...details,
        baseAddress: this.macAddress
      })

      if (this.wizardError) {
        if (this.wizardError.response && this.wizardError.response.status === 409) {
          this.duplicateAccount = true
          this.isWaitingForResponse = false
        } else {
          this.$router.push('/error')
        }
        return
      }

      this.loadingMessage = 'Logging you in...'
      await this.$store.dispatch('POST_LOGIN', { username: details.username, password: details.password })
      this.validAccountAcquired = true
      this.isWaitingForResponse = false
    },
    async submitEdropletConfig (config) {
      this.isWaitingForResponse = true
      this.loadingMessage = 'Adding the Connected Droplet to your account...'
      await this.$store.dispatch('registerDroplet', config)
      this.isWaitingForResponse = false
    }
  },
  computed: {
    ...mapState({
      titles: state => state.publicTitles.titles,
      availabilityState: state => state.gettingStartedWizard.availabilityState,
      wizardError: state => state.gettingStartedWizard.error
    })
  },
  mounted () {
    this.$store.commit('SET_WIZARD_ACTIVE_STATE', true)

    if (!this.unsanitizedMacAddress || !this.unsanitizedMacAddress.match(this.macAddressRegEx)) {
      return this.showAlert(`Invalid Connected Droplet Address "${this.unsanitizedMacAddress}"`, '/error')
    }

    // Convert from any of the valid MAC address representations to the one we want.
    this.macAddress = this.unsanitizedMacAddress
      .split(/-|:/)
      .map(octet => octet.toUpperCase())
      .reduce((address, currentOctet) => address + currentOctet + '-', '')
      .slice(0, -1)

    Promise.all([
      this.$store.dispatch('GAIN_ANTI_CSRF_TOKEN'),
      this.$store.dispatch('fetchPublicTitles'),
      this.$store.dispatch('fetchPublicAvailabilityState', this.macAddress)
    ]).then(() => {
      this.isWaitingForResponse = false
    })
  },
  beforeRouteLeave (from, to, next) {
    console.log('Wizard incactive.')
    this.$store.commit('SET_WIZARD_ACTIVE_STATE', false)
    next()
  },
  mixins: [
    validation
  ]
}
</script>
