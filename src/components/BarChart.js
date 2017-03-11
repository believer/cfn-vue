import { Bar, mixins } from 'vue-chartjs'

export default Bar.extend({
  mixins: [mixins.reactiveProp],
  mounted () {
    this.renderChart(this.chartData)
  }
})
