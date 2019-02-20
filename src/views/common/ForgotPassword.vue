<template>
  <v-container id="forgotpassword">
    <base-reset-password></base-reset-password>
  </v-container>
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

img {
  width: 35vh;
}
h3 {
  margin-top: 5px;
}
div.v-input__control {
  width: 40vh;
  padding: 0.5vh;
  margin: 1vh;
  border-radius: 0.75vh;
  color: $dark-blue-grey;
  border-color: $vuetify-primary;
  border-style: solid;
  margin-top: -10px;
}
button.v-btn {
  color: $dark-blue-grey;
  background-color: inherit;
  border-color: $vuetify-primary;
  border-style: solid;
  border-radius: 1vh;
  cursor: pointer;
  margin-left: 257px;
  margin-top: 10px;
  width: 125px;
}
</style>
