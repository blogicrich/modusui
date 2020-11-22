<template>
  <v-container class="pa-2">
    <v-layout row align-center justify-center>
      <v-flex grow>
        <slot name="header" />
      </v-flex>
      <v-flex class="pa-0 ma-0" shrink>
        <slot name="tools" />
      </v-flex>
    </v-layout>
  </v-container>
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
