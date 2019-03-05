<template lang="html">
  <v-layout fill-height align-center>
    <v-flex shrink>
      <v-layout align-center justify-center fill-height>
        <slot name="leftSlot"></slot>
      </v-layout>
    </v-flex>
    <v-flex grow>
      <v-layout column fill-height justify-center align-start>
        <slot name="middleFirstNameSlot"></slot>
        <slot name="middleSecondNameSlot"></slot>
        <slot name="middleThirdNameSlot"></slot>
      </v-layout>
    </v-flex>
    <v-flex shrink>
      <v-layout justify-space-around fill-height align-center>
        <slot name="firstRightSlot"></slot>
        <slot name="secondRightSlot"></slot>
        <slot name="thirdRightSlot"> </slot>
      </v-layout>
    </v-flex>
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
