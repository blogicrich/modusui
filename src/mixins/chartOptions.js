export const chartMixin = {
  methods: {
    fillDataLine () {
      this.datacollection = {
        labels: this.lineChartData.labels,
        datasets: [{
          label: this.lineChartData.labelLineOne,
          data: this.lineChartData.dataLineOne,
          borderColor: this.lineChartData.borderColorLineOne,
          backgroundColor: this.lineChartData.backgroundColorLineOne,
          borderWidth: this.lineChartData.borderWidthLineOne
        },
        {
          type: 'line',
          label: this.lineChartData.labelLineTwo,
          data: this.lineChartData.dataLineTwo,
          fill: false,
          borderColor: this.lineChartData.borderColorLineTwo,
          borderWidth: this.lineChartData.borderWidthLineTwo
        },
        {
          type: 'line',
          label: this.lineChartData.labelLineThree,
          data: this.lineChartData.dataLineThree,
          fill: false,
          borderColor: this.lineChartData.borderColorLineThree,
          borderWidth: this.lineChartData.borderWidthLineThree
        }]
      }
    },
    fillDataBar () {
      this.datacollection = {
        labels: this.barChartData.labels,
        datasets: [{
          type: 'line',
          label: this.barChartData.labelLineOne,
          data: this.barChartData.dataLineOne,
          fill: false,
          borderColor: this.barChartData.borderColorLineOne,
          borderWidth: this.barChartData.borderWidthLineOne
        },
        {
          type: 'line',
          label: this.barChartData.labelLineTwo,
          data: this.barChartData.dataLineTwo,
          fill: false,
          borderColor: this.barChartData.borderColorLineTwo,
          borderWidth: this.barChartData.borderWidthLineTwo
        },
        {
          type: 'bar',
          label: this.barChartData.labelBarOne,
          data: this.barChartData.dataBarOne,
          borderColor: this.barChartData.borderColorBarOne,
          backgroundColor: this.barChartData.backgroundColorBarOne,
          borderWidth: this.barChartData.borderWidthBarOne
        }]
      }
    },
    fillDataDoughnut () {
      this.datacollection = {
        labels: this.doughnutChartData.labels,
        datasets: [{
          data: this.doughnutChartData.dataDoughnut,
          borderColor: this.doughnutChartData.borderColorDoughnut,
          backgroundColor: this.doughnutChartData.backgroundColorDoughnut,
          borderWidth: this.doughnutChartData.borderWidthDoughnut
        }]
      }
    }
  }
}
