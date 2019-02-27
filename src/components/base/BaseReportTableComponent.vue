<template>
  <v-container v-if="type === `header`">
    <v-layout row wrap>
      <v-flex
        offset-xs1
        offset-sm0
        xs10
        sm6
        md4
        lg3
        v-for="(row, index) in table.items"
        :key="index"
      ><h4>{{table.headers[index]}}:</h4> <span class="ml-2">{{table.items[index]}}</span></v-flex>
    </v-layout>
  </v-container>

  <v-data-table v-else-if="type === `table`" :headers="table.headers" :items="table.items">
    <template slot="items" slot-scope="props">
      <td
        :class="table.align ? 'text-xs-' + table.align : ''"
        v-for="(data, index) in props.item"
        :key="index"
      >{{data}}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "BaseReportTable",
  props: {
    type: String,
    table: {
      align: String,
      headers: Array,
      items: Array
    }
  }
};
</script>
