import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartTitle', 'chartData'],
  data () {
    return {
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        spanGaps: true,
        elements: {
          point: {
            radius: 2.5
          },
          line: {
            tension: 0
          }
        },
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
