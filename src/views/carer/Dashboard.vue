<template>
  <!-- <keep-alive> -->
    <BaseDashboardComponent
      v-if="dashboardUsersLoaded && chartTitleDate"
    >
      <BaseDateSelection
        slot="headerCenter"
        @dateChange="updateDate"
      />
      <BaseUserSelect
        slot="headerRight"
        v-if="dashboardUsersLoaded"
        :users="dashboardUsers"
        :selectedUser="selectedUser"
        @user-selected="updateUser"
      />
      <v-flex slot="tileOne">
        <BaseChartTypeSelector
          :chartTypes="hourChartTypes"
          btnTitle="Chart Type"
          :selectedType="hourChartType"
          @chart-type-changed="changeChartType"
        />
        <SubHourlyHydrationLineChart
          ref="hourLineChart"
          v-if="hourChartDataLoaded && hourChartType === 'Line Chart'"
          :chartData="hourChartData"
          :chartTitle="hourChartTitle"
        />
        <SubHourlyHydrationBarChart
          ref="hourBarChart"
          v-if="hourChartDataLoaded && hourChartType === 'Bar Chart'"
          :chartData="hourChartData"
          :chartTitle="hourChartTitle"
        />
      </v-flex>
      <SubHydrationDayPieChart
        ref="dayPieChart"
        slot="tileTwo"
        v-if="dayChartDataLoaded"
        :chartTitle="dayChartTitle"
        :chartData="dayChartData"
      />
      <SubWeeklyHydrationBarChart
        ref="weeklyBarChart"
        slot="tileThree"
        v-if="weekChartDataLoaded"
        :chartTitle="weekChartTitle"
        :chartData="weekChartData"
      />
      <SubHydrationDayPieChart
        ref="percentHydratedChart"
        slot="tileFour"
        v-if="dayChartDataLoaded"
        :chartTitle="dayChartTitle"
        :chartData="dayChartData"
      />
    </BaseDashboardComponent>
  <!-- </keep-alive> -->
</template>

<script>

import BaseChartTypeSelector from '@/components/base/BaseChartSelectionComponent'
import BaseDashboardComponent from '@/components/base/BaseDashboardComponent'
import BaseDateSelection from '@/components/base/BaseDateSelectionComponent'
import BaseUserSelect from '@/components/base/BaseUserSelectComponent'
import SubHourlyHydrationLineChart from '@/components/sub/SubHourlyHydrationLineChart'
import SubHourlyHydrationBarChart from '@/components/sub/SubHourlyHydrationBarChart'
import SubHydrationDayPieChart from '@/components/sub/SubHydrationDayPieChart'
import SubWeeklyHydrationBarChart from '@/components/sub/SubWeeklyHydrationBarChart'
import { mapState } from 'vuex'

export default {
  components: {
    BaseDashboardComponent,
    BaseDateSelection,
    BaseChartTypeSelector,
    BaseUserSelect,
    SubHourlyHydrationLineChart,
    SubHourlyHydrationBarChart,
    SubHydrationDayPieChart,
    SubWeeklyHydrationBarChart
  },
  computed: {
    ...mapState({
      // Users
      selectedUser: state => state.eDropletApp.selectedUser,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers,
      dashboardUsersLoaded: state => state.dashboardUsers.dashboardUsersLoaded,
      // Hourly Chart Data
      hourChartData: state => state.dashboardHour.dashboardHourChartData,
      hourChartDataLoaded: state => state.dashboardHour.dashboardHourChartDataLoaded,
      hourChartDataUpdating: state => state.dashboardHour.dashboardHourChartUpdating,
      // Day Chart Data
      dayChartData: state => state.dashboardDay.dashboardDayChartData,
      dayChartDataLoaded: state => state.dashboardDay.dashboardDayChartDataLoaded,
      dayChartDataUpdating: state => state.dashboardDay.dashboardDayChartDataUpdating,
      // Weekly Chart Data
      weekChartData: state => state.dashboardWeek.dashboardWeekChartData,
      weekChartDataAverage: state => state.dashboardWeek.dashboardWeekDataAverage,
      weekChartDataLoaded: state => state.dashboardWeek.dashboardWeekChartDataLoaded,
      weekChartDataUpdating: state => state.dashboardWeek.dashboardWeekChartDataUpdating
    }),
    hourChartTitle () {
      if (this.hourChartDataLoaded && this.chartTitleDate) {
        return `Activity on: ${this.chartTitleDate}`
      }
    },
    dayChartTitle () {
      if (this.dayChartDataLoaded) {
        return `Daily hydration status: ${this.dayChartData.consumed.toFixed(2)}L/${this.dayChartData.target.toFixed(2)}L`
      }
    },
    weekChartTitle () {
      if (this.weekChartDataLoaded) {
        return `Weekly summary (${this.weekChartDataAverage.toFixed(2)} litres per day on average)`
      }
    }
  },
  data () {
    return {
      selectedDate: null,
      chartTitleDate: null,
      hourChartType: 'Bar Chart',
      hourChartTypes: [
        { type: 'Bar Chart' },
        { type: 'Line Chart' }
      ],
      menu: false,
      maxDate: this.$moment().format('YYYY-MM-DD')
    }
  },
  methods: {
    changeChartType (type) {
      this.hourChartType = type
    },
    async setUsers () {
      await this.$store.dispatch('fetchDashboardUsersGet')
      this.$store.commit('SET_SELECTED_USER', this.dashboardUsers[0])
    },
    async updateCharts () {
      if (this.selectedUser && this.selectedDate) {
        let payload = { userId: this.selectedUser.userId, date: this.selectedDate }
        await this.$store.dispatch('fetchDashboardHourChartData', payload)
        await this.$store.dispatch('fetchDashboardDayChartData', payload)
        await this.$store.dispatch('fetchDashboardWeekChartData', payload)
      }
    },
    updateDate (date) {
      this.selectedDate = this.$moment.utc(date).unix()
      this.chartTitleDate = this.$moment(date).format('LL')
    },
    updateUser (selectedUser) {
      this.$store.commit('SET_SELECTED_USER', selectedUser)
    }
  },
  mounted () {
    this.setUsers()
    this.updateDate()
    this.$watch(
      (vm) => (
        vm.selectedDate, vm.selectedUser, Date.now()),
      function () {
        this.updateCharts()
      }
    )
    // setInterval(() => {
    //   this.$emit('refresh')
    //   console.log('DBCOMP')
    // }, this.refreshRate)
  },
  beforeDestroy () {
    this.$store.dispatch('resetDashboardHourState')
    this.$store.dispatch('resetDashboardDayState')
    this.$store.dispatch('resetDashboardWeekState')
  }
}
</script>
