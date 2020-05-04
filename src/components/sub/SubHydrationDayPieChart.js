
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    chartTitle: {
      type: String
    },
    chartData: {
      type: Object // Expects object with the following values: overHydrated, target, consumed and remaining
    },
    options: {
      type: Object
    }
  },
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
          fontSize: 16,
          text: this.chartTitle
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
        labels: ['Over Hydrated', 'Hydrated', 'Remaining'],
        datasets: [{
          backgroundColor: ['rgba(255, 97, 111, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(176, 190, 197, 0.2)'],
          borderColor: ['rgba(255, 97, 111, 1)', 'rgba(54, 162, 235, 1)', 'rgba(176, 190, 197, 1)'],
          borderWidth: 1,
          data: [
            this.chartData.overHydrated.toFixed(2),
            this.chartData.hydrated.toFixed(2),
            this.chartData.remaining.toFixed(2)
          ],
          weight: 3
        }]
      }
    }
  },
  mounted () {
    // console.log(this.chartData.overHydrated.toFixed(2))
    this.renderChart(this.chartDataConverted, this.chartOptions)
  }
}
