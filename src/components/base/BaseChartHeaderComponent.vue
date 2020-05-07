<template>
    <v-layout row wrap fill-height align-center justify-center>
      <v-flex grow>
        <v-layout row fill-height align-center justify-center>
          <slot name="header"></slot>
        </v-layout>
      </v-flex>
      <v-flex shrink>
        <v-layout row fill-height align-center justify-end>
          <slot name="tools"></slot>
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
