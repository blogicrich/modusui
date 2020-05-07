<template>
  <keep-alive>
      <BaseDashboard
        v-if="!dashboardIsLoading"
        :is=""
      >
        <BaseDateSelection
          slot="dashboardHeaderCenter"
          :bounce="500"
          @date-change="selectedDate = $event"
        />
        <BaseUserSelect
          slot="dashboardHeaderRight"
          :users="dashboardUsers"
          :selectedUser="selectedUser"
          @user-selected="$store.commit('SET_SELECTED_USER', $event)"
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
          <!-- <transition name="component-fade" mode="out-in"> -->
            <SubHourlyHydrationLineChart
              ref="hourLineChart"
              v-if="hourChartDataLoaded && hourChartType === 'Line Chart'"
              :chartData="hourLineBarChartData"
            />
            <SubHourlyHydrationBarChart
              ref="hourBarChart"
              v-if="hourChartDataLoaded && hourChartType === 'Bar Chart'"
              :chartData="hourLineBarChartData"
            />
            <BaseDashboardTileOverlay
              v-if="!hourChartDataLoaded"
              class="chart-overlay"
              message="No data for user or date selected"
            ></BaseDashboardTileOverlay>
          <!-- </transition> -->
        </v-flex>
        <v-flex slot="tileTwo">
          <BaseChartHeader v-if="dayChartDataLoaded">
            <p slot="header" class="table-header text-secondary text-bold align-center mt-2">{{ dayChartTitle }}</p>
          </BaseChartHeader>
          <SubHydrationDayPieChart
            v-if="dayChartDataLoaded"
            ref="dayPieChart"
            :chartData="dailyPieChartData"
          />
          <BaseDashboardTileOverlay
            v-if="!dayChartDataLoaded"
            class="chart-overlay"
            message="No data for user or date selected"
          ></BaseDashboardTileOverlay>
        </v-flex>
        <v-flex slot="tileThree">
          <BaseChartHeader v-if="weekChartDataLoaded">
            <p slot="header" class="table-header text-secondary text-bold align-center mt-2">{{ weekChartTitle }}</p>
          </BaseChartHeader>
          <SubWeeklyHydrationBarChart
            ref="weeklyBarChart"
            v-if="weekChartDataLoaded"
            :chartData="weekLineBarChartData"
          />
          <BaseDashboardTileOverlay
            v-if="!weekChartDataLoaded"
            class="chart-overlay"
            message="No data for user or date selected"
          ></BaseDashboardTileOverlay>
        </v-flex>
        <v-flex slot="tileFour">
          <BaseChartHeader v-if="dayChartDataLoaded">
            <p slot="header" class="table-header text-secondary text-bold align-center mt-2">{{ dayChartTitle }}</p>
          </BaseChartHeader>
          <SubHydrationDayPieChart
            ref="percentHydratedChart"
            v-if="dayChartDataLoaded"
            :chartData="dailyPieChartData"
          />
          <BaseDashboardTileOverlay
            v-if="!dayChartDataLoaded"
            class="chart-overlay"
            message="No data for user or date selected"
          ></BaseDashboardTileOverlay>
        </v-flex>
      </BaseDashboard>
      <transition name="component-fade" mode="in-out">
        <BaseDataInfoCard
          v-if="dashboardIsLoading"
          :loading="!dashboardUsersLoaded || !hourChartDataLoaded || !dayChartDataLoaded || !weekChartDataLoaded"
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
      // Users
      selectedUser: state => state.eDropletApp.selectedUser,
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
        return {
          labels: this.hourChartData.map(hourDataPoint => hourDataPoint.label),
          datasets: [{
            label: 'Hydration in litres',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: this.hourChartData.map(hourDataPoint => hourDataPoint.value)
          }]
        }
      } else {
        return false
      }
    },
    weekLineBarChartData () {
      return {
        labels: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        datasets: [{
          label: 'Total in litres for this day',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: this.weekChartData
        }]
      }
    },
    dailyPieChartData () {
      return {
        labels: ['Over Hydrated', 'Hydrated', 'Remaining'],
        datasets: [{
          backgroundColor: ['rgba(255, 97, 111, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(176, 190, 197, 0.2)'],
          borderColor: ['rgba(255, 97, 111, 1)', 'rgba(54, 162, 235, 1)', 'rgba(176, 190, 197, 1)'],
          borderWidth: 1,
          data: [
            this.dayChartData.overHydrated,
            this.dayChartData.hydrated,
            this.dayChartData.remaining
          ],
          weight: 3
        }]
      }
    }
  },
  data () {
    return {
      dashboardIsLoadingTimeout: null,
      dashboardIsLoading: true,
      loadBounce: 500,
      selectedDate: null,
      hourChartType: 'Bar Chart',
      hourChartTypes: [
        { type: 'Bar Chart' },
        { type: 'Line Chart' }
      ],
      menu: false,
      maxDate: this.$moment().format('YYYY-MM-DD'),
    }
  },
  methods: {
    async setUsers () {
      await this.$store.dispatch('fetchDashboardUsersGet')
      this.$store.commit('SET_SELECTED_USER', this.dashboardUsers[0])
    },
    async updateCharts () {
      if (this.selectedUser && this.selectedDate) {
        try {
          let payload = { userId: this.selectedUser.userId, date: this.selectedDate.unix, formattedDate: this.selectedDate.formattedDate }
          await this.$store.dispatch('fetchDashboardHourChartData', payload)
          await this.$store.dispatch('fetchDashboardDayChartData', payload)
          await this.$store.dispatch('fetchDashboardWeekChartData', payload)
        } catch (error) {
          this.chartDataLoadError = true
        }
      }
    },
    updateDashboardStatus () {
      if (this.dashboardUsersLoaded) {
        const self = this
        if (this.dashboardIsLoadingTimeout) {
          clearTimeout(this.dashboardIsLoadingTimeout)
        }
        this.dashboardIsLoadingTimeout = setTimeout(function () {
          self.dashboardIsLoading = false
        }, this.loadBounce)
      } else {
        this.dashboardIsLoading = true
      }
    }
  },
  mounted () {
    this.setUsers()
    this.$watch(
      (vm) => (
        vm.selectedDate, vm.selectedUser, Date.now()),
      function () {
        this.updateDashboardStatus()
        this.updateCharts()
      }
    )
  },
  destroyed () {
    console.log('Im destroyed')
    if (this.dashboardIsLoadingTimeout) {
      clearTimeout(this.dashboardIsLoadingTimeout)
    }
    this.$store.dispatch('resetDashboardHourState')
    this.$store.dispatch('resetDashboardDayState')
    this.$store.dispatch('resetDashboardWeekState')
  }
}
</script>

<style lang="scss" scoped>
  @import "./public/scss/main.scss";

.chart-overlay {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
