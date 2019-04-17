<template>
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">New user</v-btn>
      </template>
      <v-stepper v-model="e1" vertical v-for="step in steps" v-bind:key="step.id">
        <v-stepper-step :step="step.id" :complete="e1 > step.id">
          {{ step.title }}
        </v-stepper-step>
        <v-stepper-content :step="step.id">
          <div class="mb-5" v-if="step.id === 1">
            <BasicDetails @onvalidation="validateStep1(...arguments)"/>
          </div>
          <div class="mb-5" v-else-if="step.id === 2">
            <UserDetails @onvalidation="validateStep2(...arguments)"/>
          </div>
          <div class="mb-5" v-else-if="step.id === 3">
            <CarerDetails @onvalidation="validateStep3(...arguments)" @changeAdmin="changeAdmin(...arguments)"/>
          </div>
          <div class="mb-5" v-else-if="step.id === 4">
            <AdminDetails
              v-if="isAdmin"
              @onvalidation="validateStep4(...arguments)"
              :submittedData="submittedData"
            />
            <v-flex class="mb-5" v-else>
              This person is not an admin.
            </v-flex>
          </div>
          <v-flex xs12 sm12 md4 lg4 xl4 offset-md4 offset-lg4 offset-xl4>
          <v-btn block v-show="showBack" @click="step.back()" flat>Back</v-btn>
          <v-btn block color="primary" :disabled="!showContinue" @click="step.continue()">{{ step.next }}</v-btn>
          </v-flex>
          <v-flex xs12 sm12 md4 lg4 xl4 offset-md4 offset-lg4 offset-xl4>
            <v-btn block color="red" dark @click="dialog = false">Cancel</v-btn>
          </v-flex>
        </v-stepper-content>
      </v-stepper>
    </v-dialog>
</template>

<script>
import BasicDetails from '@/components/sub/SubBasicDetails'
import UserDetails from '@/components/sub/SubUserDetails'
import CarerDetails from '@/components/sub/SubCarerDetails'
import AdminDetails from '@/components/sub/SubAdminDetails'

export default {
  components: {
    BasicDetails,
    UserDetails,
    CarerDetails,
    AdminDetails
  },
  methods: {
    validateStep1 (valid, title, givenName, familyName, aka) {
      if (valid) {
        this.showContinue = true
        this.submittedData.title = title
        this.submittedData.givenName = givenName
        this.submittedData.familyName = familyName
        this.submittedData.aka = aka
      } else {
        this.showContinue = false
      }
    },
    validateStep2 (
      valid,
      isUser,
      timeStartUp,
      timeWakeUp,
      otherHydration,
      selectedEDroplet,
      comments
    ) {
      if (valid) {
        this.showContinue = true
        this.submittedData.startUp = timeStartUp
        this.submittedData.wakeUp = timeWakeUp
        this.submittedData.droplets = selectedEDroplet
        this.submittedData.otherHydration = otherHydration
        this.submittedData.comments = comments
        this.submittedData.isEDropletUser = isUser
      } else {
        this.showContinue = false
      }
    },
    validateStep3 (
      valid,
      isAdmin,
      isCarer,
      username,
      phoneNumber,
      emailAddress,
      email,
      sms,
      selectedAlertTypes
    ) {
      if (valid) {
        this.showContinue = true
        this.submittedData.isAdmin = isAdmin
        this.submittedData.isCarer = isCarer
        this.submittedData.username = username
        this.submittedData.phoneNumber = phoneNumber
        this.submittedData.emailAddress = emailAddress
        this.submittedData.email = email
        this.submittedData.sms = sms
        this.submittedData.alertTypes = selectedAlertTypes
      } else {
        this.isAdmin = isAdmin
        this.showContinue = false
      }
    },
    validateStep4 (valid, username, phoneNumber, emailAddress) {
      if (valid) {
        this.submittedData.username = username
        this.submittedData.phoneNumber = phoneNumber
        this.submittedData.emailAddress = emailAddress
        this.showContinue = true
        this.saveData()
      } else {
        this.showContinue = false
      }
    },
    changeAdmin (isAdmin) {
      this.isAdmin = isAdmin
    },
    saveData() {
      this.$store.wizardUserPost = this.submittedData
      this.$store.dispatch('fetchWizardUserPost')
    }
  },
  data () {
    return {
      isAdmin: false,
      e1: 1,
      showContinue: false,
      showBack: false,
      dialog: false,
      submittedData: {
        title: '',
        givenName: '',
        familyName: '',
        aka: '',
        isEDropletUser: false,
        startUp: '',
        wakeUp: '',
        otherHydration: null,
        comments: '',
        droplets: '',
        isCarer: false,
        isAdmin: true,
        username: '',
        phoneNumber: '',
        email: false,
        sms: false,
        emailAddress: '',
        alertTypes: []
      },
      steps: [
        {
          id: 1,
          next: 'continue',
          title: 'Basic details',
          summarize: 'The basic details',
          continue: () => {
            this.e1++
            this.showBack = true
            this.showContinue = false
          },
          back: () => {
            this.showContinue = true
            this.showBack = false
          }
        },
        {
          id: 2,
          next: 'continue',
          title: 'User details',
          summarize: '',
          continue: () => {
            this.e1++
            this.showContinue = false
          },
          back: () => {
            this.e1--
            this.showContinue = true
            this.showBack = false
          }
        },
        {
          id: 3,
          next: 'continue',
          title: 'Carer details',
          summarize: '',
          continue: () => {
            this.e1++
            this.showContinue = true
          },
          back: () => {
            this.e1--
            this.showContinue = true
          }
        },
        {
          id: 4,
          next: 'finish',
          title: 'Admin details',
          summarize: '',
          continue: () => {
            this.dialog = false
          },
          back: () => {
            this.e1--
            this.showContinue = true
          }
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
