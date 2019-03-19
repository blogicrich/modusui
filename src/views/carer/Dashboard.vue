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
import { EventBus } from '@/mixins/eventBus'

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
      dashboardComment: [],
      SelectedUnixTime: '',
      childData: []
    }
  },
  methods: {
    changeDate (newDate = 0, childData = undefined) {
      let SelectedUnixTime = Math.round(new Date(newDate).getTime() / 1000)
      this.SelectedUnixTime = SelectedUnixTime
      //this.setDay()
      // this.setUsers()
      //this.setComment()
      this.childData = childData
      this.update = true
      setTimeout(() => {
        this.update = false
      }, 50)
    },
    formatDate (date) {
      var monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]

      var day = date.getDate()
      var monthIndex = date.getMonth()
      var year = date.getFullYear()

      return day + ' ' + monthNames[monthIndex] + ' ' + year
    },

    setBarPoints() {
      for (let point = 0; point < this.dashboardDay.length; point++) {
        this.childData.barChartData.dataBarOne[point] = this.dashboardDay[
          point
        ].aggregatedHyration
      }
    },
    async setUsers() {
      await this.$store.dispatch('fetchDashboardUsersGet')
      if (this.$store.state.dashboardUsers.dashboardUsersGet) {
        let store = this.$store.state.dashboardUsers.dashboardUsersGet
        for (let index = 0; index < store.length; index++) {
          const element = store[index]
          this.dashboardUsers = element
        }
      }
    },
    async setComment() {
      await this.$store.dispatch('fetchDashboardCommentGet')
      if (this.$store.state.DashboardComment.dashboardCommentGet) {
        let commentStore = this.$store.state.DashboardComment
          .dashboardCommentGet
        for (let index = 0; index < commentStore.length; index++) {
          const element = commentStore[index]
          this.dashboardComment.push(element)
        }
      }
    },
    async setHour(SelectedUnixTime, chart) {
      this.$store.state.date = 0
      console.log('setHour: ', chart)
      await this.$store.dispatch('fetchDashboardHourGet')
      if (this.$store.state.dashboardHour.dashboardHourGet) {
        let hourStore = await this.$store.state.dashboardHour.dashboardHourGet
        for (let index = 0; index < hourStore.length; index++) {
          chart.data.datasets[0][index] = parseFloat(hourStore[index].volumeConsumedByViaOther) + parseFloat(hourStore[index].volumeConsumedViaEDroplet)
        }
        chart.config.options.title.text = 'Activity on ' + this.formatDate(new Date(this.SelectedUnixTime * 1000))
      }
    },
    async setDay() {
      await this.$store.dispatch('fetchDashboardDayGet')
      if (this.$store.state.dashboardDay.dashboardDayGet) {
        let dayStore = this.$store.state.dashboardDay.dashboardDayGet
        for (let index = 0; index < dayStore.length; index++) {
          // this.childData.doughnutChartData.dataDoughnut[0] = parseFloat(dayStore[index].aggregatedHyration)
          // this.childData.doughnutChartData.dataDoughnut[1] = parseInt(parseFloat(dayStore[index].hydrationTarget) - parseFloat(dayStore[index].aggregatedHyration))
          // this.childData.doughnutChartData.title = dayStore[index].aggregatedHyration + 'L / ' + dayStore[index].hydrationTarget + 'L'
        }
      }
    }
  },
  async mounted() {
    this.$store.state.userId = 21
    // this.setHour(Math.round(new Date().getTime() / 1000))
    this.setDay()
    EventBus.$on('updateLine', chart => {
      this.setHour(Math.round(new Date().getTime() / 1000), chart)
      console.log('chart update: ', chart)
    })
  }
}

</script>

<style lang="scss" scoped>
@import "./public/scss/main.scss";
</style>
