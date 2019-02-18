<template lang="html">
  <v-content>
    <canvas ref="players"></canvas>
  </v-content>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'chartDoughnutComp',
  props: {
    doughnutData: Object
    /*
      data neded for this chart:

      labels: Array,
      dataLiters: Array,
      backgroundColorLiters: Array, // rgba
      cutoutPercentageLiters: Number
    */
  }
  mounted () {
    let chart = this.$refs.players
    let ctx = chart.getContext('2d')
    let myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.doughnutData.labels,
        datasets: [{
          data: this.doughnutData.dataLiters,
          backgroundColor: this.doughnutData.backgroundColorLiters
        }]
      },
      options: {
        cutoutPercentage: this.doughnutData.cutoutPercentageLiters
      }
    })
  }
}
</script>

<style lang="css" scoped>

</style>
