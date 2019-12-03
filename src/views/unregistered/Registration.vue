<template>
  <v-layout class="loginreset-container" row fill-height align-center justify-space-around>
    <v-fade-transition>
      <v-layout v-if="isWaitingForResponse" column justify-center align-center>
        <v-progress-circular
          class="ma-2"
          :rotate="180"
          :size="spinnerSize"
          :width="spinnerWidth"
          :color="primaryColor"
          indeterminate
        ></v-progress-circular>
        <h2 class="headline font-weight-light">Getting info. Please wait...</h2>
      </v-layout>
      <BasicRegDetailsForm
        v-else
        :macAddress="query"
        :titles="titles"
        @submit-account-details="submitAccountDetails"
        @submit-edroplet-config="submitEdropletConfig"
        @submit-edroplet-users="submitEdropletUsers"
      ></BasicRegDetailsForm>
    </v-fade-transition>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import BasicRegDetailsForm from '@/components/sub/SubRegDetails'

export default {
  name: 'Registration',
  components: {
    BasicRegDetailsForm
  },
  props: {
    query: String
  },
  data: function () {
    return {
      isWaitingForResponse: true,
      msg: '',
      primaryColor: 'primary',
      spinnerSize: '250',
      spinnerWidth: '15'
    }
  },
  methods: {
    submitAccountDetails (details) {
      console.log('details: ', details)
    },
    submitEdropletConfig (config) {
      console.log('config: ', config)
    },
    submitEdropletUsers (users) {
      console.log('users: ', users)
    }
  },
  computed: {
    ...mapState({
      titles: state => state.gettingStartedWizard.titles
    })
  },
  mounted () {
    if (!this.query) {
      this.$router.push('/error')
    }

    this.$store.dispatch('getTitles').then(() => {
      this.isWaitingForResponse = false
    })
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
