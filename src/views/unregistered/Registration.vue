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
      >
      </v-progress-circular>
      <h2 style="font-size:1em">Getting info. Please wait...</h2>
    </v-layout>
    <BasicRegDetailsForm
      v-if="this.query"
      :query="query"
      @submit-account-details="submitAccountDetails"
      @submit-edroplet-config="submitEdropletConfig"
      @submit-edroplet-users="submitEdropletUsers"
    ></BasicRegDetailsForm>
  </v-fade-transition>
  </v-layout>
</template>

<script>

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
      isWaitingForResponse: false,
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

  },
  mounted () {
    if (!this.query) {
      this.$router.push('/error')
    }
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
