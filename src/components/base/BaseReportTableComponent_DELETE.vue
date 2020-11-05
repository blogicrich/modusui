<template>
  <v-container v-if="type === `header`">
    <BaseReportHeaderRow v-for="(row, index) in table.rows" :key="index" :row="row" />
  </v-container>

  <v-data-table v-else-if="type === `table`" :headers="table.headers" :items="table.items">
    <template slot="items" slot-scope="props">
      <td
        :class="table.align ? 'text-xs-' + table.align : ''"
        v-for="(data, index) in props.item"
        :key="index"
      >
        {{ data }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
import BaseReportHeaderRow from '@/components/base/BaseReportHeaderRowComponent'

export default {
  name: 'BaseReportTable',
  components: {
    BaseReportHeaderRow
  },
  props: {
    type: String,
    table: {
      align: String,
      rows: Array,
      headers: Array,
      items: Array
    }
  }
}
</script>
