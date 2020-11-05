<template>
  <v-container id="forgotpassword">
    <v-fade-transition>
      <v-flex>
        <v-layout class="mb-2" column align-center>
          <router-link to="/login">
            <img class="loginresetimg" alt="" src="../../assets/ed_logo.svg">
          </router-link>
        </v-layout>
        <v-form ref="forgotpwform" @submit.prevent="checkEmail">
          <v-layout align-center justify-center column fill-height>
            <h3
              v-if="$vuetify.breakpoint.mdAndUp"
              class="text-center"
            >
              {{ instructions }}
            </h3>
            <h4
              v-if="$vuetify.breakpoint.smAndDown"
              class="text-center"
            >
              {{ instructions }}
            </h4>
            <v-text-field
              class="mt-3 inputloginreset"
              ref="email" :hint="hint"
              v-model="email"
              type="email"
              name="email"
              :rules="emailRules"
              label="Enter your e-mail address"
              single-line
              clearable
            />
            <v-btn
              class="loginreset"
              :disabled="email === ''"
              flat
              round
              @click="checkEmail"
            >
              Send E-mail
            </v-btn>
          </v-layout>
        </v-form>
      </v-flex>
    </v-fade-transition>
  </v-container>
</template>

<script>

import validation from '@/mixins/validation'

export default {
  name: 'BaseResetPassword',
  mixins: [
    validation
  ],
  data () {
    return {
      email: '',
      emailRules: [
        (v) => !!v || 'Email address is required',
        (v) => this.emailRegEx.test(v) || 'Email address must be valid',
        (v) => v.length <= 256 || 'Email address too long'
      ],
      hint: 'Please enter valid email address',
      instructions: 'Please enter your email address below and click the "Send E-mail" button.'
    }
  },
  methods: {
    checkEmail: function () {
      if (!this.email || !this.$refs.forgotpwform.validate()) {
        alert('Valid email is required.')
      } else {
        // Implement successful email submission
        alert('Please check your e-mail for a link to reset your password.')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
