<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    chartData: Object,
    options: Object,
    update: Boolean
  },
  watch: {
    update: function () {
      if (this.update) this.renderChart(this.chartData, this.options)
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
