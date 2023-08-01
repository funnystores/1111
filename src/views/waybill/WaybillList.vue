<template>
  <div>
    <bread-crumb></bread-crumb>
    <el-card class="mt">
        <el-row :gutter="12">
            <el-col :span="6">
                <el-input  placeholder="请输入运单号" v-model="params.waybillNo"></el-input>
            </el-col>
            <el-col :span="6">
                <el-input  placeholder="请输入客户名称" v-model="params.name"></el-input>
            </el-col>
            <el-col :span="6">
                <el-date-picker
                    v-model="params.data"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-col>
            <el-col :span="6" class="tr">
                <el-button type="primary" @click="loadData">查询</el-button>
                <el-button type="primary">重制 </el-button>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-radio-group v-model="params.status" @change="loadData">
            <el-radio-button label="1">全部运单(1008)</el-radio-button>
            <el-radio-button label="2">装货中(100)</el-radio-button>
            <el-radio-button label="3">运输中(1002)</el-radio-button>
            <el-radio-button label="4">运单异常(2992)</el-radio-button>
    </el-radio-group>
    </el-card>
    <el-card class="mt">
        <el-table
        :data="tableDate"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column label="订单号" prop="no"></el-table-column>
            <el-table-column label="下单时间" prop="date"></el-table-column>
            <el-table-column label="客户名称" prop="name"></el-table-column>
            <el-table-column label="货物名称" prop="cargo"></el-table-column>
            <el-table-column label="件数" prop="count"></el-table-column>
            <el-table-column label="起始城市" prop="start"></el-table-column>
            <el-table-column label="目的城市" prop="end"></el-table-column>
            <el-table-column label="运费" prop="price"></el-table-column>
            <el-table-column label="是否接货" prop="needRecive"></el-table-column>
            <el-table-column label="车牌号" prop="plateNumber"></el-table-column>
            <el-table-column label="司机名字" prop="driver"></el-table-column>
            <el-table-column label="司机电话" prop="tel"></el-table-column>
            <el-table-column label="运输进度" prop="percent">
                <template slot-scope="scope">
                    <el-progress :percentage="scope.row.percent"></el-progress>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="detail(scope.row.no )" >详情</el-button>
                    <el-button size="mini" type="danger ">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-card>
        <el-pagination
        class="fr mt mb"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="pageData.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { post } from '@/utils/http';
import moment from 'moment';
export default {
                    data(){
                        return {
                            loading:false,
                            total:0,
                            status:1,
                            tableDate:[],
                            params:{
                                waybillNo:"",
                                name:"",
                                status:1
                            },
                            date:[],
                            pageData:{
                                page:1,
                                pageSize:10
                            }
                        }
                    },
                    created(){
                        this.loadData()
                    },
                    
                    methods:{
                        async  loadData(){
                        this.loading=true //加载中显示
                        let startDate=this.date[0]?moment(this.date[0]).format("YYYY-MM-DD"):""
                        let endDate=this.date[0]?moment(this.date[1]).format("YYYY-MM-DD"):""
                        const res =  await  post("/waybillList",{...this.params,...this.pageData,startDate,endDate})
                        console.log(res)
                        this.tableDate=res.data.list
                        this.total=res.data.total
                        this.loading=false
                        },
                        handleSizeChange(pageSize){
                            this.pageData.pageSize=pageSize //每页显示条数
                            this.loadData()
                        },
                        handleCurrentChange(page){
                            this.pageData.page=page //当前页码
                            this.loadData()
                        },
                        detail(no){
                            this.$router.push("/waybill/list/detaill?no="+no)
                        }
                    },
                   beforeRouteLeave(to,from,next){  //路由局部守卫，保证从详情页回运单页不会刷新，但是从其他页面去运单页会刷新
                        if(to.path=="/waybill/list/detaill"){
                            from.meta.keepAlive=true
                        }else{
                            //如果去的不是详情页，则要去掉缓存。
                            let vnode = this.$vnode;
                            let parentVnode = vnode && vnode.parent;
                            if (
                                parentVnode &&
                                parentVnode.componentInstance &&
                                parentVnode.componentInstance.cache
                            ) {
                                var key =
                                vnode.key == null
                                    ? vnode.componentOptions.Ctor.cid +
                                    (vnode.componentOptions.tag
                                        ? `::${vnode.componentOptions.tag}`
                                        : "")
                                    : vnode.key;
                                var cache = parentVnode.componentInstance.cache;
                                var keys = parentVnode.componentInstance.keys;
                                if (cache[key]) {
                                this.$destroy();
                                // remove key
                                if (keys.length) {
                                    var index = keys.indexOf(key);
                                    if (index > -1) {
                                    keys.splice(index, 1);
                                    }
                                }
                                cache[key] = null;
                                }
                            }
                        } 
                        next();
                    },
                    components: { 
                        BreadCrumb
                    },
            
               
            
}
</script>

<style>

</style>