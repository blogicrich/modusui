<template>
  <keep-alive>
    <BaseDashboard
      v-if="!dashboardIsLoading"
      :cardHeight="cardHeight"
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
      <v-flex ref="tileOne" slot="tileOne">
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
          :chartData="getterHourLineBarChartData"
        />
        <SubHourlyHydrationBarChart
          ref="hourBarChart"
          v-if="hourChartData && hourChartType === 'Bar Chart'"
          :chartData="getterHourLineBarChartData"
        />
        <BaseDashboardTileOverlay
          v-if="!hourChartDataLoaded"
          message="No data for selected user or date"
        ></BaseDashboardTileOverlay>
      </v-flex>
      <v-flex slot="tileTwo">
        <p
          class="text-secondary text-center table-header text-ellipsis"
          >{{ 'eDroplet Drinks Total: ' + drinksTotal }}
        </p>
        <v-list
          :style="'max-height:' + listHeight"
          class="tile-overflow"
          three-line dense
          :max-height="cardHeight"
        >
          <template v-for="(item, index) in drinks">

            <v-divider :key="index + '-divider'"></v-divider>

            <v-list-tile
              :key="index + '-macaddress'"
            >
              <v-list-tile-avatar>
                <v-icon :color="$vuetify.theme.primary">local_drink</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="text-secondary" v-html="'eDroplet: ' + item.macAddress + '/' + item.friendlyName"></v-list-tile-title>
                <v-list-tile-sub-title class="text-primary" v-html="'Time: ' + $moment.utc(item.dateTime*1000).format('dddd, MMMM Do YYYY, h:mm:ss a')"></v-list-tile-sub-title>
                <v-list-tile-sub-title class="text-primary" v-html="'Amount: ' + item.volumeInLitres + ' L'"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <BaseDashboardTileOverlay
          v-if="!dayChartDataLoaded"
          message="No data for selected user or date"
        ></BaseDashboardTileOverlay>
      </v-flex>
      <v-flex slot="tileThree">
        <BaseChartHeader v-if="weekChartDataLoaded">
          <p slot="header" class="table-header text-secondary text-bold align-center mt-2">{{ weekChartTitle }}</p>
        </BaseChartHeader>
        <SubWeeklyHydrationBarChart
          ref="weeklyBarChart"
          :chartData="getterWeekLineBarChartData"
        />
        <BaseDashboardTileOverlay
          v-if="!weekChartDataLoaded"
          message="No data for selected user or date"
        ></BaseDashboardTileOverlay>
      </v-flex>
      <v-flex slot="tileFour">
        <BaseChartHeader v-if="dayChartDataLoaded">
          <p slot="header" class="table-header text-secondary text-bold align-center mt-2">{{ dayChartTitle }}</p>
        </BaseChartHeader>
        <SubHydrationDayPieChart
          ref="percentHydratedChart"
          :chartData="getterDailyPieChartData"
        />
        <BaseDashboardTileOverlay
          v-if="!dayChartDataLoaded"
          message="No data for selected user or date"
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
import BaseDataTable from '@/components/base/BaseDataTableComponent'
import SubHourlyHydrationLineChart from '@/components/sub/SubHourlyHydrationLineChart'
import SubHourlyHydrationBarChart from '@/components/sub/SubHourlyHydrationBarChart'
import SubHydrationDayPieChart from '@/components/sub/SubHydrationDayPieChart'
import SubWeeklyHydrationBarChart from '@/components/sub/SubWeeklyHydrationBarChart'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'eDropletDashboard',
  components: {
    BaseDashboard,
    BaseDashboardTileOverlay,
    BaseDataInfoCard,
    BaseDateSelection,
    BaseDataTable,
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
      // Drinks
      drinks: state => state.dashboardDrinks.drinks,
      drinksLoading: state => state.dashboardDrinks.drinksLoading,
      drinksTotal: state => state.dashboardDrinks.drinksTotal,
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
    ...mapGetters([
      'getterHourLineBarChartData',
      'getterWeekLineBarChartData',
      'getterDailyPieChartData'
    ]),
    cardHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '522px'
        case 'sm': return '522px'
        case 'md': return '522px'
        case 'lg': return '522px'
        case 'xl': return '522px'
      }
    },
    listHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '422px'
        case 'sm': return '422px'
        case 'md': return '422px'
        case 'lg': return '422px'
        case 'xl': return '422px'
      }
    }
  },
  data () {
    return {
      // Dashboard
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
        console.log('POLLING')
        await self.updateCharts()
      }, this.dashboardPollRate)
    },
    // Dashboard Update
    async updateCharts () {
      if (this.selectedUser && this.selectedDate) {
        let arr = []
        const date = this.$moment.utc(this.selectedDate).unix()
        const payload = { userId: this.selectedUser.userId, date: date, formattedDate: this.formattedDate }

        arr.push(this.$store.dispatch('fetchDashboardHourChartData', payload))
        arr.push(this.$store.dispatch('fetchDashboardDayChartData', payload))
        arr.push(this.$store.dispatch('fetchDashboardWeekChartData', payload))
        arr.push(this.$store.dispatch('fetchDashboardDrinks', payload))

        Promise.all(arr)
      }
    },
    updateDashboardLoadStatus () {
      const self = this
      this.dashboardLoadingTimeout = setTimeout(function setLoadFlag () {
        if (self.dashboardUsersLoaded && self.selectedDate) {
          self.dashboardIsLoading = false
        } else {
          self.updateDashboardLoadStatus()
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
    this.updateDashboardLoadStatus()
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

  .tile-overflow {
    overflow-y: auto;
  }
</style>
