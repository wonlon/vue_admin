<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({userInfo, playerInfo,xData} = {}) {
      this.chart.setOption({
        xAxis: {
          data: xData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 30,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['user','organization','player','media']
        },
        series: [
        {
          name: 'user',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#36a3f7',
              lineStyle: {
                color: '#36a3f7',
                width: 2
              },
              // areaStyle: {
              //   color: '#f3f8ff'
              // }
            }
          },
          // data: actualData,
          data: userInfo,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: 'player',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#40c9c6',
              lineStyle: {
                color: '#40c9c6',
                width: 2
              },
              // areaStyle: {
              //   color: '#40c9c6'
              // }
            }
          },
          data: playerInfo,
          // data: [1,24,5,60,57,89,10,24,5,60,57,89,10],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
        // ,
        // {
        //   name: 'player', itemStyle: {
        //     normal: {
        //       color: '#f4516c',
        //       lineStyle: {
        //         color: '#f4516c',
        //         width: 2
        //       },
        //       // areaStyle: {
        //       //   color: '#f4516c'
        //       // }
        //     }
        //   },
        //   smooth: true,
        //   type: 'line',
        //   // data: expectedData,
        //   data: [12,23,45,66,77,88,100,23,45,66,77,88,100],
        //   animationDuration: 2800,
        //   animationEasing: 'cubicInOut'
        // },
        // {
        //   name: 'media',
        //   smooth: true,
        //   type: 'line',
        //   itemStyle: {
        //     normal: {
        //       color: '#34bfa3',
        //       lineStyle: {
        //         color: '34bfa3',
        //         width: 2
        //       },
        //       // areaStyle: {
        //       //   color: '#34bfa3'
        //       // }
        //     }
        //   },
        //   // data: actualData,
        //   data: [12,34,51,61,52,81,19,34,51,61,52,81,19],
        //   animationDuration: 2800,
        //   animationEasing: 'quadraticOut'
        // }
        ]
      })
    }
  }
}
</script>
