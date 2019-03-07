<template>
  <v-container fluid>
    <v-snackbar
        v-model="snack"
        bottom
        :timeout="timeout"
        :color="snackColor"
        y="bottom"
        auto-height
    >
        {{ snackText }}
        <v-btn flat @click="$emit('close-snackbar')">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>

export default {
  name: 'BaseAppSnackbar',
  props: {
    snackColor: String,
    snackText: String,
    snack: Boolean,
    timeout: Number
  }
}
</script>
<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>