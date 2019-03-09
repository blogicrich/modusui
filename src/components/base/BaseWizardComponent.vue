<template>
  <v-dialog v-model="dialog" >
    <template v-slot:activator="{ on }">
      <v-btn color="red lighten-2" dark v-on="on">
        Click Me
      </v-btn>
    </template>
        <v-stepper v-model="e1" vertical v-for="step in steps" v-bind:key="step.id">
        <v-stepper-step :step="step.id" :complete="e1 > step.id">
          {{ step.title }}
          <small>{{ step.summarize }}</small>
        </v-stepper-step>
          <v-stepper-content :step="step.id">
            <v-card class="mb-5" v-if="step.id === 1">
              <BasicDetails @onvalidation="validateStep1(...arguments)" />
            </v-card>
            <v-card class="mb-5" v-else-if="step.id === 2">
              <UserDetails @onvalidation="validateStep2(...arguments)" />
            </v-card>
            <v-card class="mb-5" v-else-if="step.id === 3">
              <CarerDetails @onvalidation="validateStep3(...arguments)" />
            </v-card>
            <v-card class="mb-5" v-else-if="step.id === 4">
              <AdminDetails @onvalidation="validateStep4(...arguments)" :submittedData="submittedData" />
            </v-card>
            <v-btn v-show="showBack" @click="step.back()" flat>Back</v-btn>
            <v-btn color="primary" :disabled="!showContinue" @click="step.continue()">{{ step.next }}</v-btn>
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
        console.log(this.submittedData)
      } else {
        this.showContinue = false
        console.log('NOT VALID')
      }
    },
    validateStep2(valid, isUser, timeStartUp, timeWakeUp, otherHydration, selectedEDroplet, comments) {
      if (valid) {
        this.showContinue = true
        this.submittedData.startUp = timeStartUp
        this.submittedData.wakeUp = timeWakeUp
        this.submittedData.droplets = selectedEDroplet
        this.submittedData.otherHydration = otherHydration
        this.submittedData.comments = comments
        this.submittedData.isEDropletUser = isUser
        console.log(this.submittedData)
      } else {
        this.showContinue = false
        console.log('NOT VALID')
      }
    },
    validateStep3 (valid, isAdmin, isCarer, username, phoneNumber, emailAddress, email, sms, selectedAlertTypes) {
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
        console.log(this.submittedData)
      } else {
        this.showContinue = false
        console.log('NOT VALID')
      }
    },
    validateStep4(valid, username, phoneNumber, emailAddress) {
      if (valid) {
        this.submittedData.username = username
        this.submittedData.phoneNumber = phoneNumber
        this.submittedData.emailAddress = emailAddress
        this.showContinue = true
        console.log(this.submittedData)
      } else {
        this.showContinue = false
        console.log('NOT VALID')
      }
    }
  },
  data () {
    return {
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
        isAdmin: false,
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
