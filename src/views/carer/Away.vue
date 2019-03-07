<template>
  <v-container>
    <h1>{{legend}}</h1>
    <v-layout>
      <v-card v-for="(awayPeriod, index) in awayPeriods" :key="index">
        <v-container>
          <h3>{{formatDateAsString(awayPeriod.startDate)}} - {{formatDateAsString(awayPeriod.endDate)}}</h3>
          <v-checkbox
            color="primary"
            v-model="awayPeriod.drinksAccounted"
            label="Drinks Accounted?"
          ></v-checkbox>
        </v-container>
      </v-card>
    </v-layout>
  </v-container>
  <!-- <dataTable :headers="headers" :addBtnTitle="btnTitle" :primaryColor="primaryColor" items=""></dataTable> -->
</template>

<script>
import store from "@/store";
// import dataTable from '@/components/base/BaseDataTableComponent'

export default {
  components: {
    // dataTable
  },
  data: () => ({
    legend: "Away Periods",
    awayPeriods: [
      {
        startDate: new Date("March 8, 2019 09:30:00"),
        endDate: new Date("March 10, 2019 16:30:00"),
        drinksAccounted: true
      },
      {
        startDate: new Date("March 6, 2019 11:15:00"),
        endDate: new Date("March 12, 2019 19:00:00"),
        drinksAccounted: false
      },
      {
        startDate: new Date("February 26, 2001 12:00:00"),
        endDate: new Date("December 9, 2002 12:00:00"),
        drinksAccounted: false
      },
    ]
    // headers: [{ text: 'Description', align: 'left', sortable: true, value: 'description', cellType: 'tb', hidden: false, editable: true },],
    // btnTitle: "Record Time Away",
    // primaryColor: "primary"
  }),
  methods: {
    formatDateAsString: function(date) {
      const options = {
        timeZone: "UTC",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      };
      let dateString = date.toLocaleString("en-GB", options);
      return dateString;
    }
  }
};
</script>
