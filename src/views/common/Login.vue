<template>
  <BaseLogin
    :msg="msg"
    :isAuthenticating="isAuthenticating"
    :isActive="isActive"
    @authenticated="submitCredentials"
  />
</template>

<script>
import BaseLogin from '@/components/base/BaseLoginComponent'
import { getData, postData } from '@/mixins/apiRequests'

export default {
  name: 'Login',
  components: {
    BaseLogin
  },
  mixins:[getData, postData],
  data: function () {
    return {
      msg: '',
      active: false,
      isAuthenticating: false,
      isActive: false,
      // src: './src/assets/ed_logo.svg'
    }
  },
  methods: {
    async submitCredentials (item) {
      if (item.username === null || item.password === null) {
        this.msg = 'You must complete both fields.'
        this.isActive = true
      }
      // else if (item.username === null && item.password === null) {
      //
      // }
      var response = await this.postData('login', item)
      // if (response != 'Error logging in' || response != 'Invalid Login Request' || response != 'User inactive' || response != 'Invalid Login Request' ) {
      //  this.msg = 'Incorrect user id or password.'
      //  this.isActive = true
      // }
      if (response != 'Error logging in' || response != 'Invalid Login Request' || response != 'User inactive' || response != 'Invalid Login Request' ) {
        this.$router.push('/landing')
        this.isActive = true
      }
      if (response.description != ' ') {
        this.$emit('authenticated', {state:true, username: item.username })
        this.$router.push('/landing')
      }
    console.log(this.msg)
    }
  },
  mounted () {
      console.log(this.$route.params)
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";

#login {
  background-color: inherit;
}
</style>
