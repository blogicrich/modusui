<template>
  <v-layout class="loginreset-container" row fill-height align-center justify-space-around>
    <v-fade-transition v-if="isWaitingForResponse">
      <v-layout column justify-center align-center>
        <v-progress-circular
          class="ma-2"
          :rotate="180"
          :size="spinnerSize"
          :width="spinnerWidth"
          :color="primaryColor"
          indeterminate
        ></v-progress-circular>
        <h2 class="headline font-weight-light">{{ loadingMessage }}</h2>
      </v-layout>
    </v-fade-transition>
    <v-fade-transition v-if="titles" :v-show="!isWaitingForResponse">
      <BasicRegDetailsForm
        :macAddress="query"
        :titles="titles"
        :validAccountAcquired="validAccountAcquired"
        :duplicateAccount="duplicateAccount"
        @accountErrorAcknowledged="duplicateAccount = false"
        @submitAccountDetails="submitAccountDetails"
        @submitEdropletConfig="submitEdropletConfig"
        @submitEdropletUsers="submitEdropletUsers"
      />
    </v-fade-transition>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import BasicRegDetailsForm from '@/components/sub/SubRegDetails'

export default {
  name: 'Registration',
  components: {
    BasicRegDetailsForm
  },
  props: {
    query: String
  },
  data: function () {
    return {
      isWaitingForResponse: true,
      validAccountAcquired: false,
      duplicateAccount: false,
      msg: '',
      primaryColor: 'primary',
      spinnerSize: '250',
      spinnerWidth: '15',
      loadingMessage: 'One moment please...'
    }
  },
  methods: {
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
      console.log('config: ', config)
    },
    submitEdropletUsers (users) {
      console.log('users: ', users)
    }
  },
  computed: {
    ...mapState({
      titles: state => state.gettingStartedWizard.titles,
      registerStatus: state => state.gettingStartedWizard.registerStatus
    })
  },
  mounted () {
    if (!this.query) {
      this.$router.push('/error')
    }

    this.$store.dispatch('getTitles').then(() => {
      this.isWaitingForResponse = false
    })
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
