<template>
  <v-container id="forgotpassword">
    <v-flex>
      <v-layout class="ma-2" column align-center>
        <img alt src="../../assets/ed_logo.svg">
      </v-layout>
      <v-form>
        <v-layout align-center justify-center column fill-height>
          <h3>Please enter your email address below.</h3>
          <h3>Click the button to request to reset your password.</h3>
          <input id="email" type="text" v-model="input.email" :rules="emailRules" placeholder="Enter your Email address" name="email" required>
          <router-link to="/login">
            <button @click="forgotPassword">Reset Password</button>
          </router-link>
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
      this.$emit({ email: this.input.email });
    }
  }
};
</script>

<style lang="scss">
@import "./public/scss/main.scss";

img {
  width: 30vh;
}
h3 {
  margin-top: 5px;
}
input[type="text"] {
  width: 40vh;
  padding: 0.5vh;
  margin: 1vh;
  border-radius: 0.5vh;
  color: $dark-blue-grey;
  border-color: $vuetify-primary;
  border-style: solid;
  margin-top: 25px;
}
button {
  color: $dark-blue-grey;
  background-color: inherit;
  border-color: $vuetify-primary;
  border-style: solid;
  border-radius: 1vh;
  box-shadow: 0 0 0.5vh 0.5vh $vuetify-secondary;
  padding: 1vh;
  cursor: pointer;
  margin-left: 95%;
  margin-top: 10px;
  width: 130px;
}
</style>
