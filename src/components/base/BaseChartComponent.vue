<template lang="html">
  <v-content>
    <lineChart
      v-if="this.chartType == 'Line'"
      :chart-data="datacollection"
      :options="optionsLine"
    />
    <barChart
      v-else-if="this.chartType == 'Bar'"
      :chart-data="datacollection"
      :options="optionsBar"
    />
    <doughnutChart
      v-else-if="this.chartType == 'Doughnut'"
      :chart-data="datacollection"
      :options="optionsDoughnut"
    />
  </v-content>
</template>

<script>
import lineChart from '@/components/sub/subLineChart'
import barChart from '@/components/sub/subBarChart'
import doughnutChart from '@/components/sub/subDoughnutChart'
import { chartMixin } from '@/mixins/chartOptions'

export default {
  name: 'chart-page',
  mixins: [chartMixin],
  props: [ 'chartData', 'chartType' ],
  components: {
    lineChart,
    barChart,
    doughnutChart
  },
  data () {
    return {
      datacollection: null,
      optionsLine: null,
      optionsBar: null,
      optionsDoughnut: null,
      lineChartData: null,
      barChartData: null,
      doughnutChartData: null
    }
  },
  watch: {
    chartData () {
      this.fillChart()
    }
  },
  methods: {
    fillChart () {
      switch (this.chartType) {
        case 'Line':
          this.lineChartData = this.chartData
          this.fillDataLine()
          break
        case 'Bar':
          this.barChartData = this.chartData
          this.fillDataBar()
          break
        case 'Doughnut':
          this.doughnutChartData = this.chartData
          this.fillDataDoughnut()
          break
      }
    }
  },
  mounted () {
    this.fillChart()
  }
}
</script>

<style lang="css" scoped>

</style>
