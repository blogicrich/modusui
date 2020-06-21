<template>
  <keep-alive>
    <BaseDashboard
      v-if="!dashboardIsLoading"
    >
      <BaseDateSelection
        slot="dashboardHeaderCenter"
        :date="selectedDate"
        :maxDate="maxDate"
        :formattedDate="formattedDate"
        @date-change="$store.commit('SET_DASHBOARD_DATE', $event)"
        @add-day="$store.commit('INCREMENT_DASHBOARD_DATE', $event)"
        @subtract-day="$store.commit('DECREMENT_DASHBOARD_DATE', $event)"
      />
      <BaseUserSelect
        slot="dashboardHeaderRight"
        :users="dashboardUsers"
        :selectedUser="selectedUser"
        @user-selected="$store.commit('SET_USER_CONTEXT', $event)"
      />
      <v-flex slot="tileOne">
        <BaseChartHeader v-if="hourChartDataLoaded">
          <p slot="header" class="table-header text-secondary text-bold align-center mt-2">{{ hourChartTitle }}</p>
          <BaseChartTypeSelector
            slot="tools"
            :chartTypes="hourChartTypes"
            btnTitle="Chart Type"
            :selectedType="hourChartType"
            @chart-type-changed="hourChartType = $event"
          />
        </BaseChartHeader>
        <SubHourlyHydrationLineChart
          ref="hourLineChart"
          v-if="hourChartData && hourChartType === 'Line Chart'"
          :chartData="hourLineBarChartData"
        />
        <SubHourlyHydrationBarChart
          ref="hourBarChart"
          v-if="hourChartData && hourChartType === 'Bar Chart'"
          :chartData="hourLineBarChartData"
        />
        <BaseDashboardTileOverlay
          v-if="!hourChartDataLoaded"
          message="No data for user or date selected"
        ></BaseDashboardTileOverlay>
      </v-flex>
      <v-flex slot="tileTwo">
        <BaseChartHeader v-if="dayChartDataLoaded">
          <p slot="header" class="table-header text-secondary text-bold align-center mt-2">{{ dayChartTitle }}</p>
        </BaseChartHeader>
        <SubHydrationDayPieChart
          ref="dayPieChart"
          :chartData="dailyPieChartData"
        />
        <BaseDashboardTileOverlay
          v-if="!dayChartDataLoaded"
          message="No data for user or date selected"
        ></BaseDashboardTileOverlay>
      </v-flex>
      <v-flex slot="tileThree">
        <BaseChartHeader v-if="weekChartDataLoaded">
          <p slot="header" class="table-header text-secondary text-bold align-center mt-2">{{ weekChartTitle }}</p>
        </BaseChartHeader>
        <SubWeeklyHydrationBarChart
          ref="weeklyBarChart"
          :chartData="weekLineBarChartData"
        />
        <BaseDashboardTileOverlay
          v-if="!weekChartDataLoaded"
          message="No data for user or date selected"
        ></BaseDashboardTileOverlay>
      </v-flex>
      <v-flex slot="tileFour">
        <BaseChartHeader v-if="dayChartDataLoaded">
          <p slot="header" class="table-header text-secondary text-bold align-center mt-2">{{ dayChartTitle }}</p>
        </BaseChartHeader>
        <SubHydrationDayPieChart
          ref="percentHydratedChart"
          :chartData="dailyPieChartData"
        />
        <BaseDashboardTileOverlay
          v-if="!dayChartDataLoaded"
          message="No data for user or date selected"
        ></BaseDashboardTileOverlay>
      </v-flex>
    </BaseDashboard>
    <transition name="component-fade" mode="in-out">
      <BaseDataInfoCard
        v-if="dashboardIsLoading"
        :loading="dashboardIsLoading"
        :color="$vuetify.theme.primary"
        :error="false"
        loadingMsg="Loading dashboard data... Please wait"
      ></BaseDataInfoCard>
    </transition>
  </keep-alive>
</template>

<script>

import BaseChartTypeSelector from '@/components/base/BaseChartSelectionComponent'
import BaseChartHeader from '@/components/base/BaseChartHeaderComponent'
import BaseDashboard from '@/components/base/BaseDashboardComponent'
import BaseDashboardTileOverlay from '@/components/base/BaseDashboardTileOverlayComponent'
import BaseDataInfoCard from '@/components/base/BaseDataTableInfoComponent'
import BaseDateSelection from '@/components/base/BaseDateSelectionComponent'
import BaseUserSelect from '@/components/base/BaseUserSelectComponent'
import SubHourlyHydrationLineChart from '@/components/sub/SubHourlyHydrationLineChart'
import SubHourlyHydrationBarChart from '@/components/sub/SubHourlyHydrationBarChart'
import SubHydrationDayPieChart from '@/components/sub/SubHydrationDayPieChart'
import SubWeeklyHydrationBarChart from '@/components/sub/SubWeeklyHydrationBarChart'
import { mapState } from 'vuex'

export default {
  name: 'eDropletDashboard',
  components: {
    BaseDashboard,
    BaseDashboardTileOverlay,
    BaseDataInfoCard,
    BaseDateSelection,
    BaseChartTypeSelector,
    BaseChartHeader,
    BaseUserSelect,
    SubHourlyHydrationLineChart,
    SubHourlyHydrationBarChart,
    SubHydrationDayPieChart,
    SubWeeklyHydrationBarChart
  },
  computed: {
    ...mapState({
      // Dates
      selectedDate: state => state.dashboardDates.dashboardSelectedDate,
      formattedDate: state => state.dashboardDates.dashboardFormattedDate,
      // Users
      selectedUser: state => state.dashboardUsers.selectedUser,
      dashboardUsers: state => state.dashboardUsers.dashboardUsers,
      dashboardUsersLoaded: state => state.dashboardUsers.dashboardUsersLoaded,
      // Hourly Chart Data
      hourChartData: state => state.dashboardHour.dashboardHourChartData,
      hourChartTitle: state => state.dashboardHour.dashboardHourChartTitle,
      hourChartDataLoaded: state => state.dashboardHour.dashboardHourChartDataLoaded,
      hourChartDataUpdating: state => state.dashboardHour.dashboardHourChartUpdating,
      // Day Chart Data
      dayChartData: state => state.dashboardDay.dashboardDayChartData,
      dayChartTitle: state => state.dashboardDay.dashboardDayChartTitle,
      dayChartDataLoaded: state => state.dashboardDay.dashboardDayChartDataLoaded,
      dayChartDataUpdating: state => state.dashboardDay.dashboardDayChartDataUpdating,
      // Weekly Chart Data
      weekChartData: state => state.dashboardWeek.dashboardWeekChartData,
      weekChartTitle: state => state.dashboardWeek.dashboardWeekChartTitle,
      weekChartDataAverage: state => state.dashboardWeek.dashboardWeekDataAverage,
      weekChartDataLoaded: state => state.dashboardWeek.dashboardWeekChartDataLoaded,
      weekChartDataUpdating: state => state.dashboardWeek.dashboardWeekChartDataUpdating
    }),
    hourLineBarChartData () {
      if (this.hourChartDataLoaded && !this.hourChartDataUpdating) {
        return this.$store.getters.getterHourLineBarChartData
      }
      return null
    },
    weekLineBarChartData () {
      if (this.weekChartDataLoaded && !this.weekChartDataUpdating) {
        return this.$store.getters.getterWeekLineBarChartData
      }
      return null
    },
    dailyPieChartData () {
      if (this.dayChartDataLoaded && !this.dayChartDataUpdating) {
        return this.$store.getters.getterDailyPieChartData
      }
      return null
    }
  },
  data () {
    return {
      dashboardIsLoading: true,
      dashboardLoadingTimeout: null,
      dashboardPollTimeout: null,
      dashboardPollRate: 300000, // Dasboard poll time in ms
      selectionTimeout: null,
      bounce: 500, // Dasboard parameter selection bounce time in ms
      // BaseDateSelection
      maxDate: this.$moment().format('YYYY-MM-DD'),
      // BaseTypeChartSelector
      hourChartType: 'Bar Chart',
      hourChartTypes: [
        { type: 'Bar Chart' },
        { type: 'Line Chart' }
      ]
    }
  },
  methods: {
    // Dashboard setup
    async setUsers () {
      await this.$store.dispatch('fetchDashboardUsers')
      this.$store.commit('SET_USER_CONTEXT', this.dashboardUsers[0])
    },
    setDates () {
      const date = this.$moment(Date.now()).format('YYYY-MM-DD')
      this.$store.commit('SET_DASHBOARD_DATE', date)
    },
    async setDashboardPoll () {
      const self = this
      this.dashboardPollTimeout = setInterval(async function () {
        await self.updateCharts()
      }, this.dashboardPollRate)
    },
    // Dashboard Update
    async updateCharts () {
      if (this.selectedUser && this.selectedDate) {
        await this.setSelectionTimeout()
      }
    },
    updateDashboardStatus () {
      const self = this
      this.dashboardLoadingTimeout = setTimeout(function setLoadFlag () {
        if (self.dashboardUsersLoaded && self.selectedDate) {
          self.dashboardIsLoading = false
        } else {
          self.updateDashboardStatus()
        }
      }, this.bounce)
    },
    // Timeouts
    async setSelectionTimeout () {
      const self = this
      if (this.selectionTimeout) {
        clearTimeout(this.selectionTimeout)
      }
      this.selectionTimeout = setTimeout(async function () {
        try {
          const date = self.$moment.utc(self.selectedDate).unix()
          const payload = { userId: self.selectedUser.userId, date: date, formattedDate: self.formattedDate }
          await self.$store.dispatch('fetchDashboardHourChartData', payload)
          await self.$store.dispatch('fetchDashboardDayChartData', payload)
          await self.$store.dispatch('fetchDashboardWeekChartData', payload)
        } catch (error) {
          self.chartDataLoadError = true
        }
      }, this.bounce)
    }
  },
  watch: {
    selectedUser: {
      handler: 'updateCharts'
    },
    selectedDate: {
      handler: 'updateCharts'
    }
  },
  created () {
    this.setUsers()
    this.setDates()
  },
  mounted () {
    this.setDashboardPoll()
    this.updateDashboardStatus()
  },
  destroyed () {
    if (this.dashboardLoadingTimeout) {
      clearTimeout(this.dashboardLoadingTimeout)
    }
    if (this.dashboardPollTimeout) {
      clearInterval(this.dashboardPollTimeout)
    }
    if (this.selectionTimeout) {
      clearTimeout(this.selectionTimeout)
    }
    if (this.maxDate) this.maxDate = null
    this.$store.dispatch('resetDashboardHourState')
    this.$store.dispatch('resetDashboardDayState')
    this.$store.dispatch('resetDashboardWeekState')
  }
}
</script>

<style lang="scss" scoped>
  @import "./public/scss/main.scss";
</style>
