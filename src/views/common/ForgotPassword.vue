<template>
  <v-container id="forgotpassword">
    <v-flex>
      <v-layout class="ma-2" column align-center>
        <img alt src="../../assets/ed_logo.svg">
      </v-layout>
      <v-form>
        <v-layout align-center justify-center column fill-height>
          <h3>Please enter your email address below and click the Reset Password button.</h3>
          <v-input class="mt-3" id="email" v-model="input.email" label="Enter your Email address"/>
          <v-btn flat v-on:click="forgotPassword">Reset Password</v-btn>
        </v-layout>
      </v-form>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      input: {
        email: null
      }
    };
  },
  methods: {
    forgotPassword() {
      // this.$emit(this.input.email);
      alert('Please check your email for your new password. You can change it after you\'ve logged in using this new password.')
      console.log(this.input.email);
    }
  }
};
</script>

<style lang="scss">
@import "./public/scss/main.scss";

img {
  width: 35vh;
}
h3 {
  margin-top: 5px;
}
v-input[id="email"] {
  width: 40vh;
  padding: 0.5vh;
  margin: 1vh;
  border-radius: 0.75vh;
  color: $dark-blue-grey;
  border-color: $vuetify-primary;
  border-style: solid;
  margin-top: 25px;
}
button.v-btn {
  color: $dark-blue-grey;
  background-color: inherit;
  border-color: $vuetify-primary;
  border-style: solid;
  border-radius: 1vh;
  cursor: pointer;
  margin-left: 20.5%;
  margin-top: 10px;
  width: 140px;
}
</style>
