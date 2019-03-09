<template>
<dashboard-component
  :update="update"
  :dashboardUsers="dashboardUsers"
  :dashboardComment="dashboardComment"
  :dashboardDay="dashboardDay"
  :dashboardHour="dashboardHour"
  @onchangedate="changeDate(...arguments)"
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
      update: false,
      dashboardDay: [],
      dashboardHour: [],
      dashboardUsers: [],
      dashboardComment: []
    }
  },
  methods: {
    changeDate: function (newDate, childData) {
      let SelectedUnixTime = Math.round((new Date(newDate)).getTime() / 1000)
      this.$store.state.date = SelectedUnixTime
      this.update = true
      let array = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      for (let point = 0; point < childData.lineChartData.dataLineOne.length; point++) {
        childData.lineChartData.dataLineOne[point] = array[Math.floor(Math.random() * array.length)]
      }

      for (let point = 0; point < childData.barChartData.dataBarOne.length; point++) {
        childData.barChartData.dataBarOne[point] = array[Math.floor(Math.random() * array.length)]
      }

      for (let point = 0; point < childData.doughnutChartData.dataDoughnut.length; point++) {
        childData.doughnutChartData.dataDoughnut[point] = array[Math.floor(Math.random() * array.length)]
      }
      setTimeout(() => {
        this.update = false
      }, 100)
    },
    async setUsers () {
      await this.$store.dispatch('fetchDashboardUsersGet')
      if (this.$store.state.dashboardUsers.dashboardUsersGet) {
        let store = this.$store.state.dashboardUsers.dashboardUsersGet
        for (let index = 0; index < store.length; index++) {
          const element = store[index]
          this.dashboardUsers.push(element)
        }
      }
    },
    async setComment () {
      await this.$store.dispatch('fetchDashboardCommentGet')
      if (this.$store.state.dashboardComment.dashboardCommentGet) {
        let commentStore = this.$store.state.dashboardComment.dashboardCommentGet
        for (let index = 0; index < commentStore.length; index++) {
          const element = commentStore[index]
          this.dashboardComment.push(element)
        }
      }
    },
    async setHour () {
      await this.$store.dispatch('fetchDashboardHourGet')
      if (this.$store.state.dashboardHour.dashboardHourGet) {
        let hourStore = this.$store.state.dashboardHour.dashboardHourGet
        for (let index = 0; index < hourStore.length; index++) {
          const element = hourStore[index]
          this.dashboardHour.push(element)
        }
      }
    },
    async setDay () {
      await this.$store.dispatch('fetchDashboardDayGet')
      if (this.$store.state.dashboardDay.dashboardDayGet) {
        let dayStore = this.$store.state.dashboardDay.dashboardDayGet
        for (let index = 0; index < dayStore.length; index++) {
          const element = dayStore[index]
          this.dashboardDay.push(element)
        }
      }
    },
  },
  async mounted () {
    this.$store.state.carerId = 12
    this.setUsers()
    this.setComment()  
    this.setDay()
    this.setHour()
  }
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
</style>
