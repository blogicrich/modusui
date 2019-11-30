<template>
  <v-layout class="loginreset-container" row fill-height align-center justify-space-around>
    <h1>{{ query }}</h1>
    <BasicRegDetailsForm
      :mac="query"
    ></BasicRegDetailsForm>
  </v-layout>
</template>

<script>

import BasicRegDetailsForm from '@/components/sub/SubRegDetails'

export default {
  name: 'Registration',
  components: {
    BasicRegDetailsForm
  },
  data: function () {
    return {
      query: this.$route.query.mac,
      msg: '',
      primaryColor: 'primary',
      spinnerSize: '50',
      spinnerWidth: '3'
    }
  },
  methods: {
    async submitRegDetails(item) {

    }
  },
  computed: {

  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
