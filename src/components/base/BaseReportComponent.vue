<template>
  <v-card>
    <v-container>
    <div v-for="(table, index) in tables" :key="index">
      <v-divider v-if="index > 0"></v-divider>
      <BaseReportTable :table="table"></BaseReportTable>
    </div>
    </v-container>
  </v-card>
</template>

<script>
import BaseReportTable from '@/components/base/BaseReportTableComponent.vue'

export default {
  name: "BaseReportComponent",
  components: {
    BaseReportTable
  },
  props: {
    tables: Array,
  },
  methods: {
    convertDateToString: date => {
      return (
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      );
    }
  }
};
</script>
