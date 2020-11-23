<template>
  <v-layout class="loginreset-container" column fill-height align-center justify-space-around>
    <h1
      v-if="$vuetify.breakpoint.mdAndUp"
      class="display-4 text-xs-center text-error"
    >
      An Error has occured.
    </h1>
    <router-link to="/login">
      <a class="display-1 text-xs-center text-primary">Back to login</a>
    </router-link>
  </v-layout>
</template>

<script>

export default {
  name: 'Error',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {
  },
  computed: {

  },
  watch: {

  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style scoped lang="scss">
@import "./public/scss/main.scss";
</style>
