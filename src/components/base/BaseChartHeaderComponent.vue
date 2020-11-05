<template>
  <v-layout row wrap align-center justify-center>
    <v-flex grow>
      <v-layout row align-center justify-center>
        <slot name="header" />
      </v-layout>
    </v-flex>
    <v-flex shrink>
      <v-layout row align-center justify-end>
        <slot name="tools" />
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'BaseChartHeader',
  props: {
    header: String
  }
}
</script>

<style lang="scss" scoped>

</style>
