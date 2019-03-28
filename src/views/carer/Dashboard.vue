<template>
  <dashboard-component
    :dashboardUsers="dashboardUsers"
    :dashboardComment="dashboardComment"
    :dashboardDay="dashboardDay"
    :dashboardHour="dashboardHour"
    @ondatechange="updateCharts(...arguments)"
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
      dashboardComment: []
    }
  },
  methods: {
    updateCharts(SelectedUnixTime) {
      this.setHour(SelectedUnixTime)
      this.setDay()
    },
    async setUsers() {
      await this.$store.dispatch('fetchDashboardUsersGet')
      if (this.$store.state.dashboardUsers.dashboardUsersGet) { 
        this.dashboardUsers = await this.$store.state.dashboardUsers.dashboardUsersGet
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
      if (this.$store.state.dashboardHour.dashboardHourGet) {
        let hourStore = await this.$store.state.dashboardHour.dashboardHourGet
        for (let index = 0; index < hourStore.length; index++) {
          this.dashboardHour[index] = parseFloat(hourStore[index].volumeConsumedByViaOther) + parseFloat(hourStore[index].volumeConsumedViaEDroplet)
        }
      }
    },
    async setDay() {
      await this.$store.dispatch('fetchDashboardDayGet')
      if (this.$store.state.dashboardDay.dashboardDayGet) {
        this.dashboardDay = this.$store.state.dashboardDay.dashboardDayGet
      }
    }
  },
  mounted () {
    this.setUsers()
    this.setComment()
  }
}
</script>
