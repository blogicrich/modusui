<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: Object,
    options: Object
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
