<template>
  <v-layout class="login-container" row fill-height align-center justify-space-around>
    <BaseLogin
      :msg="msg"
      :isAuthenticating="isAuthenticating"
      :isActive="isActive"
      @authenticate="submitCredentials"
    />
  </v-layout>
</template>

<script>
import BaseLogin from '@/components/base/BaseLoginComponent'
import { getData, postData } from '@/mixins/apiRequests'

export default {
  name: 'Login',
  components: {
    BaseLogin
  },
  mixins: [getData, postData],
  data: function () {
    return {
      msg: '',
      active: false,
      isAuthenticating: false,
      isActive: false
      // src: './src/assets/ed_logo.svg'
    }
  },
  methods: {
    async submitCredentials (item) {
      // this.isAuthenticating = true
      var response = await this.postData('login', item)
      for (var i = 0; i < response.length; i++) {
        if (response[i].description) {
          this.isActive = false
          this.$emit('authenticated', { state: true, level: response[i].description })
        } else {
          this.$emit('authenticated', { state: false, level: null })
          this.msg = response
          this.isActive = true
        }
      }
      this.isAuthenticating = false
    }
  },
  created () {
    this.$emit('authenticated', { state: false, level: null })
  },
  mounted () {
    console.log(this.$route.params)
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";

.login-container {
  height: 96vh;
  margin-top: 1vh;
  margin-bottom: 1vh;
  background-color: inherit;
}
</style>
