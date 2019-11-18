<template>
  <v-layout class="loginreset-container" row fill-height align-center justify-space-around>
    <BaseLogin
      :msg="msg"
      :isAuthenticating="authenticated"
      :isActive="isActive"
      :primaryColor="primaryColor"
      :spinnerSize="spinnerSize"
      :spinnerWidth="spinnerWidth"
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
  methods: {
    async submitCredentials (item) {
      await this.$store.dispatch('POST_LOGIN', item)
      this.$emit('authenticated')
    }
  },
  computed: {
    authenticated: function () {
      return this.$store.getters.authenticated
    },
    level: function () {
      return this.$store.getters.level
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
    this.$emit('authenticated')
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
