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
    update () {
      if (this.update) {
        EventBus.$emit('updateline', this.$data._chart)
        console.log('updateLine executed')
        setTimeout(() => {
          this.$data._chart.update()
        }, 200)
      }
    }
  },
  mounted () {
    EventBus.$emit('updateline', this.$data._chart)
    this.renderChart(this.chartData, this.options)
            setTimeout(() => {
          this.$data._chart.update()
        }, 200)
  }
}
</script>
