<template>
    <!--订单列表页面-->
  <div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in getbreadlist" :key="index">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
      <el-card class="mt">
        <el-row>
          <el-col :span="6">
        <el-input placeholder="请输入订单号或名字" 
        v-model="params.keyword" 
        class="input-with-select">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</el-col>
      <el-col :span="6" :offset="12" class="buy">
      <el-button  type="primary" @click="visible=true">新建订单</el-button>
      <el-button :disabled="!select.length" @click="operate(1)">审核</el-button>
      <el-button :disabled="!select.length" @click="operate(2)">修改</el-button>
      <el-button :disabled="!select.length" @click="operate(3)">作废</el-button>
      </el-col>
      
        </el-row>
      </el-card>   
      <el-card class="mt">
        <el-table 
        :data="tableData" 
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column  prop="id"  label="订单号" width="100" fixed="left"></el-table-column>
          <el-table-column  prop="status"  label="状态" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.status==1">待审核</span>
                <span v-else-if="scope.row.status==2">已审核</span>
                <span v-else-if="scope.row.status==3">审核通过</span>
                <span v-else>审核</span>
              </template>
          </el-table-column>
          <el-table-column  prop="date"  label="下单时间" width="180"></el-table-column>
          <el-table-column  prop="name"  label="客户名称" width="180"></el-table-column>
          <el-table-column  prop="start"  label="起始城市" width="180"></el-table-column>
          <el-table-column  prop="end"  label="目的城市" width="180"></el-table-column>
          <el-table-column  prop="cargo"  label="货物名称" width="180" ></el-table-column>
          <el-table-column  prop="count"  label="伴数" width="80"></el-table-column>
          <el-table-column  prop="unit"  label="单位" width="80"></el-table-column>
          <el-table-column  prop="price"  label="运费" width="80"></el-table-column>
          <el-table-column  prop="from"  label="订单来源" width="80"></el-table-column>
          <el-table-column  prop="pay"  label="是否支付" width="80">
            <template slot-scope="scope">
              {{ scope.row.pay==1?"已支付":"未支付" }}
            </template>
          </el-table-column>
          <el-table-column  label="操作" width="180" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
            
          </el-table-column>
        </el-table>
        <el-pagination
        class="mt fr mb"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
      </el-card> 
      <order-action :visible="visible" @hide="visible=false" @reload="loadDate"></order-action>
  </div>
</template>

<script>
import  breadCrumb  from '@/mixins/breadCrumb';
import { post } from '@/utils/http';
import OrderAction from './OrderAction.vue'
import { mapMutations } from 'vuex';
export default {
               mixins:[breadCrumb], //使用mixins写面包屑导航
               data(){
                return {
                  visible:false,
                  loading:false,
                  tableData: [],
                  total:0,
                  params:{
                    page:1, //默认的当前页码为一
                    pageSize:10,
                    keyword:"",
                  },
                  select:[]
                }
               },
               components:{
                OrderAction
               },
               created(){
                this.loadDate()
               },
               methods:{
                async loadDate(){ //更新数据
                  this.loading=true
                  const res=await post("/orderList",this.params);
                  this.tableData=res.data.list
                  this.total=res.data.total
                  this.loading=false
                },
                handleSizeChange(pageSize){ //页面显示的条数改变
                  this.params.pageSize=pageSize,
                  this.loadDate()
                },
                handleCurrentChange(page){ //当前页码改变
                  this.params.page=page,
                  this.loadDate()
                },
                handleSelectionChange(selection){ //给选中框添加的事件，参考ui文稿
                  this.select=selection //selection代表选中的数据（是以数组形式传出来的 即mock里面对应的接口）
                },
                operate(type){
                  console.log(type)
                  let nos=this.select.map(item=>item.id)
                  //弹出提示
                  this.$notify({
                  title: '提示',
                  message:nos, //订单号（id）
                  type:'success'
                  
                });
                },
                ...mapMutations(["setRow"]), //v调用vuex中mutations修改vuex的数据
                edit(row){
                  this.setRow(row) //将数据传入vuex里的state中（调用vuex的方法修改他自己的数据）此时的row为虚参,是将scope.row代表的数据给vuex
                  console.log(this.$store.state.row) //这个rwo是vuex的数据 
                  this.visible=true //打开弹窗
                }
               }
}
</script>

<style lang="less" scoped>
  
</style>