// <script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['chartTitle', 'chartData'],
  data () {
    return {
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        spanGaps: true,
        title: {
          display: true,
          fontSize: 16
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 2,
              stepSize: 0.2
            }
          }]
        }
      }
    }
  },
  watch: {
    chartData () {
      this.$data._chart.update()
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
