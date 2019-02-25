<template>
  <v-layout row wrap v-if="table.type === `header`">
    <v-flex
      offset-xs1 offset-sm0 xs10 sm6 md4 lg3
      v-for="(item, index) in table.items"
      :key="index"
    >{{item.title}}: {{item.data}}</v-flex>
  </v-layout>
  <v-data-table v-else-if="table.type === `table`"></v-data-table>
</template>

<script>
export default {
  name: "BaseReportTable",
  props: {
    table: {
      type: String,
      items: Array
    }
  }
};
</script>
