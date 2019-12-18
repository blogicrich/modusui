<template>
    <dashboard-component
        :dashboardUsers="dashboardUsers"
        :dashboardComment="dashboardComment"
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

export default {
  components: {
    dashboardComponent
  },
  data () {
    return {
      selectedDate: null,
      selectedUser: null,
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
      this.selectedUser = selectedUser
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

    async setComment () {
      await this.$store.dispatch('fetchDashboardCommentGet')

      if (this.$store.state.DashboardComment.dashboardCommentGet) {
        let commentStore = this.$store.state.DashboardComment
          .dashboardCommentGet
        for (let index = 0; index < commentStore.length; index++) {
          this.dashboardComment.push(commentStore[index])
        }
      }
    },

    async setHour () {
      this.hourLoaded = false
      this.hourError = false

      await this.$store.dispatch('fetchDashboardHourGet', { userId: this.selectedUser.userId, date: this.selectedDate })

      if (this.$store.state.dashboardHour.dashboardHourGet) {
        let hourStore = this.$store.state.dashboardHour.dashboardHourGet
        for (let index = 0; index < hourStore.length; index++) {
          this.dashboardHour[index] =
            parseFloat(hourStore[index].volumeConsumedViaOther) +
            parseFloat(hourStore[index].volumeConsumedViaEDroplet)
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

      if (this.$store.state.dashboardDay.dashboardDayGet) {
        this.dashboardDay = this.$store.state.dashboardDay.dashboardDayGet
        this.dayLoaded = true
      } else {
        this.dayError = true
      }
    },

    async setWeek () {
      this.weekLoaded = false
      this.weekError = false

      await this.$store.dispatch('fetchDashboardWeekGet', { userId: this.selectedUser.userId, date: this.selectedDate })

      if (this.$store.state.dashboardWeek.dashboardWeekGet) {
        this.dashboardWeek = this.$store.state.dashboardWeek
          .dashboardWeekGet
        this.weekLoaded = true
      } else {
        this.weekError = true
      }
    }
  },
  mounted () {
    this.setUsers()
    // FIXME: Comments are broken, uses hardcoded IDs
    // this.setComment()
  }
}
</script>
