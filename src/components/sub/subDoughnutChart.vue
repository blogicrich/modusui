<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  watch: {
    'options': {
      handler(newOption, oldOption) {
        this.renderChart(this.chartData, this.options)
      },
      deep: true
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
