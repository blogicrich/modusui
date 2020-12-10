<template>
  <v-container fill-height>
    <BaseLogin
      v-if="!waitingForAntiCSRF"
      :msg="msg"
      :is-authenticating="loading"
      :is-active="authenticated"
      :primary-color="primaryColor"
      :spinner-size="spinnerSize"
      :spinner-width="spinnerWidth"
      @authenticate="submitCredentials"
    />
  </v-container>
</template>

<script>
import BaseLogin from '@/components/base/BaseLoginComponent'

export default {
  name: 'Login',
  components: {
    BaseLogin
  },
  data: function () {
    return {
      waitingForAntiCSRF: true,
      msg: '',
      primaryColor: 'primary',
      spinnerSize: '50',
      spinnerWidth: '3'
    }
  },
  computed: {
    authenticated: function () {
      return this.$store.getters.authenticated
    },
    level: function () {
      return this.$store.getters.level || []
    },
    loading: function () {
      return this.$store.state.eDropletApp.authDataLoading
    },
    token: function () {
      return this.$store.getters.token
    },
    deptPersonsId: function () {
      return this.$store.getters.deptPersonsId
    },
    isActive: function () {
      return this.$store.getters.isActive
    },
    portalAuthorisedId: function () {
      return this.$store.getters.portalAuthorisedId
    }
  },
  mounted () {
    this.$store.commit('CLEAR_STATE')
    this.waitingForAntiCSRF = true
    Promise.all([
      this.$store.dispatch('GAIN_ANTI_CSRF_TOKEN')
    ]).then(() => {
      this.waitingForAntiCSRF = false
    })
  },
  methods: {
    submitCredentials (item) {
      this.$store.commit('CLEAR_STATE') // Ensure localStorage is clean
      this.$store.dispatch('POST_LOGIN', item).then((response) => {
        if (response.expiresOn > 0) {
          this.$emit('authenticated')
        } else {
          this.msg = (response !== undefined) ? response.message : 'Network error'
        }
      })
    }
  }
}
</script>
