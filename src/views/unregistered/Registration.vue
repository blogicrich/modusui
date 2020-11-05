<template>
  <v-layout class="loginreset-container" row fill-height align-center justify-space-around>
    <v-dialog v-model="dropletAvailabilityError" persistent width="700">
      <v-card v-if="dropletState === 'BASE_NOT_FOUND'">
        <v-card-title class="headline lighten-2">This Connected Droplet has not come online yet</v-card-title>
        <v-card-text>Make sure the batteries are inserted correctly.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="retry" flat>Try Again</v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-if="dropletState === 'BASE_ALREADY_LINKED'">
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
      :genders="genders"
      :communicationMethods="communicationMethods"
      :alertTypes="alertTypes"
      :validAccountAcquired="validAccountAcquired"
      :duplicateAccount="duplicateAccount"
      @accountErrorAcknowledged="duplicateAccount = false"
      @submitAccountDetails="submitAccountDetails"
      @submitEdropletConfig="submitEdropletConfig"
      @submitDropletUse="submitDropletUse"
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
      dropletAvailabilityError: false,
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
        this.$store.dispatch('checkDropletAvailable', this.macAddress).then(() => {
          this.isWaitingForResponse = false
        })
      }, 2000)
    },
    sanitizeMacAddress (macAddress) {
      return macAddress
        .split(/-|:/)
        .map(octet => octet.toUpperCase())
        .reduce((address, currentOctet) => address + currentOctet + '-', '')
        .slice(0, -1)
    },
    showAlert (message, route) {
      alert(message)
      this.$router.push(route)
    },
    submitAccountDetails (details) {
      this.loadingMessage = 'Creating new account...'
      this.validAccountAcquiredd = false
      this.isWaitingForResponse = true

      this.$store.dispatch('createAccount', details).then(() => {
        if (this.registerStatus === 200) {
          this.loadingMessage = 'Logging you in...'
          this.$store.dispatch('POST_LOGIN', { username: details.username, password: details.password })
            .then(() => {
              this.validAccountAcquired = true
              this.isWaitingForResponse = false
            })
        } else if (this.registerStatus === 409) {
          this.duplicateAccount = true
          this.isWaitingForResponse = false
        } else {
          this.$router.push('/error')
        }
      })
    },
    submitEdropletConfig (config) {
      this.isWaitingForResponse = true
      this.loadingMessage = 'Adding the Connected Droplet to your account...'
      this.$store.dispatch('linkDroplet', config).then(() => {
        if (this.linkDropletStatus !== 200) {
          this.isWaitingForResponse = false
          return this.showAlert('Unable to link droplet to account at this time.', '/error')
        }

        this.loadingMessage = 'Preparing next step...'
        this.$store.dispatch('fetchWizardOptions').then(() => {
          this.isWaitingForResponse = false
        })
      })
    },
    submitDropletUse (data) {
      if (data.dropletUse === 'SOMETHING_ELSE') {
        return this.$router.replace('/landing')
      }

      this.loadingMessage = 'Saving your configuration...'
      this.isWaitingForResponse = true

      const sleepTime = this.convertTimeToSecondsFromMidnight(data.userDetails.sleepTime)
      const wakeUpTime = this.convertTimeToSecondsFromMidnight(data.userDetails.wakeUpTime)

      if (data.dropletUse === 'SELF') {
        this.$store.dispatch('useDropletSelf', {
          ...data.userDetails,
          ...data.carerDetails,
          wakeUpTime,
          sleepTime,
          macAddress: this.macAddress
        }).then(() => {
          this.$router.replace('/dashboard')
        })
      } else {
        this.$store.dispatch('useDropletOther', {
          ...data.userPersonalDetails,
          ...data.userDetails,
          ...data.carerDetails,
          wakeUpTime,
          sleepTime,
          macAddress: this.macAddress
        }).then(() => {
          this.$router.replace('/dashboard')
        })
      }
    },
    convertTimeToSecondsFromMidnight (time) {
      const startOfDay = this.$moment().startOf('day')
      return this.$moment(time, 'HH:mm').diff(startOfDay, 'seconds')
    }
  },
  computed: {
    ...mapState({
      titles: state => state.gettingStartedWizard.titles,
      registerStatus: state => state.gettingStartedWizard.registerStatus,
      linkDropletStatus: state => state.gettingStartedWizard.linkDropletStatus,
      dropletState: state => state.gettingStartedWizard.dropletState,
      genders: state => state.wizard.genders,
      communicationMethods: state => state.wizard.communicationMethods,
      alertTypes: state => state.wizard.alertTypes
    })
  },
  mounted () {
    if (!this.unsanitizedMacAddress || !this.unsanitizedMacAddress.match(this.macAddressRegEx)) {
      return this.showAlert(`Invalid Connected Droplet Address "${this.unsanitizedMacAddress}"`, '/error')
    }

    // Convert from any of the valid MAC address representations to the one we want.
    this.macAddress = this.sanitizeMacAddress(this.unsanitizedMacAddress)

    this.$store.dispatch('getTitles').then(() => {
    })

    Promise.all([
      this.$store.dispatch('getTitles'),
      this.$store.dispatch('checkDropletAvailable', this.macAddress)
    ]).then(() => {
      this.isWaitingForResponse = false
    })

    this.$store.commit('SET_WIZARD_ACTIVE_STATE', true)
  },
  beforeRouteLeave (from, to, next) {
    console.log('Wizard incactive.')
    this.$store.commit('SET_WIZARD_ACTIVE_STATE', false)
    next()
  },
  watch: {
    dropletState (newState) {
      if (newState === 'BASE_NOT_FOUND' || newState === 'BASE_ALREADY_LINKED') {
        this.dropletAvailabilityError = true
      }
    }
  },
  mixins: [
    validation
  ]
}
</script>
