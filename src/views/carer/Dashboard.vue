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
          <v-flex d-flex xs12 sm12 md12 lg12 xl12 @click="openDialog('Line')">
            <v-card dark>
              <charts class="chart" :chartType="'Line'" :lineChartData="lineChartData"/>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm12 md12 lg12 xl12>
            <v-layout row wrap>
              <v-flex d-flex xs12 sm7 md7 lg7 xl7 @click="openDialog('Bar')">
                <v-card dark>
                  <charts class="chart" :chartType="'Bar'" :barChartData="barChartData"/>
                </v-card>
              </v-flex>
              <v-flex d-flex xs12 sm5 md5 lg5 xl5 @click="openDialog('Doughnut')">
                  <v-card dark>
                    <charts class="chart" :chartType="'Doughnut'" :doughnutChartData="doughnutChartData"/>
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

    <v-dialog v-model="lineDialog">
      <v-flex d-flex xs12 sm12 md12 lg12 xl12>
        <v-card dark>
          <charts class="chart" :chartType="'Line'" :lineChartData="lineChartData"/>
          <v-card-actions>
            <v-btn color="green darken-1" flat="flat" @click="lineDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-dialog>

    <v-dialog v-model="doughnutDialog" max-width="750px">
      <v-card dark>
        <charts class="chart" :chartType="'Doughnut'" :doughnutChartData="doughnutChartData"/>
        <v-card-actions>
          <v-btn color="green darken-1" flat="flat" @click="doughnutDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="barDialog">
      <v-card dark>
        <charts class="chart" :chartType="'Bar'" :barChartData="barChartData"/>
        <v-card-actions>
          <v-btn color="green darken-1" flat="flat" @click="barDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import charts from '@/components/base/BaseChartComponent'

export default {
  components: {
    charts
  },
  data () {
    return {
      lineDialog: false,
      barDialog: false,
      doughnutDialog: false,
      menu: false,
      date: new Date().toISOString().substr(0, 10),
      lineChartData: {
        labels: ['0:00', '01:00', '02:00'],
        labelLineOne: 'Liter',
        dataLineOne: [50, 30, 80],
        borderColorLineOne: 'rgba(54, 162, 235, 1)', // rgba
        backgroundColorLineOne: 'rgba(54, 162, 235, 0.2)', // rgba
        borderWidthLineOne: 2,
        labelLineTwo: 'data1',
        dataLineTwo: [60, 60, 60],
        borderColorLineTwo: 'rgba(102, 141, 62, 1)', // rgba
        borderWidthLineTwo: 1,
        labelLineThree: 'data2',
        dataLineThree: [50, 50, 50],
        borderColorLineThree: 'rgba(255, 159, 64, 1)', // rgba
        borderWidthLineThree: 1
      },
      barChartData: {
        labels: [4, 5, 6],
        labelLineOne: 'data1',
        dataLineOne: [50, 50, 50],
        borderColorLineOne: 'rgba(255, 159, 64, 1)', // rgba
        borderWidthLineOne: 1,
        labelLineTwo: 'data2',
        dataLineTwo: [60, 60, 60],
        borderColorLineTwo: 'rgba(102, 141, 62, 1)', // rgba
        borderWidthLineTwo: 1,
        labelBarOne: 'bar1',
        dataBarOne: [40, 70, 60],
        borderColorBarOne: 'rgba(54, 162, 235, 1)', // rgba
        backgroundColorBarOne: 'rgba(54, 162, 235, 0.2)', // rgba
        borderWidthBarOne: 1
      },
      doughnutChartData: {
        labels: ['data1', 'data2', 'data3'],
        dataDoughnut: [30, 10, 60],
        borderColorDoughnut: 'rgba(255, 255, 255, 1)', // rgba
        backgroundColorDoughnut: ['rgba(54, 162, 235, 0.5)', 'rgba(54, 162, 235, 0.7)', 'rgba(54, 162, 235, 1)'], // rgba
        borderWidthDoughnut: 1,
        cutoutPercentageDoughnut: 65
      }
    }
  },
  methods: {
    addDate: function () {
      let dateNow = new Date(this.date)
      this.date = dateNow.setDate(new Date(dateNow.getDate() + 1))
      this.date = dateNow.toISOString().substr(0, 10)
    },
    subDate: function () {
      let dateNow = new Date(this.date)
      this.date = dateNow.setDate(new Date(dateNow.getDate() - 1))
      this.date = dateNow.toISOString().substr(0, 10)
    },
    openDialog: function (charType) {
      switch (charType) {
        case 'Line':
          this.lineDialog = true
          let lineComp = this.$children[8].$children[0].$children[0].$children[0].$children[0].$children[0]
          setTimeout(() => {
            lineComp.renderChart(lineComp.chartData, lineComp.options)
          }, 200)
          break
        case 'Bar':
          this.barDialog = true
          let barComp = this.$children[10].$children[0].$children[0].$children[0].$children[0].$children[0]
          setTimeout(() => {
            barComp.renderChart(barComp.chartData, barComp.options)
          }, 200)
          break
        case 'Doughnut':
          this.doughnutDialog = true
          let doughnutComp = this.$children[9].$children[0].$children[0].$children[0].$children[0].$children[0]
          setTimeout(() => {
            doughnutComp.renderChart(doughnutComp.chartData, doughnutComp.options)
          }, 200)
          break
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
.v-card {
  color: black;
  background-color: $vuetify-secondary;
  padding: 5px;
  max-height: 500px;
}
.chart {
  display: inline;
  margin: 5px;
  max-height: 500px;
}
</style>
