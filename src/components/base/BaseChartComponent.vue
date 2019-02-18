<template lang="html">
  <v-content>
    <lineChart
      v-if="this.chartType == 'Line'"
      :chart-data="datacollection"
      :options="optionsLine"
    />
    <barChart
      v-else-if="this.chartType == 'Bar'"
      :chart-data="datacollection"
      :options="optionsBar"
    />
    <doughnutChart
      v-else-if="this.chartType == 'Doughnut'"
      :chart-data="datacollection"
      :options="optionsDoughnut"
    />
  </v-content>
</template>

<script>
import lineChart from "@/components/sub/subLineChart";
import barChart from "@/components/sub/subBarChart";
import doughnutChart from "@/components/sub/subDoughnutChart";
import { chartMixin } from "@/mixins/chartOptions";

export default {
  name: "chart-page",
  mixins: [chartMixin],
  props: {
    lineChartData: Object,
    /*
        lineChartData: {
          labels: Array,
          labelLineOne: String,
          dataLineOne: Array,
          borderColorLineOne: String, //rgba
          backgroundColorLineOne: String, //rgba
          borderWidthLineOne: Number,
          labelLineTwo: String,
          dataLineTwo: Array,
          borderColorLineTwo: String, //rgba
          borderWidthLineTwo: Number,
          labelLineThree: String,
          dataLineThree: Array,
          borderColorLineThree: String, //rgba
          borderWidthLineThree: Number
        }
      */
    barChartData: Object,
    /*
        barChartData: {
          labels: Array,
          labelLineOne: String,
          dataLineOne: Array,
          borderColorLineOne: String, //rgba
          borderWidthLineOne: Number,
          labelLineTwo: String,
          dataLineTwo: Array,
          borderColorLineTwo: String, //rgba
          borderWidthLineTwo: Number,
          labelBarOne: String,
          dataBarOne: Array,
          borderColorBarOne: String, //rgba
          backgroundColorBarOne: String, //rgba
          borderWidthBarOne: Number
        }
      */
    doughnutChartData: Object,
    /*
        doughnutChartData: {
          labels: Array,
          dataDoughnut: Array,
          borderColorDoughnut: String, //rgba
          backgroundColorDoughnut: String, //rgba
          borderWidthDoughnut: Number,
          cutoutPercentageDoughnut: Number
        }
      */
    chartType: String
  },
  components: {
    lineChart,
    barChart,
    doughnutChart
  },
  data() {
    return {
      datacollection: null,
      optionsLine: null,
      optionsBar: null,
      optionsDoughnut: null
    };
  },
  mounted() {
    setTimeout(() => {
      switch (this.chartType) {
        case "Line":
          this.fillDataLine();
          break;
        case "Bar":
          this.fillDataBar();
          break;
        case "Doughnut":
          this.fillDataDoughnut();
          break;
      }
    }, 400);
  }
};
</script>

<style lang="css" scoped>

</style>
