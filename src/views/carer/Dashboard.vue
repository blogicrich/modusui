<template>
  <dashboard-component
    :dashboardUsers="dashboardUsers"
    :dashboardDay="dashboardDay"
    :dashboardHour="dashboardHour"
    :dashboardWeek="dashboardWeek"
    @refresh="updateCharts"
    @dateChange="updateDate"
    @userChange="updateUser"
    :selectedUser="selectedUser"
    :usersLoaded="usersLoaded"
    :hourLoaded="hourLoaded"
    :dayLoaded="dayLoaded"
    :weekLoaded="weekLoaded"
    :usersError="usersError"
    :hourError="hourError"
    :dayError="dayError"
    :weekError="weekError"
  />
</template>

<script>
import dashboardComponent from '@/components/base/BaseDashboardComponent'
import { mapState } from 'vuex'

export default {
  components: {
    dashboardComponent
  },
  data () {
    return {
      selectedDate: null,
      dashboardDay: {},
      dashboardHour: [],
      dashboardUsers: [],
      dashboardWeek: [],
      usersLoaded: false,
      dayLoaded: false,
      hourLoaded: false,
      weekLoaded: false,
      usersError: false,
      dayError: false,
      hourError: false,
      weekError: false
    }
  },
  methods: {
    updateCharts () {
      if (this.selectedUser && this.selectedDate) {
        this.setHour()
        this.setDay()
        this.setWeek()
      }
    },

    updateDate (date) {
      this.selectedDate = this.$moment.utc(date).unix()
      this.updateCharts()
    },

    updateUser (selectedUser) {
      this.$store.commit('SET_SELECTED_USER', selectedUser)
      this.updateCharts()
    },

    async setUsers () {
      await this.$store.dispatch('fetchDashboardUsersGet')
      this.dashboardUsers = this.$store.state.dashboardUsers.dashboardUsersGet

      if (this.dashboardUsers && this.dashboardUsers.length !== 0) {
        this.usersLoaded = true
        this.updateUser(this.dashboardUsers[0])
        this.updateCharts()
      } else {
        this.usersError = true
        this.hourError = true
        this.weekError = true
        this.dayError = true
      }
    },

    async setHour () {
      this.hourLoaded = false
      this.hourError = false

      await this.$store.dispatch('fetchDashboardHourGet', { userId: this.selectedUser.userId, date: this.selectedDate })

      const hourStore = this.$store.state.dashboardHour.dashboardHourGet
      if (hourStore) {
        for (let i = 0; hourStore.length > i; i++) {
          this.dashboardHour[i] = {
            label: hourStore[i].hour,
            value:
              parseFloat(hourStore[i].volumeConsumedViaOther) +
              parseFloat(hourStore[i].volumeConsumedViaEDroplet)
          }
        }
        this.hourLoaded = true
      } else {
        this.hourError = true
      }
    },

    async setDay () {
      this.dayLoaded = false
      this.dayError = false

      await this.$store.dispatch('fetchDashboardDayGet', { userId: this.selectedUser.userId, date: this.selectedDate })

      const [dashboardDay] = this.$store.state.dashboardDay.dashboardDayGet || []
      if (dashboardDay) {
        const consumed = parseFloat(dashboardDay.volumeConsumedViaEDroplet) + parseFloat(dashboardDay.volumeConsumedViaOther)
        const target = parseFloat(dashboardDay.hydrationTarget)

        let remaining = target - consumed
        let overHydrated = 0

        if (remaining < 0) {
          overHydrated = Math.abs(remaining)
          remaining = 0
        }

        const hydrated = consumed - overHydrated

        this.dashboardDay = {
          hydrated,
          target,
          remaining,
          overHydrated,
          consumed
        }
        this.dayLoaded = true
      } else {
        this.dayError = true
      }
    },

    async setWeek () {
      this.weekLoaded = false
      this.weekError = false

      await this.$store.dispatch('fetchDashboardWeekGet', { userId: this.selectedUser.userId, date: this.selectedDate })

      const dashboardWeek = this.$store.state.dashboardWeek.dashboardWeekGet
      if (dashboardWeek) {
        const dataPoints = dashboardWeek.map(weekDayData =>
          (weekDayData.volumeConsumedViaEDroplet && weekDayData.volumeConsumedViaOther)
            ? (parseFloat(weekDayData.volumeConsumedViaEDroplet) + parseFloat(weekDayData.volumeConsumedViaOther))
            : null
        )

        const filteredDataPoints = dataPoints.filter(
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

        this.dashboardWeek = {
          dataPoints,
          average
        }

        this.weekLoaded = true
      } else {
        this.weekError = true
      }
    }
  },
  mounted () {
    this.setUsers()
  },
  computed: {
    ...mapState({
      selectedUser: state => state.eDropletApp.selectedUser
    })
  }
}
</script>
