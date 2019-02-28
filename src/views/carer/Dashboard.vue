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
      update: false
    }
  },
  methods: {
    changeDate: function (newDate, childData) {
      let SelectedUnixTime = Math.round((new Date(newDate)).getTime() / 1000)
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
</style>
