<template>
  <dashboard-component
    :dashboardUsers="dashboardUsers"
    :dashboardComment="dashboardComment"
    :dashboardDay="dashboardDay"
    :dashboardHour="dashboardHour"
    :dashboardWeek="dashboardWeek"
    @dateChange="updateCharts"
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
      weekLoaded: false,
      usersError: false,
      dayError: false,
      hourError: false,
      weekError: false
    }
  },
  methods: {
    updateCharts (selectedDate) {
      const selectedUnixTime = this.$moment(selectedDate).unix()
      this.setHour(selectedUnixTime)
      this.setDay(selectedUnixTime)
      this.setWeek(selectedUnixTime)
    },

    async setUsers () {
      await this.$store.dispatch('fetchDashboardUsersGet')

      if (this.$store.state.dashboardUsers.dashboardUsersGet) {
        this.dashboardUsers = await this.$store.state.dashboardUsers
          .dashboardUsersGet
        this.usersLoaded = true
      } else {
        this.usersError = true
      }
    },

    async setComment () {
      await this.$store.dispatch('fetchDashboardCommentGet')

      if (this.$store.state.DashboardComment.dashboardCommentGet) {
        let commentStore = await this.$store.state.DashboardComment
          .dashboardCommentGet
        for (let index = 0; index < commentStore.length; index++) {
          this.dashboardComment.push(commentStore[index])
        }
      }
    },

    async setHour (selectedUnixTime = Math.round(new Date().getTime() / 1000)) {
      this.hourLoaded = false
      this.hourError = false

      // FIXME: Hardcoded IDs
      this.$store.state.userId = 21
      this.$store.state.date = selectedUnixTime

      await this.$store.dispatch('fetchDashboardHourGet')

      if (this.$store.state.dashboardHour.dashboardHourGet) {
        let hourStore = await this.$store.state.dashboardHour.dashboardHourGet
        for (let index = 0; index < hourStore.length; index++) {
          this.dashboardHour[index] =
            parseFloat(hourStore[index].volumeConsumedByViaOther) +
            parseFloat(hourStore[index].volumeConsumedViaEDroplet)
        }
        this.hourLoaded = true
      } else {
        this.hourError = true
      }
    },

    async setDay (selectedUnixTime = Math.round(new Date().getTime() / 1000)) {
      this.dayLoaded = false
      this.dayError = false

      // FIXME: Hardcoded IDs
      this.$store.state.userId = 21
      this.$store.state.date = selectedUnixTime

      await this.$store.dispatch('fetchDashboardDayGet')

      if (this.$store.state.dashboardDay.dashboardDayGet) {
        this.dashboardDay = this.$store.state.dashboardDay.dashboardDayGet
        this.dayLoaded = true
      } else {
        this.dayError = true
      }
    },

    async setWeek (selectedUnixTime = Math.round(new Date().getTime() / 1000)) {
      this.weekLoaded = false
      this.weekError = false

      // FIXME: Hardcoded IDs
      this.$store.state.userId = 21
      this.$store.state.date = selectedUnixTime

      await this.$store.dispatch('fetchDashboardWeekGet')

      if (this.$store.state.dashboardWeek.dashboardWeekGet) {
        this.dashboardWeek = await this.$store.state.dashboardWeek
          .dashboardWeekGet
        this.weekLoaded = true
      } else {
        this.weekError = true
      }
    }
  },
  mounted () {
    this.setUsers()
    this.setComment()
  }
}
</script>
