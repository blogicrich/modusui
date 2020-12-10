<template>
  <v-container v-if="macAddress" grid-list-lg>
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
            <h1 v-if="$vuetify.breakpoint.mdAndUp" class="display-2">{{ macAddress }}</h1>
            <h1 v-if="$vuetify.breakpoint.smAndDown" class="display-1">{{ macAddress }}</h1>
          </v-flex>
          <v-flex shrink>
            <h2
              v-if="$vuetify.breakpoint.mdAndUp"
              class="headline font-weight-light"
            >
              Lets get you started with your Connected Droplet
            </h2>
            <h2
              v-if="$vuetify.breakpoint.smAndDown"
              class="font font-weight-thin text-xs-center"
            >
              Lets get you started with your Connected Droplet
            </h2>
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
                <sub-credentials-fields
                  v-model="stepOne.accountDetails"
                  :duplicateToFix="stepOne.duplicateToFix"
                />
              </v-flex>
            </v-layout>
            <v-btn
              color="primary"
              class="ml-0"
              type="submit"
              :disabled="!stepOne.valid"
              @click="step = 2"
            >
              Next
            </v-btn>
            <router-link to="/login">Already have an account? Click here to log in</router-link>
          </v-form>
        </v-stepper-content>

        <v-stepper-step step="2">Your account details</v-stepper-step>
        <v-stepper-content step="2">
          <v-form v-model="stepTwo.valid" class="pl-2 pr-2" @submit.prevent>
            <v-flex xs12 md4>
              <sub-person-details-fields v-model="stepTwo.personalDetails" :titles="titles" />
            </v-flex>
            <v-btn class="ml-0" @click="step = 1">Go Back</v-btn>
            <v-btn
              class="ml-0"
              color="primary"
              @click="submitAccountDetails"
              type="submit"
              :disabled="!stepTwo.valid"
            >
              Create Account
            </v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-step step="3">Configure your Connected Droplet</v-stepper-step>
        <v-stepper-content step="3">
          <v-form v-model="stepThree.valid" class="pl-2 pr-2" @submit.prevent>
            <v-flex xs12 md4>
              <v-text-field
                v-model="stepThree.friendlyName"
                label="Connected Droplet Name (Optional)"
                hint="Something that helps you identify this droplet (e.g. Jim's Connected Droplet)"
                :placeholder="macAddress"
                counter="45"
              />
              <v-btn
                class="ml-0"
                color="primary"
                type="submit"
                @click="submitEdropletConfig"
                :disabled="!stepThree.valid"
              >
                Configure
              </v-btn>
            </v-flex>
          </v-form>
        </v-stepper-content>

        <v-stepper-step step="4">Finishing up</v-stepper-step>
        <v-stepper-content step="4">
          <v-card flat>
            <v-card-title>
              All set! You can continue configuring your account on the admin control panel.
            </v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" to="/landing">to admin control panel<v-icon>launch</v-icon></v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper>
    </v-fade-transition>
    <v-layout class="mt-4" row fill-height align-center justify-space-around>
      <router-link class="text-xs-center" to="/login">Already have an account? Click here to log in</router-link>
    </v-layout>
  </v-container>
</template>

<script>
import validation from '../../mixins/validation'
import SubPersonDetailsFields from './SubPersonDetailsFields'
import SubCredentialsFields from './SubCredentialsFields'

export default {
  props: {
    macAddress: String,
    titles: Array,
    validAccountAcquired: Boolean,
    duplicateAccount: Boolean
  },
  data () {
    return {
      step: 1,
      steps: 4,
      stepOne: {
        valid: false,
        duplicateToFix: null,
        accountDetails: {
          username: '',
          email: '',
          mobileNo: '',
          password: ''
        }
      },

      stepTwo: {
        valid: false,
        personalDetails: {
          titleId: null,
          givenName: '',
          familyName: '',
          salutation: ''
        }
      },

      stepThree: {
        valid: false,
        friendlyName: '',

        friendlyNameRules: [
          v => v.length <= 45 || 'Connected droplet name too long'
        ]
      }
    }
  },
  methods: {
    acknowledgeAccountError () {
      this.$emit('accountErrorAcknowledged')
      this.step = 1
    },
    submitAccountDetails () {
      this.$emit('submitAccountDetails', {
        email: this.stepTwo.email,
        ...this.stepOne.accountDetails,
        ...this.stepTwo.personalDetails
      })
      this.step = 3
    },
    submitEdropletConfig () {
      this.$emit('submitEdropletConfig', {
        friendlyName: this.stepThree.friendlyName,
        macAddress: this.macAddress
      })
      this.step = 4
    }
  },
  watch: {
    duplicateAccount (newValue, oldValue) {
      if (newValue) { // If duplicateAccount moves to true mark the current username.
        this.stepOne.duplicateToFix = this.stepOne.accountDetails.username
      }
    }
  },
  mixins: [
    validation
  ],
  components: {
    SubPersonDetailsFields,
    SubCredentialsFields
  }
}
</script>
