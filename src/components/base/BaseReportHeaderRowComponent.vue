<template>
  <v-layout row wrap>
    <v-flex
      offset-xs1
      offset-sm0
      xs10
      sm6
      md4
      lg3
      v-for="(column, index) in row.headers"
      :key="index"
    >
      <h4>{{row.headers[index]}}:</h4>
      <span class="ml-2">{{Object.values(row.items)[index]}}</span>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'BaseReportHeaderRow',
  props: {
    row: {
      align: String,
      headers: Array,
      items: Array
    }
  }
}
</script>
