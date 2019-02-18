
<template>
  <v-container grid-list-lg>
    <v-layout row align-center justify-center prepend-icon="event">
      <v-icon large>event</v-icon>
      <v-icon @click="subDate()" large>keyboard_arrow_left</v-icon>
      <v-menu ref="menu" v-model="menu" :close-on-content-click="true" :return-value.sync="date">
        <v-text-field slot="activator" v-model="date" readonly></v-text-field>
        <v-date-picker v-model="date" no-title scrollable>
          <v-btn flat color="white" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="white" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      <v-icon @click="addDate()" large>keyboard_arrow_right</v-icon>
    </v-layout>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm12 md8 lg8 xl8>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12 md12 lg12 xl12>
            <v-card dark>
              <charts class="chart" :chartType="'Line'" :lineChartData="lineChartData"/>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm12 md12 lg12 xl12>
            <v-layout row wrap>
              <v-flex d-flex xs12 sm7 md7 lg7 xl7>
                <v-card dark>
                  <charts class="chart" :chartType="'Bar'" :barChartData="barChartData"/>
                </v-card>
              </v-flex>
              <v-flex d-flex xs12 sm5 md5 lg5 xl5>
                <v-card dark>
                  <charts
                    class="chart"
                    :chartType="'Doughnut'"
                    :doughnutChartData="doughnutChartData"
                  />
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm12 md4 lg4 xl4 child-flex>
        <v-card dark>
          <v-card-title class="headline">User select</v-card-title>
          <!-- Insert component here -->
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import charts from "@/components/base/BaseChartComponent";

export default {
  components: {
    charts
  },
  data() {
    return {
      menu: false,
      date: new Date().toISOString().substr(0, 10),
      lineChartData: {
        labels: ["0:00", "01:00", "02:00"],
        labelLineOne: "Liter",
        dataLineOne: [50, 30, 80],
        borderColorLineOne: "rgba(54, 162, 235, 1)", //rgba
        backgroundColorLineOne: "rgba(54, 162, 235, 0.2)", //rgba
        borderWidthLineOne: 2,
        labelLineTwo: "data1",
        dataLineTwo: [60, 60, 60],
        borderColorLineTwo: "rgba(102, 141, 62, 1)", //rgba
        borderWidthLineTwo: 1,
        labelLineThree: "data2",
        dataLineThree: [50, 50, 50],
        borderColorLineThree: "rgba(255, 159, 64, 1)", //rgba
        borderWidthLineThree: 1
      },
      barChartData: {
        labels: [4, 5, 6],
        labelLineOne: "data1",
        dataLineOne: [50, 50, 50],
        borderColorLineOne: "rgba(255, 159, 64, 1)", //rgba
        borderWidthLineOne: 1,
        labelLineTwo: "data2",
        dataLineTwo: [60, 60, 60],
        borderColorLineTwo: "rgba(102, 141, 62, 1)", //rgba
        borderWidthLineTwo: 1,
        labelBarOne: "bar1",
        dataBarOne: [40, 70, 60],
        borderColorBarOne: "rgba(54, 162, 235, 1)", //rgba
        backgroundColorBarOne: "rgba(54, 162, 235, 0.2)", //rgba
        borderWidthBarOne: 1
      },
      doughnutChartData: {
        labels: ["data1", "data2", "data3"],
        dataDoughnut: [30, 10, 60],
        borderColorDoughnut: null, //rgba
        backgroundColorDoughnut: "rgba(54, 162, 235, 1)", //rgba
        borderWidthDoughnut: 1,
        cutoutPercentageDoughnut: 65
      }
    };
  },
  methods: {
    addDate: function() {
      let dateNow = new Date(this.date);
      this.date = dateNow.setDate(new Date(dateNow.getDate() + 1));
      this.date = dateNow.toISOString().substr(0, 10);
    },
    subDate: function() {
      let dateNow = new Date(this.date);
      this.date = dateNow.setDate(new Date(dateNow.getDate() - 1));
      this.date = dateNow.toISOString().substr(0, 10);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
.v-card {
  color: black;
  background-color: $vuetify-secondary;
  padding: 5px, 5px, 5px, 5px;
  max-height: 500px;
}
.chart {
  display: inline;
  margin: 5px;
}
</style>
