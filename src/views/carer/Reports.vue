<template>
  <v-container>
    <v-card v-for="report in reports" v-bind:key="report._id">
      <v-card-title primary-title>
        <div>
          <h3>Name: {{report.username + " " +report.surname}}</h3>
          <div>Also known as: {{report.aka}}</div>
        </div>
      </v-card-title>
      <v-card-text>
        hello
      </v-card-text>
    </v-card>
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
          conditions: [
            {
              description: "Lorum, descriptum",
              adjustment: 0.25
            },
            {
              description: "They drank, I guess.",
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
                "They overdrank.",
                "This person can fit so much water",
                "I can't believe they drank"
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    currentTotalAdjustments: function() {
      let summation = 0;
      for (let i = 0; this.conditions.length; i++) {
        summation += this.condition[i].adjustment;
      }
      return summation;
    },
    currentHydrationTarget: function() {
      return (
        this.currentStandardTarget -
        (this.dietaryEstimatedHydration + this.currentTotalAdjustments)
      );
    }
  }
};
</script>

