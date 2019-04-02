<template>
  <dashboard-component
    :dashboardUsers="dashboardUsers"
    :dashboardComment="dashboardComment"
    :dashboardDay="dashboardDay"
    :dashboardHour="dashboardHour"
    :dashboardWeek="dashboardWeek"
    @ondatechange="updateCharts(...arguments)"
    :usersLoaded="usersLoaded"
    :hourLoaded="hourLoaded"
    :dayLoaded="dayLoaded"
    :weekLoaded="weekLoaded"
  />
</template>

<script>
import dashboardComponent from '@/components/base/BaseDashboardComponent'

export default {
  components: {
    dashboardComponent
  },
  data () {
    return {
      dashboardDay: {},
      dashboardHour: [],
      dashboardUsers: [],
      dashboardComment: [],
      dashboardWeek: [],
      usersLoaded: false,
      dayLoaded: false,
      hourLoaded: false,
      weekLoaded: false
    }
  },
  methods: {
    updateCharts(SelectedUnixTime) {
      this.setHour(SelectedUnixTime)
      this.setDay()
      this.setWeek(SelectedUnixTime)
    },
    async setUsers() {
      await this.$store.dispatch('fetchDashboardUsersGet')
      if (this.$store.state.dashboardUsers.dashboardUsersGet) { 
        this.dashboardUsers = await this.$store.state.dashboardUsers.dashboardUsersGet
        this.usersLoaded = true
      } else {
        this.usersLoaded = false
      }
    },
    async setComment() {
      await this.$store.dispatch('fetchDashboardCommentGet')
      if (this.$store.state.DashboardComment.dashboardCommentGet) {
        let commentStore = await this.$store.state.DashboardComment.dashboardCommentGet
        for (let index = 0; index < commentStore.length; index++) {
          this.dashboardComment.push(commentStore[index])
        }
      }
    },
    async setHour(SelectedUnixTime = Math.round(new Date().getTime() / 1000)) {
      this.$store.state.userId = 21
      this.$store.state.date = 0
      await this.$store.dispatch('fetchDashboardHourGet')
      if (this.$store.state.dashboardHour.dashboardHourGet.length === 24) {
        let hourStore = await this.$store.state.dashboardHour.dashboardHourGet
        for (let index = 0; index < hourStore.length; index++) {
          this.dashboardHour[index] = parseFloat(hourStore[index].volumeConsumedByViaOther) + parseFloat(hourStore[index].volumeConsumedViaEDroplet)
        }
        this.hourLoaded = true
      } else {
        this.hourLoaded = false
      }
    },
    async setDay() {
      await this.$store.dispatch('fetchDashboardDayGet')
      if (this.$store.state.dashboardDay.dashboardDayGet.length === 1) {
        this.dashboardDay = await this.$store.state.dashboardDay.dashboardDayGet
        this.dayLoaded = true
      } else {
        this.dayLoaded = false
      }
    },
    async setWeek(SelectedUnixTime) {
      this.$store.state.userId = 21
      this.$store.state.date = 1552521600
      await this.$store.dispatch('fetchDashboardWeekGet')
      if (this.$store.state.dashboardWeek.dashboardWeekGet.length === 7) {
        this.dashboardWeek = await this.$store.state.dashboardWeek.dashboardWeekGet
        this.weekLoaded = true
      } else {
        this.weekLoaded = false
      }
    }
  },
  mounted () {
    this.setUsers()
    this.setComment()
  }
}
</script>
