<template>
  <v-container grid-list-lg>
   <v-layout row fill-height wrap>
      <v-flex lg4 md6 sm8 xs12 offset-sm2 offset-md0 v-for="report in reports" v-bind:key="report">
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
            <v-list-tile v-for="(condition, index) in report.conditions" v-bind:key="index">
              <v-list-tile-content> 
                <v-divider v-if="index > 0" :key="index" :inset="true"></v-divider>
                <v-list-tile-title>{{condition.description}}</v-list-tile-title>
                <v-list-tile-sub-title>{{condition.adjustment}}L</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          
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
              selectedDate: Date.parse("18 Dec 2019 00:00:00 GMT"),
              hydrationTarget: 2,
              hydrationActual: 2.6,
              percentageHydration: 115,
              carerComments: [
                "Hydration has occurred.",
                "This person can fit so much water",
                "I can't believe they drank",
                "They thought they could drink without me knowing, foolish",
              ]
            }
          ]
        },{
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
              selectedDate: Date.parse("18 Dec 2019 00:00:00 GMT"),
              hydrationTarget: 2,
              hydrationActual: 2.6,
              percentageHydration: 115,
              carerComments: [
                "Hydration has occurred.",
                "This person can fit so much water",
                "I can't believe they drank",
                "They thought they could drink without me knowing, foolish",
              ]
            }
          ]
        },
      ]
    };
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

