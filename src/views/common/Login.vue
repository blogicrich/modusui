<template>
  <v-layout
    class="loginreset-container"
    row
    fill-height
    align-center
    justify-space-around
  >
    <BaseLogin
      :msg="msg"
      :is-authenticating="loading"
      :is-active="isActive"
      :primary-color="primaryColor"
      :spinner-size="spinnerSize"
      :spinner-width="spinnerWidth"
      @authenticate="submitCredentials"
    />
  </v-layout>
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
      return this.$store.getters.level
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
    this.$store.dispatch('LOGOUT')
  },
  methods: {
    async submitCredentials (item) {
      this.$store.dispatch('LOGOUT') // Ensure localStorage is clean
      this.$store.dispatch('POST_LOGIN', item).then((response) => {
        if (response) {
          this.msg = response
        } else {
          this.$emit('authenticated')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
