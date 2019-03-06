<template>
<dashboard-component :update="update" @onchangedate="changeDate(...arguments)"/>
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
      dashboardDay: null,
      dashboardHour: null,
      dashboardUsers: null,
      dashboardComment: null
    }
  },
  methods: {
    dispatchAPIData () {
      this.$store.state.userId = 2
      this.$store.dispatch('fetchDashboardDay').then((response) => this.dashboardDay = response)
      this.$store.dispatch('fetchDashboardHour').then((response) => this.dashboardHour = response)
      this.$store.dispatch('fetchDashboardComment').then((response) => this.dashboardComment = response)
      this.$store.dispatch('fetchDashboardUsers').then((response) => this.dashboardUsers = response)
      console.log(this.dashboardUsers)
    },
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
        this.dispatchAPIData()
        console.log(this.apiData)
      }, 100)
    }
  },
  mounted () {
    this.dispatchAPIData()
  }
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
</style>
