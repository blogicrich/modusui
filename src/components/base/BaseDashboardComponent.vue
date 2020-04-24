<template>
<!-- <keep-alive> -->
  <v-container fluid>
    <!-- DATE PICKER -->
    <v-layout align-center justify-center prepend-icon="event">
      <v-icon large>event</v-icon>
      <v-icon @click="subtractDay()" large title="Decrease date by one day">keyboard_arrow_left</v-icon>
      <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date">
        <v-text-field slot="activator" :value="formattedDate" readonly title="Pick a date"></v-text-field>
        <v-date-picker
          color="primary"
          color-header="primary"
          v-model="date"
          :max="maxDate"
          no-title
          scrollable
        >
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">Ok</v-btn>
        </v-date-picker>
      </v-menu>
      <v-icon
        @click="addDay()"
        large
        :disabled="date === maxDate"
        title="Increase date by one day"
      >keyboard_arrow_right</v-icon>
    </v-layout>
    <!-- DASHBOARD CONTENT -->
    <v-container class="app-container" fluid grid-list-md>
      <!-- ROW-1 -->
      <v-layout v-bind="binding">
        <v-flex xs12 md8 order-md1 order-xs2>
          <v-card dark v-if="!hourError">
            <v-layout row fill-height align-center justify-end>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="text-white mt-2 mr-2"
                    color="primary"
                    v-on="on"
                  >Chart Type
                    <v-icon class="mr-1" v-if="hourlyChartType === 'Line Chart'" medium right>show_chart</v-icon>
                    <v-icon class="mr-1" v-if="hourlyChartType === 'Bar Chart'" medium right>bar_chart</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-tile
                    v-for="(item, index) in hourlyChartTypes"
                    :key="index"
                    @click="setChartType(item.type)"
                  >
                    <v-list-tile-title>{{ item.type }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-layout>
            <SubHourlyHydrationLineChart
              v-if="hourLoaded && hourlyChartType === 'Line Chart'"
              :chartData="dashboardHour"
              :chartTitle="hourChartTitle"
            />
            <SubHourlyHydrationBarChart
              v-if="hourLoaded && hourlyChartType === 'Bar Chart'"
              :chartData="dashboardHour"
              :chartTitle="hourChartTitle"
            />
            <v-progress-circular v-if="hourError" indeterminate color="primary" class="ma-2"></v-progress-circular>
          </v-card>
          <v-alert :value="true" type="info" v-else>Hourly data is not available at this time.</v-alert>
        </v-flex>
        <v-flex xs12 md4 order-md2 order-xs1>
          <v-card v-if="!usersError">
            <sub-user-select
              v-if="usersLoaded"
              @userSelected="$emit('userChange', $event)"
              :users="dashboardUsers"
              :selectedUser="selectedUser"
            ></sub-user-select>
            <v-progress-circular v-else indeterminate color="primary" class="ma-2"></v-progress-circular>
          </v-card>
          <v-alert :value="true" type="error" v-else>An error occurred while loading users.</v-alert>
        </v-flex>
      </v-layout>
      <!-- ROW-2 -->
      <v-layout v-bind="binding">
        <v-flex xs12 md8 order-xs1>
          <v-card dark v-if="!weekError">
            <SubWeeklyHydrationBarChart
              v-if="weekLoaded"
              :chartData="dashboardWeek.dataPoints"
              class="pb-4"
              :chartTitle="weekChartTitle"
            />
            <v-progress-circular v-else indeterminate color="primary" class="ma-2"></v-progress-circular>
          </v-card>
          <v-alert :value="true" type="info" v-else>Weekly data is not available at this time.</v-alert>
        </v-flex>
        <v-flex xs12 md4 order-xs2>
          <v-card dark v-if="!dayError">
            <SubHydrationDayPieChart
              v-if="dayLoaded"
              class="pb-4"
              :chartTitle="dayChartTitle"
              :chartData="dashboardDay"
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
    </v-container>
  </v-container>
  <!-- </keep-alive> -->
</template>

<script>
import SubUserSelect from '@/components/sub/SubUserSelectComponent'
import { crudRoutines } from '@/mixins/dataTableCRUD.js'
import SubHourlyHydrationLineChart from '@/components/sub/SubHourlyHydrationLineChart'
import SubHourlyHydrationBarChart from '@/components/sub/SubHourlyHydrationBarChart'
import SubHydrationDayPieChart from '@/components/sub/SubHydrationDayPieChart'
import SubWeeklyHydrationBarChart from '@/components/sub/SubWeeklyHydrationBarChart'

export default {
  components: {
    SubUserSelect,
    SubHourlyHydrationLineChart,
    SubHourlyHydrationBarChart,
    SubHydrationDayPieChart,
    SubWeeklyHydrationBarChart
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
    'weekError',
    'refreshRate',
    'selectedUser'
  ],
  computed: {
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.smAndDown) {
        binding.column = true
        binding.row = false
        binding.fillHeight = false
      }
      if (this.$vuetify.breakpoint.mdAndUp) {
        binding.column = false
        binding.row = true
        binding.fillHeight = true
      }
      return binding
    },
    alertColors () {
      this.setAlertColors()
      return this.alertColor
    },

    formattedDate () {
      return this.$moment(this.date).format('L')
    },

    hourChartTitle () {
      return `Activity on: ${this.formatDate(this.date)}`
    },

    dayChartTitle () {
      return `Daily hydration status: ${this.dashboardDay.consumed.toFixed(2)}L/${this.dashboardDay.target.toFixed(2)}L`
    },

    weekChartTitle () {
      return `Weekly summary (${this.dashboardWeek.average.toFixed(2)} litres per day on average)`
    }
  },
  watch: {
    date () {
      this.$emit('dateChange', this.date)
    }
  },
  mounted () {
    this.date = this.$moment().format('YYYY-MM-DD')
    setInterval(() => {
      this.$emit('refresh')
      console.log('DBCOMP')
    }, this.refreshRate)
  },
  methods: {
    addDay () {
      this.date = this.$moment(this.date, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD')
    },

    subtractDay () {
      this.date = this.$moment(this.date).subtract(1, 'day').format('YYYY-MM-DD')
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
    setChartType (event) {
      this.hourlyChartType = event
    },
    formatDate (date) {
      return this.$moment(date).format('LL')
    }
  },
  data () {
    return {
      date: '',
      isHourlyBarChart: true,
      isHourlyLineChart: false,
      hourlyChartType: 'Bar Chart',
      hourlyChartTypes: [
        { type: 'Bar Chart' },
        { type: 'Line Chart' }
      ],
      menu: false,
      maxDate: this.$moment().format('YYYY-MM-DD'),
      refreshEnabled: true
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
</style>
