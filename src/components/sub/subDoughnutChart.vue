<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
import { EventBus } from '@/mixins/eventBus'

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
      EventBus.$emit('updatedoughnut', this.$data._chart)
      setTimeout(() => {
        this.$data._chart.update()
      }, 200)
    }
  },
  mounted () {
    EventBus.$emit('updatedoughnut', this.$data._chart)
    this.renderChart(this.chartData, this.options)
  }
}
</script>
