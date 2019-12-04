<template>
  <v-container v-if="sanitizedMacAddress" grid-list-lg>
    <v-dialog v-model="duplicateAccount" width="500">
      <v-card>
        <v-card-title primary-title class="headline lighten-2">That username is already in use</v-card-title>

        <v-card-text>Sorry but that username is already in use. Try a different one or append a something to the one you have (e.g. john becomes john1964)</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" flat @click="acknowledgeAccountError">Got it</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-fade-transition>
      <v-layout class="ma-1" row wrap align-center justify-center>
        <v-flex xs12>
          <v-img contain height="200" :src="require('@/assets/ed_logo.svg')" />
        </v-flex>
        <v-layout class="ma-4" column align-center justify-space-around>
          <v-flex shrink>
            <h1 v-if="$vuetify.breakpoint.mdAndUp" class="display-2">{{ sanitizedMacAddress }}</h1>
            <h1 v-if="$vuetify.breakpoint.smAndDown" class="display-1">{{ sanitizedMacAddress }}</h1>
          </v-flex>
          <v-flex shrink>
            <h2
              v-if="$vuetify.breakpoint.mdAndUp"
              class="headline font-weight-light"
            >Lets get you started with your connected droplet</h2>
            <h2
              v-if="$vuetify.breakpoint.smAndDown"
              class="font font-weight-thin text-center"
            >Lets get you started with your connected droplet</h2>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-fade-transition>
    <v-fade-transition>
      <v-stepper v-model="step" vertical>
        <v-stepper-step step="1">Your account</v-stepper-step>
        <v-stepper-content step="1">
          <v-form v-model="stepOne.valid" class="pl-2 pr-2" ref="accountForm" @submit.prevent>
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
              <v-text-field
                label="Email Address"
                v-model="stepTwo.email"
                :rules="stepTwo.emailRules"
              ></v-text-field>
              <v-select v-model="stepTwo.titleId" :items="titleOptions" label="Title" />
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
          <v-btn class="ml-0" color="primary" @click="submitAccountDetails">Create Account</v-btn>
        </v-stepper-content>

        <v-stepper-step step="3">Configure your connected droplet</v-stepper-step>
        <v-stepper-content step="3">
          <v-layout>
            <v-flex xs12 md4></v-flex>
          </v-layout>
          <v-btn class="ml-0" @click="step = 2">Go Back</v-btn>
          <v-btn class="ml-0" color="primary" @click="submitEdropletConfig">Configure</v-btn>
        </v-stepper-content>

        <v-stepper-step step="4">Who is going to use this connected droplet?</v-stepper-step>
        <v-stepper-content step="4">
          <v-layout>
            <v-flex xs12 md4></v-flex>
          </v-layout>
          <v-btn class="ml-0" @click="step = 3">Go Back</v-btn>
          <v-btn class="ml-0" color="primary" @click="submitEdropletUsers">Submit Users</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-fade-transition>
    <v-layout class="mt-4" row fill-height align-center justify-space-around>
      <router-link class="text-center" to="/login">Already have an account? Click here to log in</router-link>
    </v-layout>
  </v-container>
</template>

<script>
import validation from '@/mixins/validation'

export default {
  mixins: [
    validation
  ],
  props: {
    macAddress: String,
    titles: Array,
    validAccountAcquired: false,
    duplicateAccount: false
  },
  data() {
    return {
      sanitizedMacAddress: null,
      step: 1,
      steps: 4,
      stepOne: {
        valid: false,
        username: '',
        password: '',
        passwordRepeat: '',
        duplicateToFix: null,

        usernameRules: [
          v => v !== '' || 'Username is required',
          v => v.length <= 128 || 'Username too long',
          v => v !== this.stepOne.duplicateToFix || 'Username already in use'
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
        titleId: null,
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
      },

      stepThree: {
        config: {}
      }
    }
  },
  methods: {
    sanitizeMacAddress(macAddress) {
      return macAddress
        .split(/-|:/)
        .map(octet => octet.toUpperCase())
        .reduce((address, currentOctet) => address + currentOctet + '-', '')
        .slice(0, -1)
    },
    acknowledgeAccountError() {
      this.$emit('accountErrorAcknowledged')
      this.step = 1
    },
    showAlert(message, route) {
      alert(message)
      this.$router.push(route)
    },
    submitAccountDetails() {
      this.$emit('submitAccountDetails', { ...this.stepOne, ...this.stepTwo })
      this.step = 3
    },
    submitEdropletConfig() {
      this.$emit('submitEdropletConfig', this.stepTwo)
      this.step = 4
    },
    submitEdropletUsers() {
      this.$emit('submitEdropletUsers', this.stepThree)
    }
  },
  mounted() {
    if (!this.macAddress || !this.macAddress.match(this.macAddressRegEx)) {
      return this.showAlert('Invalid Connected Droplet Address.', '/error')
    }

    // Convert from any of the valid MAC address representations to the one we want.
    this.sanitizedMacAddress = this.sanitizeMacAddress(this.macAddress)
  },
  computed: {
    titleOptions() {
      return this.titles.map(title => { return { text: title.longDescription, value: title.titleId } })
    }
  },
  watch: {
    duplicateAccount(newValue, oldValue) {
      if (newValue) { // If duplicateAccount moves to true mark the current username.
        this.stepOne.duplicateToFix = this.stepOne.username
        this.stepOne.username = ''

        this.$nextTick(() => {
          // Abuse nextTick and the fact that we changed the username on the model to force vuetify to re-evaluate the rules.
          this.stepOne.username = this.stepOne.duplicateToFix
          this.$refs.form.validate()
        })
      }
    }
  }
}
</script>
