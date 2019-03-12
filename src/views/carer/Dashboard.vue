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
    changeDate (newDate, childData) {
      let SelectedUnixTime = Math.round((new Date(newDate)).getTime() / 1000)
      this.$store.state.date = 86400
      this.update = true
      let array = [0.5, 0.7, 0.8, 0.9, 1.0, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8]
      for (let point = 0; point < this.dashboardHour.length; point++) {
        childData.lineChartData.dataLineOne[point] = array[Math.floor(Math.random() * array.length)]
        // childData.lineChartData.dataLineOne[point] = parseFloat(this.dashboardHour[point].volumeConsumedByViaOther) + parseFloat(this.dashboardHour[point].volumeConsumedViaEDroplet)
        // childData.lineChartData.labels[point] = this.dashboardHour[point].hour
      }

      for (let point = 0; point < this.dashboardDay.length; point++) {
        // childData.barChartData.dataBarOne[point] = this.dashboardDay[point].aggregatedHyration
        childData.barChartData.dataBarOne[point] = array[Math.floor(Math.random() * array.length)]
      }

      for (let point = 0; point < this.dashboardDay.length; point++) {
        // childData.doughnutChartData.dataDoughnut[point] = this.dashboardDay[point].hydrationTarget + this.dashboardDay[point].volumeConsumedViaEDroplet
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
      if (this.$store.state.DashboardComment.dashboardCommentGet) {
        let commentStore = this.$store.state.DashboardComment.dashboardCommentGet
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
    this.$store.state.date = 0
    this.$store.state.userId = 21
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
