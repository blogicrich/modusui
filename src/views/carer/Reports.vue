<template>
  <v-container grid-list-lg>
    <v-layout row fill-height justify-center wrap>
      <v-flex xs10 v-for="(report, index) in reports" :key="index">
        <BaseReport :tables="report.tables"></BaseReport>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BaseReport from "@/components/base/BaseReportComponent.vue";

export default {
  name: "reports",
  components: {
    BaseReport
  },
  data: function() {
    return {
      reports: [
        {
          tables: [
            {
              type: "header",
              items: [
                {
                  title: "Name",
                  data: "Test Datson"
                },
                {
                  title: "AKA",
                  data: "Notrelnam"
                },
                {
                  title: "Current Standard Target",
                  data: "2.5"
                },
                {
                  title: "Dietary estimated hydration",
                  data: "1.26"
                },
                {
                  title: "Current Total Adjustments",
                  data: "0.84"
                },
                {
                  title: "Hydration Adjustment",
                  data: "0.4"
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>

