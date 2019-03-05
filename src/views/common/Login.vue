<template>
  <v-layout class="loginreset-container" row fill-height align-center justify-space-around>
    <BaseLogin
      :msg="msg"
      :isAuthenticating="isAuthenticating"
      :isActive="isActive"
      @authenticate="submitCredentials"
      :primaryColor="primaryColor"
      :spinnerSize="spinnerSize"
      :spinnerWidth="spinnerWidth"
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
      // this.isAuthenticating = true
      var data = apiLib.postAuth('login', item).then(response => {
        if (Array.isArray(response)) {
          for (var i = 0; i < response.length; i++) {
            if (response[i].description) {
              this.isActive = false
              this.$emit('authenticated', { state: true, level: response[i].description, token: response[i].token })
            }
          }
        } else {
          this.$emit('authenticated', { state: false, level: null })
          this.msg = response
          this.isActive = true
        }
      })
      console.log(data)
      this.isAuthenticating = false
    }
  },
  mounted () {
    localStorage.removeItem('auth')
    this.$emit('authenticated', { state: false, level: null })
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
