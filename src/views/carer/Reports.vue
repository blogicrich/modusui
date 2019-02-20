<template>
  <v-container grid-list-lg>
    <v-layout row fill-height wrap>
      <v-flex
        lg4
        md6
        sm8
        xs12
        offset-sm2
        offset-md0
        v-for="(report, index) in reports"
        :key="index"
      >
        <baseReportComponent :report="report"></baseReportComponent>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BaseReportComponent from "@/components/base/BaseReportComponent.vue";

export default {
  name: "reports",
  components: {
    BaseReportComponent
  },
  data: function() {
    return {
      reports: [
        {
          username: "User",
          surname: "McUserFace",
          aka: "Alter",
          currentStandardTarget: 2,
          dietaryEstimatedHydration: 0.98,
          currentTotalAdjustments: 0.25 + 0.37,
          hydrationAdjustment: 2 - (0.98 + 0.62),
          conditions: [
            {
              description: "Lorum, descriptum",
              adjustment: 0.25
            },
            {
              description: "There was drinking",
              adjustment: 0.37
            }
          ],
          dayReports: [
            {
              selectedDate: new Date("18 Dec 2019 00:00:00 GMT"),
              hydrationTarget: 2,
              hydrationActual: 2.3,
              percentageHydration: 115,
              carerComments: [
                "Hydration has occurred.",
                "This person can fit so much water",
                "I can't believe they drank"
              ]
            }
          ]
        },
        {
          username: "Dick",
          surname: "high Docterate",
          aka: "Hi drate",
          currentStandardTarget: 2.5,
          dietaryEstimatedHydration: 1.26,
          currentTotalAdjustments: 0.35 + 0.49,
          hydrationAdjustment: 2.5 - (1.26 + 0.84),
          conditions: [
            {
              description: "Quidquid latine dictum sit, altum videtur.",
              adjustment: 0.35
            },
            {
              description: "*glug* *glug*",
              adjustment: 0.49
            }
          ],
          dayReports: [
            {
              selectedDate: new Date("18 Dec 2019 00:00:00 GMT"),
              hydrationTarget: 2,
              hydrationActual: 2.3,
              percentageHydration: 115,
              carerComments: [
                "They downloaded moisture successfully.",
                "They did a glug",
                "They thought they could drink without me knowing, foolish."
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>

