<template>
  <v-container grid-list-lg>
    <v-layout row fill-height justify-center wrap>
      <v-flex xs10 v-for="(report, index) in reports" :key="index">
        <BaseReport :tabs="report.tabs"></BaseReport>
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
          tabs: [
            {
              type: "header",
              table: {
                headers: [
                  "Name",
                  "AKA",
                  "Current Standard Target",
                  "Dietary estimated hydration",
                  "Current Total Adjustments",
                  "Hydration Adjustment"
                ],
                items: [
                  "Test Datson",
                  "Notrelnam",
                  "2.5",
                  "1.26",
                  "0.84",
                  "0.4"
                ]
              }
            },
            {
              subheader: "Conditions",
              type: "table",
              table: {
                headers: [
                  { text: "Description", value: "description", sortable: false },
                  { text: "Adjustment (L)", value: "adjustment", sortable: false },
                ],
                items: [
                  [
                    "Lorum Ipsum",
                    "0.25"
                  ],
                  [
                    "They drank",
                    "0.37"
                  ],
                  [
                    "quidquid latine dictum sit altum videtur",
                    "0.32"
                  ]
                ]
              }
            },
            {
              subheader: "Day Reports",
              type: "table",
              table: {
                align: "right",
                headers: [
                  { text: "Date", value: "date", sortable: false },
                  { text: "Hydration Target (L)", value: "hydrationTarget", sortable: false },
                  { text: "Actual Hydration (L)", value: "hydrationActual", sortable: false },
                  { text: "Hydration Percentage (%)", value: "hydrationPercentage", sortable: false },
                  { text: "Carer's Comments", value: "carerComments", sortable: false}
                ],
                items: [
                  [
                    "19th Dec 2018",
                    "2.0",
                    "2.3",
                    "115%",
                    "Mr. Datson drank various liquids."
                  ],
                  [
                    "18th Dec 2018",
                    "2.0",
                    "2.1",
                    "105%",
                    "Mr. Datson succeeded in hydrating an ample amount."
                  ],
                  [
                    "17th Dec 2018",
                    "2.2",
                    "2.0",
                    "91%",
                    "Mr. Datson did not drink enough today"
                  ]
                ]
              }
            },
          ]
        },
        {
          tabs: [
            {
              type: "header",
              table: {
                headers: [
                  "Name",
                  "AKA",
                  "Current Standard Target",
                  "Dietary estimated hydration",
                  "Current Total Adjustments",
                  "Hydration Adjustment",
                  "table"
                ],
                items: [
                  "Test Datson",
                  "Notrelnam",
                  "2.5",
                  "1.26",
                  "0.84",
                  "0.4"
                ]
              }
            }
          ]
        }
      ]
    };
  }
};
</script>

