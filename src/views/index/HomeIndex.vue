<template>
  <div>
    <el-row style="margin-bottom: 20px;" :gutter="20" class="total">
      <el-col :span="6">
        <el-card shadow="always" class="in">
          <div class="word fl">
            <p>本月共进</p>
            <p style="font-weight: bold;">6588</p>
            <p>+20.12%
              <span style="font-size: 12px;">与上月相比</span>
            </p>
          </div>
          <i class="el-icon-tickets fr ico"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="out">
          <div class="word fl">
            <p>本月放款(元)</p>
            <p style="font-weight: bold;">121000000</p>
            <p>+1.25%
              <span style="font-size: 12px;">与上月相比</span>
            </p>
            
          </div>
          <i class="el-icon-money fr ico"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="layout">
          <div class="word fl">
            <p>累计进件</p>
            <p style="font-weight: bold;">128700</p>
            <p>+11.48%
              <span style="font-size: 12px;">与上月相比</span>
            </p>
          </div>
          <i class="el-icon-date fr ico"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="send">
          <div class="word fl">
            <p>累计放款</p>
            <p style="font-weight: bold;">923380079</p>
            <p>-2.06%
              <span style="font-size: 12px;">与上月相比</span>
            </p>
          </div>
          <i class="el-icon-coin fr ico"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
</el-row>
    <el-row :gutter="24">
        <el-col :span="18">
          <el-card>
            <div slot="header">进行统计分析</div>
            <div style="height: 240px;" ref="line">内容</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header" >进行统计分析</div>
            <div style="height: 240px ;" ref="pine">内容</div>
          </el-card>
        </el-col>
    </el-row>
    <el-row :gutter="24" class="mt">
     <el-col :span="12">
          <el-card>
            <el-timeline>
    <el-timeline-item timestamp="2018/4/12" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/12 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
          </el-card>
    </el-col>
     <el-col :span="12">
      <el-card>
        <el-calendar v-model="date"></el-calendar>
      </el-card>
    </el-col>
    </el-row>

  </div>
</template>

<script>
import * as echarts from 'echarts'; //图表
import { get } from '@/utils/http'; //使用了接口
export default {
        data(){
          return {
            date:new Date()
          }
        },
        mounted(){
          //3 调用方法
          this.darLine(),
          this.darwpie()
        },
        methods:{
         async darLine(){
            //1准备一个容器 
            var myChart = echarts.init(this.$refs.line);
            const {data}=await get("/line"); //解构赋值，data是后端数据里面的data
            let keys=[]
            let valus=[]
            for(let key in data){
              keys.push(key) //得到data里的属姓名
              valus.push(data[key]) //得到data数据里面的属性值
            }
            //2 图标配置项
          const option = {
            tooltip: {
                  trigger: 'axis'
                },
                  xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: keys //后端数据动态
                  },
                  yAxis: {
                    type: 'value'
                  },  
                  series: [
                    {
                      data: valus,//后端数据动态
                      type: 'line',
                      smooth:true,
                      areaStyle: {
                        color:{
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                              offset: 0, 
                              color: '#4f88ff' // 0% 处的颜色
                          }, {
                              offset: 1, 
                              color: 'white' // 100% 处的颜色
                          }],
                          global: false, // 缺省为 false
                        }
                      }
                    }
              ]
              };
              //生成图表  
              myChart.setOption(option);
            },
            darwpie(){
              var myChart = echarts.init(this.$refs.pine);
              const option={
                tooltip: {
                  trigger: 'item'
                },
                
                series: [
                  {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                      borderRadius: 10,
                      borderColor: '#fff',
                      borderWidth: 2
                    },
                    label: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: 15,
                        fontWeight: 'bold'
                      }
                    },
                    labelLine: {
                      show: false
                    },
                    data: [
                      { value: 1048, name: 'Search Engine' },
                      { value: 735, name: 'Direct' },
                      { value: 580, name: 'Email' },
                      { value: 484, name: 'Union Ads' },
                      { value: 300, name: 'Video Ads' }
                    ]
                  }
                ]
            };
            myChart.setOption(option);
          }
          },
        }
</script>

<style lang="less" scoped>
.total{
  p{
    line-height: 30px;
    font-size: 16px;
    color:#fff;
  } 
}
  
  .in{
    background-color: #4f88ff;
  }
  .ico{
    font-size: 90px;
    color:rgba(255, 255, 255, 0.3); 
      }
      .out{
        background: #f26075;
      }
      .layout{
        background-color: blue;
      }
     .send{
      background-color:salmon;
     }

</style>