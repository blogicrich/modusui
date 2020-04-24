<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
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
  computed: {
    chartDataConverted () {
      return {
        labels: this.chartData.map(hourDataPoint => hourDataPoint.label),
        datasets: [{
          label: 'Hydration in litres',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: this.chartData.map(hourDataPoint => hourDataPoint.value.toFixed(2))
        }]
      }
    }
  },
  mounted () {
    this.renderChart(this.chartDataConverted, this.chartOptions)
  }
}
</script>
