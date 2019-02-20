<template lang="html">
  <v-layout row>
    <slot name="personIconSlot"></slot>
    <v-layout column>
      <v-flex>
        <slot name="nameSlot"></slot>
      </v-flex>
      <v-flex>
        <slot name="hydratationSlot"></slot>
      </v-flex>
      <v-flex>
        <slot name="syncSlot"></slot>
      </v-flex>
    </v-layout>
    <slot name="iconSlot"></slot>
    <slot name="iconBtnSlot"></slot>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./public/scss/main.scss";
</style>
