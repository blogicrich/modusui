<template>
  <v-layout class="loginreset-container" row fill-height align-center justify-space-around>
    <BaseLogin
      :msg="msg"
      :isAuthenticating="isAuthenticating"
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
import apiLib from '@/services/apiLib'

export default {
  /* eslint-disable */
  name: 'Login',
  components: {
    BaseLogin
  },
  data: function () {
    return {
      msg: '',
      active: false,
      isAuthenticating: false,
      isActive: false,
      primaryColor: 'primary',
      spinnerSize: '50',
      spinnerWidth: '3'
      // src: './src/assets/ed_logo.svg'
    }
  },
  methods: {
    submitCredentials (item) {
      this.isAuthenticating = true
      let data = apiLib.postAuth('login', item, true).then(response => {
        if (response) {
          if (response.roles) {
            this.isActive = false
            this.$emit('authenticated', { 
              state: true, 
              level: response.roles, 
              token: response.token, 
              deptPersonsId: response.deptPersonsId, 
              portalAuthorisedId: response.portalAuthorisedId 
              })
          }
        } else {
          this.$emit('authenticated', { state: false, level: [], token: null, deptPersonsId: null, portalAuthorisedId: null })
          this.msg = response.message
          this.isActive = true
        }
      })
      this.isAuthenticating = false
      return data
    }
  },
  mounted () {
    this.$emit('authenticated', { state: false, level: [], token: null, deptPersonsId: null, portalAuthorisedId: null })

  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
