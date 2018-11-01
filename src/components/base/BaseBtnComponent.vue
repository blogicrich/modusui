<template>
  <div>
    <v-btn
      :type="type"
      :to="route"
      :outline="outline"
      :color="btnColor"
      :class="btnClass"
      :block="block"
      :large="large"
    >
      {{ title }}
    </v-btn>
  </div>
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
    large: Boolean
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
