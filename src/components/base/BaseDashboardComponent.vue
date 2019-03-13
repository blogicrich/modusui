<template>
  <div>
    <v-layout row align-center justify-center prepend-icon="event">
      <v-icon large>event</v-icon>
      <v-icon @click="subDate()" large>keyboard_arrow_left</v-icon>
      <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date">
        <v-text-field slot="activator" v-model="date" readonly></v-text-field>
        <v-date-picker color="primary" color-header="primary" v-model="date" no-title scrollable>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">Ok</v-btn>
        </v-date-picker>
      </v-menu>
      <v-icon @click="addDate()" large>keyboard_arrow_right</v-icon>
    </v-layout>
    <v-container fluid grid-list-md d-flex>
      <v-layout fill-height wrap>
        <v-flex d-flex xs12 sm12 md5 lg5 xl5 v-if="breakpoint">
          <v-card class="userSelect">
            <baseDropletuser
              @userSelected="$emit('onchangedate', '', $data)"
              userHeader="eDroplet Users"
              :users="dashboardUsers"
              :searchName="searchName"
              :primaryColor="primaryColor"
              :usersIcon="usersIcon"
              :alertIcon="alertIcon"
              :btnIcon="btnIcon"
              :alertColor="alertColors"
              :commentIcon="commentIcon"
              :maxCharac="'50'"
            ></baseDropletuser>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 md8 lg8 xl8 @click="openDialog('Line')">
          <v-card dark>
            <charts
              class="chart"
              :update="update"
              :chartType="'Line'"
              :lineChartData="lineChartData"
            />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm12 md4 lg4 xl4 v-if="!breakpoint">
          <v-card class="userSelect">
            <baseDropletuser
              @userSelected="$emit('onchangedate', '', $data)"
              userHeader="eDroplet Users"
              :users="dashboardUsers"
              :searchName="searchName"
              :primaryColor="primaryColor"
              :usersIcon="usersIcon"
              :alertIcon="alertIcon"
              :btnIcon="btnIcon"
              :alertColor="alertColors"
              :commentIcon="commentIcon"
              :maxCharac="'50'"
            ></baseDropletuser>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm12 md12 lg12 xl12>
          <v-layout row wrap>
            <v-flex xs12 sm12 md8 lg8 xl8 @click="openDialog('Bar')">
              <v-card dark>
                <charts
                  class="chart"
                  :update="update"
                  :chartType="'Bar'"
                  :barChartData="barChartData"
                />
              </v-card>
            </v-flex>
            <v-flex xs12 sm12 md4 lg4 xl4 @click="openDialog('Doughnut')">
              <v-card dark>
                <charts
                  class="chart"
                  :update="update"
                  :chartType="'Doughnut'"
                  :doughnutChartData="doughnutChartData"
                />
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="lineDialog">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-card dark>
          <charts class="chart" :chartType="'Line'" :lineChartData="lineChartData"/>
          <v-card-actions>
            <v-btn color="primary" flat="flat" @click="lineDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-dialog>

    <v-dialog v-model="doughnutDialog" max-width="750px">
      <v-card dark>
        <charts class="chart" :chartType="'Doughnut'" :doughnutChartData="doughnutChartData"/>
        <v-card-actions>
          <v-btn color="primary" flat="flat" @click="doughnutDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="barDialog">
      <v-card dark>
        <charts class="chart" :chartType="'Bar'" :barChartData="barChartData"/>
        <v-card-actions>
          <v-btn color="primary" flat="flat" @click="barDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import charts from '@/components/base/BaseChartComponent'
import baseDropletuser from '@/components/sub/SubUserSelectComponent'

export default {
  components: {
    charts,
    baseDropletuser
  },
  props: {
    update: Boolean,
    dashboardUsers: Array,
    dashboardComment: Array,
    dashboardHour: Array,
    dashboardDay: Array
  },
  watch: {
    date() {
      this.$emit('onchangedate', this.date, this.$data)
    }
  },
  computed: {
    breakpoint() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        case 'sm':
          return true
        default:
          return false
      }
    },
    alertColors() {
      for (var i = 0; i < this.dashboardUsers.length; i++) {
        if (this.dashboardUsers[i].alertType === 'hydrated') {
          this.alertColor.push('green')
        } else if (this.dashboardUsers[i].alertType === 'dehydrated') {
          this.alertColor.push('red')
        } else if (this.dashboardUsers[i].alertType === 'little dehydrated') {
          this.alertColor.push('orange')
        } else {
          this.alertColor.push('primary')
        }
      }
      return this.alertColor
    }
  },
  methods: {
    addDate: function() {
      let dateNow = new Date(this.date)
      this.date = dateNow.setDate(new Date(dateNow.getDate() + 1))
      this.date = dateNow.toISOString().substr(0, 10)
    },
    subDate: function() {
      let dateNow = new Date(this.date)
      this.date = dateNow.setDate(new Date(dateNow.getDate() - 1))
      this.date = dateNow.toISOString().substr(0, 10)
    },
    openDialog: function(charType) {
      switch (charType) {
        case 'Line':
          this.lineDialog = true
          let lineComp = this.$children[8].$children[0].$children[0]
            .$children[0].$children[0].$children[0]
          setTimeout(() => {
            lineComp.renderChart(lineComp.chartData, lineComp.options)
          }, 200)
          break
        case 'Bar':
          this.barDialog = true
          let barComp = this.$children[10].$children[0].$children[0]
            .$children[0].$children[0].$children[0]
          setTimeout(() => {
            barComp.renderChart(barComp.chartData, barComp.options)
          }, 200)
          break
        case 'Doughnut':
          this.doughnutDialog = true
          let doughnutComp = this.$children[9].$children[0].$children[0]
            .$children[0].$children[0].$children[0]
          setTimeout(() => {
            doughnutComp.renderChart(
              doughnutComp.chartData,
              doughnutComp.options
            )
          }, 200)
          break
      }
    }
  },
  data() {
    return {
      searchName: 'Search user..',
      usersIcon: 'person',
      alertIcon: 'report_problem',
      commentIcon: 'comment',
      btnIcon: 'settings',
      primaryColor: 'primary',
      lineDialog: false,
      barDialog: false,
      doughnutDialog: false,
      alertColor: [],
      menu: false,
      date: new Date().toISOString().substr(0, 10),
      lineChartData: {
        labels: ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00", "21:00 - 22:00", "22:00 - 23:00", "23:00 - 00:00", "00:00 - 01:00", "01:00 - 02:00", "02:00 - 03:00", "03:00 - 04:00", "04:00 - 05:00", "05:00 - 06:00", "06:00 - 07:00", "07:00 - 08:00", "08:00 - 09:00"],

        labelLineOne: 'Consumed',
        dataLineOne: [ 1.2, 0.8, 1.8, 0.8, 1, 1.5, 1, 1.2, 1.1, 1.4, 0.7, 0.7, 1.6, 1.3, 0.7, 1.5, 0.7, 0.8, 1.1, 1.3, 1.2, 1.8, 0.7, 1 ],
        borderColorLineOne: 'rgba(54, 162, 235, 1)',
        backgroundColorLineOne: 'rgba(54, 162, 235, 0.2)',
        borderWidthLineOne: 2,

        labelLineTwo: 'Target hydration',
        dataLineTwo: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        borderColorLineTwo: 'rgba(102, 141, 62, 1)',
        borderWidthLineTwo: 2,

        labelLineThree: 'Target hydration (conditional)',
        dataLineThree: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
        borderColorLineThree: 'rgba(255, 159, 64, 1)',
        borderWidthLineThree: 2
      },
      barChartData: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],

        labelBarOne: 'Consumed',
        dataBarOne: [1.3, 1.2, 0.8, 1.6, 0.6, 0.9, 1.0],
        borderColorBarOne: 'rgba(54, 162, 235, 1)',
        backgroundColorBarOne: 'rgba(54, 162, 235, 0.2)',
        borderWidthBarOne: 2,

        labelLineOne: 'Target hydration (conditional)',
        dataLineOne: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
        borderColorLineOne: 'rgba(255, 159, 64, 1)',
        borderWidthLineOne: 2,

        labelLineTwo: 'Target hydration',
        dataLineTwo: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
        borderColorLineTwo: 'rgba(102, 141, 62, 1)',
        borderWidthLineTwo: 2
      },
      doughnutChartData: {
        labels: ['Consumed', 'Remaining'],
        dataDoughnut: [0.8, 0.2],
        borderColorDoughnut: 'rgba(255, 255, 255, 1)',
        backgroundColorDoughnut: ['#00A1CD', 'rgba(200, 200, 200)' ],
        borderWidthDoughnut: 2,
        cutoutPercentageDoughnut: 65
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
.v-card {
  color: black;
  background-color: $white;
  padding: 5px;
}
.chart {
  display: inline;
}
.userSelect {
  overflow-y: auto;
  overflow-x: hidden;
}
.v-container {
  padding-top: 0;
  margin-top: 0;
}

</style>
