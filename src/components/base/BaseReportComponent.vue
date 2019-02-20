<template>
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
          <v-list-tile-content class="align-end">{{dayReport.hydrationTarget}}L</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Actual Hydration:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{dayReport.hydrationActual}}L</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Percentage Hydration:</v-list-tile-content>
          <v-list-tile-content class="align-end">{{dayReport.percentageHydration}}%</v-list-tile-content>
        </v-list-tile>
        <h4 class="mt-3">Carer's Comments:</h4>
        <v-list-tile v-for="(comment, index) in dayReport.carerComments" :key="index">
          <v-list-tile-content>{{comment}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "BaseReportComponent",

  props: {
    report: {
      username: String,
      surname: String,
      aka: String,
      currentStandardTarget: Number,
      dietaryEstimatedHydration: Number,
      currentTotalAdjustments: Number,
      hydrationAdjustment: Number,
      conditions: Array,
      dayReports: Array
    }
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
