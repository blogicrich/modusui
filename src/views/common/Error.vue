<template>
  <v-layout column fill-height align-center justify-space-around>
    <span
      v-if="$vuetify.breakpoint.mdAndUp"
      class="display-1 text-xs-center error--text"
    >
      An Error has occured.
    </span>
    <router-link to="/login">
      <a class="body-1 text-xs-center primary--text">Back to login</a>
    </router-link>
  </v-layout>
</template>

<script>

export default {
  name: 'Error'
}
</script>
