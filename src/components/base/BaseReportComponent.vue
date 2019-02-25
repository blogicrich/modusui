<template>
  <v-card>
    <div v-for="(tab, index) in tabs" :key="index">
      <v-divider v-if="index > 0" class="my-3"></v-divider>
      <v-subheader v-if="tab.subheader">{{tab.subheader}}</v-subheader>
      <BaseReportTable :type="tab.type" :table="tab.table"></BaseReportTable>
    </div>
  </v-card>
</template>

<script>
import BaseReportTable from "@/components/base/BaseReportTableComponent.vue";

export default {
  name: "BaseReportComponent",
  components: {
    BaseReportTable
  },
  props: {
    tabs: Array
  }
};
</script>
