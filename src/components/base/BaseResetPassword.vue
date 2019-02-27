<template>
  <v-container id="forgotpassword">
    <v-flex>
      <v-layout class="mb-2" column align-center>
        <router-link to="/login">
          <img class="loginresetimg" alt="" src="../../assets/ed_logo.svg">
        </router-link>
      </v-layout>
      <v-form>
        <v-layout align-center justify-center column fill-height>
          <h3>Please enter your email address below and click the 'Send E-mail' button.</h3>
          <v-text-field class="mt-3 inputloginreset" id="email" v-model="email" type="email" name="email" :rules="emailRules" label="Enter your e-mail address" single-line required/>
          <v-btn class="loginreset" flat v-on:click="forgotPassword">Send E-mail</v-btn>
        </v-layout>
      </v-form>
    </v-flex>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  name: 'BaseResetPassword',
  data() {
    return {
      input: {
        email: ''
      },
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
      ],
    };
  },
  methods: {
    forgotPassword: function (e) {
      this.errors = [];

      if (!this.email) {
        alert('Email is required.');
      }
      else if (!this.validEmail(this.email)) {
        alert('E-mail must be valid');
      }
      else {
        alert('Please check your e-mail for a link to reset your password.')
        this.$router.push("/login")
      }

      if (!this.errors.length) {
        return true
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
  
  h3 {
    margin-top: 5px;
  }
  .inputloginreset {
    width: 40vh;
    margin-top: -10px;
  }
  .loginreset {
    padding: 0;
    margin-left: 257px;
    margin-top: 10px;
    width: 125px;
  }
</style>
