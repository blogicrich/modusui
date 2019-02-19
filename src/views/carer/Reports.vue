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
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3>Name: {{report.username + " " +report.surname}}</h3>
              <div>Also known as: {{report.aka}}</div>
            </div>
          </v-card-title>
          <v-card-text>
            <div>Current standard target: {{report.currentStandardTarget}}L</div>
            <div>Dietary estimated hydration: {{report.dietaryEstimatedHydration}}L</div>
          </v-card-text>
          <v-card-text>
            <div>Current total adjustments: {{report.currentTotalAdjustments}}L</div>
            <div>Hydration adjustment: {{report.hydrationAdjustment.toFixed(2)}}L</div>
          </v-card-text>
          <v-divider></v-divider>
          <v-list two-line>
            <v-subheader>conditions</v-subheader>
            <v-list-tile v-for="(condition, index) in report.conditions" :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{condition.description}}</v-list-tile-title>
                <v-list-tile-sub-title>{{condition.adjustment}}L</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-subheader>Day Reports</v-subheader>
          <v-card-text v-for="(dayReport, index) in report.dayReports" :key="index">
            <h4>{{convertDateToString(dayReport.selectedDate)}}</h4>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Hydration Target:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{dayReport.hydrationTarget}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Actual Hydration:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{dayReport.hydrationTarget}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Percentage Hydration:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{dayReport.hydrationTarget}}</v-list-tile-content>
              </v-list-tile>
              <h4 class="mt-3">Carer's Comments:</h4>
              <v-list-tile v-for="(comment, index) in dayReport.carerComments" :key="index">
                <v-list-tile-content>{{comment}}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
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
  },
  methods: {
    convertDateToString: date => {
      return (
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      );
    }
  },
  computed: {
    currentHydrationTarget: function() {
      return (
        this.currentStandardTarget -
        (this.dietaryEstimatedHydration + this.currentTotalAdjustments)
      );
    }
  }
};
</script>

