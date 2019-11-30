<template>
  <v-container grid-list-lg>
    <h1 class="display-2">Hi there!</h1>
    <h2 class="mb-4 headline font-weight-light">Lets get you started with your connected droplet</h2>

    <v-stepper v-model="step" vertical>
      <v-stepper-step step="1">Your account</v-stepper-step>
      <v-stepper-content step="1">
        <v-form v-model="stepOne.valid" class="pl-2 pr-2" @submit.prevent>
          <v-layout>
            <v-flex xs12 md4>
              <v-text-field
                label="Username"
                hint="A nickname, your real name or something made up"
                v-model="stepOne.username"
                :rules="stepOne.usernameRules"
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                hint="Something no one can guess!"
                v-model="stepOne.password"
                :rules="stepOne.passwordRules"
              ></v-text-field>
              <v-text-field
                label="Repeat your password"
                type="password"
                v-model="stepOne.passwordRepeat"
                :rules="stepOne.passwordRepeatRules"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-btn
            color="primary"
            class="ml-0"
            type="submit"
            :disabled="!stepOne.valid"
            @click="step = 2"
          >Next</v-btn>
          <router-link to="/login">Already have an account? Click here to log in</router-link>
        </v-form>
      </v-stepper-content>

      <v-stepper-step step="2">Your account details</v-stepper-step>
      <v-stepper-content step="2">
        <v-layout>
          <v-flex xs12 md4>
            <v-text-field label="Email Address" v-model="stepTwo.email" :rules="stepTwo.emailRules"></v-text-field>
            <v-text-field
              label="Given Name"
              v-model="stepTwo.givenName"
              :rules="stepTwo.givenNameRules"
            ></v-text-field>
            <v-text-field
              label="Family Name"
              v-model="stepTwo.familyName"
              :rules="stepTwo.familyNameRules"
            ></v-text-field>
            <v-text-field
              label="Saluation (Optional)"
              v-model="stepTwo.salutation"
              :rules="stepTwo.salutationRules"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn class="ml-0" @click="step = 1">Go Back</v-btn>
        <v-btn class="ml-0" color="primary">Create Account</v-btn>
      </v-stepper-content>

      <v-stepper-step step="3">Configure your connected droplet</v-stepper-step>

      <v-stepper-step step="4">Who is going to use this connected droplet?</v-stepper-step>
    </v-stepper>
  </v-container>
</template>

<script>
import validation from '../../mixins/validation'

const MAC_ADDRESS_REGEX = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

export default {
  data () {
    return {
      macAddress: null,
      step: 1,

      stepOne: {
        valid: false,
        username: '',
        password: '',
        passwordRepeat: '',

        usernameRules: [
          v => v !== '' || 'Username is required',
          v => v.length <= 128 || 'Username too long'
        ],
        passwordRules: [
          v => v !== '' || 'A password is required',
          v => v.length >= 8 || 'This password is too short',
          v => v.length <= 72 || 'This password is too long'
        ],
        passwordRepeatRules: [
          v => v !== '' || 'Please repeat your password',
          v => v === this.stepOne.password || 'Passwords do not match'
        ]
      },

      stepTwo: {
        email: '',
        givenName: '',
        familyName: '',
        salutation: '',

        emailRules: [
          v => v !== '' || 'An email address is required',
          v => this.emailRegEx.test(v) || 'Invalid email address',
          v => v.length <= 256 || 'Email address too long'
        ],

        givenNameRules: [
          v => v !== '' || 'Your given name is required',
          v => v.length <= 128 || 'Given name is too long'
        ],

        familyNameRules: [
          v => v !== '' || 'Your family name is required',
          v => v.length <= 128 || 'Family name is too long'
        ],

        salutationRules: [
          v => v.length <= 128 || 'Salutation is too long'
        ]
      }
    }
  },
  mounted () {
    const unsanitizedMacAdress = this.$route.query.macAddress

    if (!unsanitizedMacAdress || !unsanitizedMacAdress.match(MAC_ADDRESS_REGEX)) {
      alert('Invalid Connected Droplet Address.')
      this.$router.push('/')
      return
    }

    // Convert from any of the valid MAC address representations to the one we want.
    this.macAddress = unsanitizedMacAdress
      .split(/-|:/)
      .map(octet => octet.toUpperCase())
      .reduce((address, currentOctet) => address + currentOctet + '-', '')
      .slice(0, -1)
  },
  mixins: [
    validation
  ]
}
</script>
