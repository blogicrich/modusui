<template>
  <v-layout class="forgotpassword-container" row fill-height align-center justify-space-around>
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

// .forgotpassword-container {
//   height: 96vh;
//   margin-top: 1vh;
//   margin-bottom: 1vh;
//   background-color: inherit;
// }
// img {
//   width: 35vh;
// }
// h3 {
//   margin-top: 5px;
// }
// div.v-input__control {
//   width: 40vh;
//   padding: 0.5vh;
//   margin: 1vh;
//   border-radius: 0.75vh;
//   color: $dark-blue-grey;
//   border-color: $vuetify-primary;
//   border-style: solid;
//   margin-top: -10px;
// }
// button.v-btn {
//   color: $dark-blue-grey;
//   background-color: inherit;
//   border-color: $vuetify-primary;
//   border-style: solid;
//   border-radius: 1vh;
//   cursor: pointer;
//   margin-left: 257px;
//   margin-top: 10px;
//   width: 125px;
// }
</style>
