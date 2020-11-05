<template>
  <v-flex>
    <v-btn
      :type="type"
      :to="route"
      :outline="outline"
      :color="btnColor"
      :class="btnClass"
      :block="block"
      :large="large"
      :fab="fab"
      :small="small"
    >
      <v-icon v-if="icon">{{ btnIcon }}</v-icon>
      {{ title }}
    </v-btn>
  </v-flex>
</template>

<script>

export default {
  name: 'BaseButtonComponent',
  props: {
    title: String,
    type: String,
    route: String,
    outline: Boolean,
    btnColor: String,
    btnClass: String,
    block: Boolean,
    large: Boolean,
    fab: Boolean,
    small: Boolean,
    icon: Boolean,
    btnIcon: String
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
