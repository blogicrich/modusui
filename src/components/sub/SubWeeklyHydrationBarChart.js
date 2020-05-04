import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartTitle: {
      type: String
    },
    chartData: {
      type: Array // Array with objects with keys: label and value
    }
  },
  data () {
    return {
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        spanGaps: true,
        title: {
          display: true,
          text: this.chartTitle,
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
      this.renderChart(this.chartDataConverted, this.chartOptions)
    }
  },
  computed: {
    chartDataConverted () {
      return {
        labels: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        datasets: [{
          label: 'Total in litres for this day',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: this.chartData
        }]
      }
    }
  },
  mounted () {
    console.log(this.chartData)
    this.renderChart(this.chartDataConverted, this.chartOptions)
  }
}
