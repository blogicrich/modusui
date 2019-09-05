<template>
  <div>
    <v-layout row align-center justify-center prepend-icon="event">
      <v-icon large>event</v-icon>
      <v-icon @click="subtractDay()" large title="Decrease date by one day">keyboard_arrow_left</v-icon>
      <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date">
        <v-text-field slot="activator" :value="formattedDate" readonly title="Pick a date"></v-text-field>
        <v-date-picker color="primary" color-header="primary" v-model="date" :max="maxDate" no-title scrollable>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">Ok</v-btn>
        </v-date-picker>
      </v-menu>
      <v-icon @click="addDay()" large :disabled="date === maxDate" title="Increase date by one day">keyboard_arrow_right</v-icon>
      <v-icon @click="refresh()" large :disabled="!refreshEnabled" title="Check for new data">refresh</v-icon>
    </v-layout>
    <v-container fluid grid-list-md d-flex>
      <v-layout fill-height wrap>
        <v-flex xs12 sm12 md8 lg8 xl8 @click="openDialog('Hour')">
          <v-card dark v-if="!hourError">
            <charts
              v-if="hourLoaded"
              class="chart"
              :chartType="'Line'"
              :chartData="hourChartData"
            />
            <v-progress-circular v-else indeterminate color="primary" class="ma-2"></v-progress-circular>
          </v-card>
          <v-alert
            :value="true"
            type="info"
            v-else
          >Hourly data is not available at this time.</v-alert>
        </v-flex>
        <v-flex d-flex xs12 sm12 md4 lg4 xl4 v-if="!breakpoint">
          <v-card class="userSelect" v-if="!usersError">
            <baseDropletuser
              v-if="usersLoaded"
              @userSelected="$emit('userChange', $event)"
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
              :commentData="commentData"
              @commentText="saveComment"
            ></baseDropletuser>
            <v-progress-circular
              v-else
              indeterminate
              color="primary"
              class="ma-2"
            ></v-progress-circular>
          </v-card>
          <v-alert
            :value="true"
            type="error"
            v-else
          >An error occurred while loading users.</v-alert>
        </v-flex>
        <v-flex d-flex xs12 sm12 md12 lg12 xl12>
          <v-layout row wrap>
            <v-flex xs12 sm12 md8 lg8 xl8 @click="openDialog('Week')">
              <v-card dark v-if="!weekError">
                <charts
                  v-if="weekLoaded"
                  class="chart"
                  :chartType="'Bar'"
                  :chartData="weekChartData"
                />
                <v-progress-circular v-else indeterminate color="primary" class="ma-2"></v-progress-circular>
              </v-card>
              <v-alert
                :value="true"
                type="ifno"
                v-else
              >Weekly data is not available at this time.</v-alert>
            </v-flex>
            <v-flex xs12 sm12 md4 lg4 xl4 @click="openDialog('Day')">
              <v-card dark v-if="!dayError">
                <charts
                  v-if="dayLoaded"
                  class="chart"
                  :chartType="'Doughnut'"
                  :chartData="dayChartData"
                />
                <v-progress-circular v-else indeterminate color="primary" class="ma-2"></v-progress-circular>
              </v-card>
              <v-alert
                :value="true"
                type="info"
                v-else
              >Daily hydration data is not available at this time.</v-alert>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="dayChartDialog">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-card dark>
          <charts class="chart" :chartType="'Line'" :chartData="hourChartData" />
          <v-card-actions>
            <v-btn color="primary" flat="flat" @click="dayChartDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-dialog>

    <v-dialog v-model="dayChartDialog" max-width="750px">
      <v-card dark>
        <charts class="chart" :chartType="'Doughnut'" :chartData="dayChartData" />
        <v-card-actions>
          <v-btn color="primary" flat="flat" @click="dayChartDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="weekChartDialog">
      <v-card dark>
        <charts class="chart" :chartType="'Bar'" :chartData="weekChartData" />
        <v-card-actions>
          <v-btn color="primary" flat="flat" @click="weekChartDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import charts from '@/components/base/BaseChartComponent'
import baseDropletuser from '@/components/sub/SubUserSelectComponent'
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import apiLib from '@/services/apiLib'

export default {
  components: {
    charts,
    baseDropletuser
  },
  mixins: [crudRoutines],
  props: [
    'dashboardUsers',
    'dashboardComment',
    'dashboardHour',
    'dashboardDay',
    'dashboardWeek',
    'usersLoaded',
    'dayLoaded',
    'hourLoaded',
    'weekLoaded',
    'usersError',
    'dayError',
    'hourError',
    'weekError'
  ],
  computed: {
    breakpoint () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        case 'sm':
          return true
        default:
          return false
      }
    },

    alertColors () {
      this.setAlertColors()
      return this.alertColor
    },

    formattedDate () {
      return this.$moment(this.date).format('L')
    }
  },
  watch: {
    date: function () {
      this.$emit('dateChange', this.date)
    },

    hourLoaded: function () {
      this.updateHourChart()
    },

    dayLoaded: function () {
      this.updateDayChart()
    },

    weekLoaded: function () {
      this.updateWeekChart()
    }
  },
  mounted () {
    this.date = this.$moment().format('YYYY-MM-DD')
    this.getComment()
  },
  methods: {
    getComment () {
      apiLib.getData(this.readUrl, true, true).then(response => {
        this.commentData = response[0]
      })
    },

    saveComment (newComment) {
      const data = {
        comment: newComment,
        carerId: 12
      }
      apiLib.updateData(this.updateUrl, data, true, true)
    },

    addDay () {
      this.date = this.$moment(this.date, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD')
    },

    subtractDay () {
      this.date = this.$moment(this.date).subtract(1, 'day').format('YYYY-MM-DD')
    },

    refresh () {
      this.$emit('refresh')
      this.refreshEnabled = false

      setTimeout(() => {
        this.refreshEnabled = true
      }, this.refreshCooldown)
    },

    setAlertColors () {
      for (let i = 0; i < this.dashboardUsers.length; i++) {
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
    },

    formatDate (date) {
      return this.$moment(date).format('LL')
    },

    updateHourChart: function () {
      this.hourChartData.title = `Activity on: ${this.formatDate(this.date)}`
      this.hourChartData.dataLineOne = this.dashboardHour
    },

    updateWeekChart: async function () {
      const weekDataPoints = this.dashboardWeek.map(weekDayData =>
        (weekDayData.volumeConsumedViaEDroplet && weekDayData.volumeConsumedViaOther)
          ? (parseFloat(weekDayData.volumeConsumedViaEDroplet) + parseFloat(weekDayData.volumeConsumedViaOther))
          : null
      )

      const filteredDataPoints = weekDataPoints.filter(
        weekDataPoint => weekDataPoint !== null
      ) // Exclude null from average calculation.

      const sum = filteredDataPoints.reduce(
        (total, currentValue) => total + currentValue,
        0
      )

      let average

      if (filteredDataPoints.length > 0) {
        average = sum / filteredDataPoints.length
      } else {
        average = 0
      }

      this.weekChartData.dataBarOne = weekDataPoints
      this.weekChartData.title = `Weekly summary (${average.toFixed(2)} litres per day on average)`
    },

    updateDayChart: async function () {
      const dashboardDay = this.dashboardDay[0]
      if (dashboardDay) {
        const consumed = parseFloat(dashboardDay.volumeConsumedViaEDroplet) + parseFloat(dashboardDay.volumeConsumedViaOther)
        const target = parseFloat(dashboardDay.hydrationTarget)

        let remaining = target - consumed

        if (remaining < 0) {
          remaining = 0
        }

        this.dayChartData.dataDoughnut[0] = consumed
        this.dayChartData.dataDoughnut[1] = remaining

        this.dayChartData.title = `Hydration on ${this.formatDate(this.date)}: ${consumed.toFixed(2)}L / ${target.toFixed(2)}L`
      }
    },

    openDialog: function (charType) {
      switch (charType) {
        case 'Hour':
          if (this.hourLoaded === true) {
            this.hourChartDialog = true

            // FIXME: Assumes fixed DOM structure
            let lineComp = this.$children[8].$children[0].$children[0]
              .$children[0].$children[0].$children[0]
            setTimeout(() => {
              lineComp.renderChart(lineComp.chartData, lineComp.options)
            }, 200)
          }
          break
        case 'Week':
          if (this.weekLoaded === true) {
            this.weekChartDialog = true

            // FIXME: Assumes fixed DOM structure
            let barComp = this.$children[10].$children[0].$children[0]
              .$children[0].$children[0].$children[0]
            setTimeout(() => {
              barComp.renderChart(barComp.chartData, barComp.options)
            }, 200)
          }
          break
        case 'Day':
          if (this.dayLoaded === true) {
            this.dayChartDialog = true

            // FIXME: Assumes fixed DOM structure
            let doughnutComp = this.$children[9].$children[0].$children[0]
              .$children[0].$children[0].$children[0]
            setTimeout(() => {
              doughnutComp.renderChart(
                doughnutComp.chartData,
                doughnutComp.options
              )
            }, 200)
          }
          break
      }
    }
  },
  data () {
    return {
      commentData: '',
      // FIXME: Hardcoded IDs
      updateUrl: 'carer/dashboard-comment/' + 21 + '/' + 1557917441,
      readUrl: 'carer/dashboard-comment/' + 21 + '/' + 1557917441,
      searchName: 'Search user..',
      usersIcon: 'person',
      alertIcon: 'report_problem',
      commentIcon: 'comment',
      btnIcon: 'settings',
      primaryColor: 'primary',
      hourChartDialog: false,
      weekChartDialog: false,
      dayChartDialog: false,
      alertColor: [],
      menu: false,
      date: '',
      maxDate: this.$moment().format('YYYY-MM-DD'),
      refreshEnabled: true,
      refreshCooldown: 2000,

      hourChartData: {
        labels: [
          '09:00 - 10:00',
          '10:00 - 11:00',
          '11:00 - 12:00',
          '12:00 - 13:00',
          '13:00 - 14:00',
          '14:00 - 15:00',
          '15:00 - 16:00',
          '16:00 - 17:00',
          '17:00 - 18:00',
          '18:00 - 19:00',
          '19:00 - 20:00',
          '20:00 - 21:00',
          '21:00 - 22:00',
          '22:00 - 23:00',
          '23:00 - 00:00',
          '00:00 - 01:00',
          '01:00 - 02:00',
          '02:00 - 03:00',
          '03:00 - 04:00',
          '04:00 - 05:00',
          '05:00 - 06:00',
          '06:00 - 07:00',
          '07:00 - 08:00',
          '08:00 - 09:00'
        ],

        labelLineOne: 'Consumed',
        dataLineOne: [],
        borderColorLineOne: 'rgba(54, 162, 235, 1)',
        backgroundColorLineOne: 'rgba(54, 162, 235, 0.2)',
        borderWidthLineOne: 2,

        // FIXME: Hardcoded Targets
        labelLineTwo: 'Target hydration',
        dataLineTwo: [
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        borderColorLineTwo: 'rgba(102, 141, 62, 1)',
        borderWidthLineTwo: 2,

        // FIXME: Hardcoded Targets
        labelLineThree: 'Target hydration (conditional)',
        dataLineThree: [
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5,
          1.5
        ],
        borderColorLineThree: 'rgba(255, 159, 64, 1)',
        borderWidthLineThree: 2,
        title: 'Activity on: ' + this.formatDate(new Date(this.date))
      },

      weekChartData: {
        labels: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],

        labelBarOne: 'Consumed',
        dataBarOne: [],
        borderColorBarOne: 'rgba(54, 162, 235, 1)',
        backgroundColorBarOne: 'rgba(54, 162, 235, 0.2)',
        borderWidthBarOne: 2,

        // FIXME: Hardcoded Targets
        labelLineOne: 'Target hydration (conditional)',
        dataLineOne: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
        borderColorLineOne: 'rgba(255, 159, 64, 1)',
        borderWidthLineOne: 2,

        // FIXME: Hardcoded Targets
        labelLineTwo: 'Target hydration',
        dataLineTwo: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
        borderColorLineTwo: 'rgba(102, 141, 62, 1)',
        borderWidthLineTwo: 2,
        title: 'Weekly summary ' + this.weeklyAverage + 'L average'
      },

      dayChartData: {
        labels: ['Consumed', 'Remaining'],
        dataDoughnut: [],
        borderColorDoughnut: 'rgba(255, 255, 255, 1)',
        backgroundColorDoughnut: ['#00A1CD', 'rgba(200, 200, 200)'],
        borderWidthDoughnut: 2,
        cutoutPercentageDoughnut: 65,
        title: 'Hydration for ' + this.formatDate(new Date(this.date))
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
