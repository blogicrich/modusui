<template>
  <v-layout class="loginreset-container" row fill-height align-center justify-space-around>
    <base-reset-password></base-reset-password>
  </v-layout>
</template>

<script>
/* eslint-disable */
import BaseResetPasswordVue from '../../components/base/BaseResetPassword.vue';

export default {
  components: {
    'base-reset-password': BaseResetPasswordVue
  }
}
</script>

<style lang="scss">
@import "./public/scss/main.scss";
</style>
