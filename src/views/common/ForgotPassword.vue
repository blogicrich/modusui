<template>
  <v-layout class="loginreset-container" row fill-height align-center justify-space-around>
    <base-reset-password />
  </v-layout>
</template>

<script>

import BaseResetPasswordVue from '@/components/base/BaseResetPassword'

export default {
  components: {
    'base-reset-password': BaseResetPasswordVue
  }
}
</script>

<style lang="scss">
@import "./public/scss/main.scss";
</style>
