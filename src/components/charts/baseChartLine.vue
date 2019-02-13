<template lang="html">
  <v-content>
    <canvas ref="players"></canvas>
  </v-content>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'chartLineComp',
  props: {
    lineData: Object
    /*
      data neded for this chart:

      labels: Array,
      labelLiters: String,
      labelTarget: String,
      labelConditional: String,
      dataLiters: Array,
      dataTarget: Array,
      dataConditional: Array,
      backgroundColorLiters: String, // rgba
      borderColorLiters: String, // rgba
      borderColorTarget: String, // rgba
      borderColorConditional: String, // rgba
      borderWidthLiters: Number,
      borderWidthTarget: Number,
      borderWidthConditional: Number
    */
  },
  mounted () {
    let chart = this.$refs.players
    let ctx = chart.getContext('2d')
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.lineData.labels,
        datasets: [{
          label: this.lineData.labelLiters,
          data: this.lineData.dataLiters,
          backgroundColor: [
            this.lineData.backgroundColorLiters
          ],
          borderColor: [
            this.lineData.borderColorLiters
          ],
          borderWidth: this.lineData.borderWidthLiters
        },
        {
          label: this.lineData.labelTarget,
          data: this.lineData.dataTarget,
          type: 'line',
          fill: false,
          borderColor: [
            this.lineData.borderColorTarget
          ],
          borderWidth: this.lineData.borderWidthTarget
        },
        {
          label: this.lineData.labelConditional,
          data: this.lineData.dataConditional,
          type: 'line',
          fill: false,
          borderColor: [
            this.lineData.borderColorConditional
          ],
          borderWidth: this.lineData.borderWidthConditional
        }]
      },
      options: {
        scales: {
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

<style lang="scss" scoped>

</style>
