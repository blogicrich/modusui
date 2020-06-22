
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['chartTitle', 'chartData'],
  data () {
    return {
      chartOptions: {
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 65,
        title: {
          display: true,
          fontSize: 16
        }
      }
    }
  },
  watch: {
    chartData () {
      this.renderChart(this.chartData, this.chartOptions)
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
