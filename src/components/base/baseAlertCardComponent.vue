<template lang="html">
  <v-layout column>
      <v-layout>
        <slot name="firstSlot"></slot>
      </v-layout>
      <v-layout fill-height align-center>
        <v-flex xs4>
          <v-layout justify-center>
            <slot name="firstRightSlot"></slot>
          </v-layout>
        </v-flex>
        <v-flex grow>
          <v-layout fill-height align-center>
            <slot name="secondRightSlot"></slot>
          </v-layout>
        </v-flex>
        <v-flex shrink>
          <slot name="thirdRightSlot"> </slot>
        </v-flex>
      </v-layout>
  </v-layout>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
</style>
