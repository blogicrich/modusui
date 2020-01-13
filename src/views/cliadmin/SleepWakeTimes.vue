<template lang="html">
  <v-container>
    <v-layout row align-center fill-height>
      <BaseViewHeader
        class="mb-2"
        :headerIcon="headerIcon"
        :iconColor="iconColor"
        :headerText="headerText"
        hasDivider
      />
      <v-spacer></v-spacer>
    </v-layout>
    <v-layout row align-center fill-height
    <v-icon></v-icon>
      <h2 class="ml-4 pg-subheader text-primary">eDroplet Wake Up Time</h2>
      <!-- <v-divider
        class="mx-1"
        color="#00a1cd"
        >
      </v-divider> -->
    </v-layout>

    <v-time-picker
      v-model="time"
      full-width
      landscape
      type="month"
      class="mt-3 mx-4"
    ></v-time-picker>
    <h2 class="ml-4 pg-subheader text-primary">eDroplet Sleep Time</h2>
    <v-time-picker
      v-model="time"
      full-width
      landscape
      type="month"
      class="mt-3 mb-3 mx-4"
    ></v-time-picker>
    <!-- <v-divider class="ma-2" color="#00a1cd"></v-divider> -->
  </v-container>
</template>

<script>

import apiLib from '@/services/apiLib'

export default {
  components: {
    // subAlertCard
  },
  computed: {
    user: function () {
      return this.$store.state.eDropletApp.selectedUser.userId
    },
  },
  data () {
    return {
      // BaseViewHeader
      headerIcon: 'local_drink',
      iconColor: this.$vuetify.theme.primary,
      headerText: 'Sleep and Wake Times',
      time: '',
    }
  },
  mounted () {

  },
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
</style>