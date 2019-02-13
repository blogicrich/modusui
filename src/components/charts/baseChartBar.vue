<template lang="html">
  <v-content>
    <canvas ref="players"></canvas>
  </v-content>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'chartBarComp',
  props: {
    barData: Object
    /*
      data neded for this chart:

      labels: Array,
      labelTarget: String,
      labelConditional: String,
      labelLiters: String,
      dataTarget: Array,
      dataConditional: Array,
      dataLiters: Array,
      borderColorTarget: String, // rgba
      borderColorConditional: String, // rgba
      backgroundColorLiters: Array, // rgba
      borderWidthLiters: Number
    */
  },
  mounted () {
    let chart = this.$refs.players
    let ctx = chart.getContext('2d')
    let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.barData.labels,
        datasets: [{
          type: 'line',
          label: this.barData.labelTarget,
          data: this.barData.dataTarget,
          fill: false,
          borderColor: [
            this.barData.borderColorTarget
          ],
          borderWidth: this.barData.borderWidthTarget
        },
        {
          type: 'line',
          label: this.barData.labelConditional,
          data: this.barData.dataConditional,
          fill: false,
          borderColor: [
            this.barData.borderColorConditional
          ],
          borderWidth: this.barData.borderWidthConditional
        },
        {
          type: 'bar',
          label: this.barData.labelLiters,
          data: this.barData.dataLiters,
          backgroundColor: this.barData.backgroundColorLiters,
          borderWidth: this.barData.borderWidthLiters
        }]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              offsetGridLines: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }
}
</script>

<style lang="css" scoped>
</style>
