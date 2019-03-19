<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
import { EventBus } from '@/mixins/eventBus'

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: Object,
    options: Object,
    update: Boolean
  },
  watch: {
    update: function () {
      EventBus.$emit('updateLine', this.$data._chart)
      this.$data._chart.update()
      // this.renderChart(this.chartData, this.options)
    }
  },
  mounted () {
    EventBus.$emit('update', this.$data._chart)
    this.renderChart(this.chartData, this.options)
  }
}
</script>
