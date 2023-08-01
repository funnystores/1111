<template>
  <div>
    <el-dialog
    :title="title"
    :visible="visible"
    width="50%"
    :before-close="close">  <!--点击叉号删除功能，绑定一个方法-->
    <!--表单检验功能-->
    <el-row :gutter="20">
      <el-form :model="rulefrom" label-width="80px" :rules="rules" ref="ruleForm">
        <el-col :span="12">
          <el-form-item label="活动名称" prop="name">
                <el-input v-model="rulefrom.name"></el-input>
          </el-form-item>
          <el-form-item label="起始城市" prop="start">
                <el-input v-model="rulefrom.start"></el-input>
          </el-form-item>
          <el-form-item label="目的城市" prop="end">
                <el-input v-model="rulefrom.end"></el-input>
          </el-form-item>
          <el-form-item label="货物名称" prop="cargo">
                <el-input v-model="rulefrom.cargo"></el-input>
          </el-form-item>
          <el-form-item label="件数" prop="count">
                <el-input v-model="rulefrom.count"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位" prop="unit">
                <el-input v-model="rulefrom.unit"></el-input>
          </el-form-item>
          <el-form-item label="运费" prop="price">
                <el-input v-model="rulefrom.price"></el-input>
          </el-form-item>
          <el-form-item label="订单来源" prop="from">
            <el-radio-group v-model="rulefrom.from">
            <el-radio label="pc端">pc端</el-radio>
            <el-radio label="移动端">移动端</el-radio>
  </el-radio-group>
          </el-form-item>
          <el-form-item label="是否支付" prop="pay">
            <el-radio-group v-model="rulefrom.pay">
            <el-radio :label="3">已支付</el-radio>
            <el-radio :label="6">未支付</el-radio>
  </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>


    <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save" >保存</el-button>
    </span>
</el-dialog>
  </div>
</template>

<script>
import { post } from '@/utils/http'
import { mapState,mapMutations} from 'vuex' //拿数据
export default {
                  props:["visible"],
                  data(){
                    return {
                      title:"新建订单",
                      rulefrom:{ //对应标签：modle绑定的数据   而ref代表标签“名字”用来使用该标签的方法，用this.$refs.xxx.方法
                        name:"",
                        start:"",
                        end:"",
                        cargo:"",
                        count:"",
                        price:"",
                        from:"",
                        pay:"",
                        unit:""
                      },
                      rules:{
                        name:[{required:true,message:"不能为空",trigger:"blur"}],
                        start:[{required:true,message:"不能为空",trigger:"blur"}],
                        end:[{required:true,message:"不能为空",trigger:"blur"}],
                        cargo:[{required:true,message:"不能为空",trigger:"blur"}],
                        count:[
                          {required:true,message:"不能为空",trigger:"blur"},
                          {pattern:/^\d+$/,message:"只能为数字",trigger:"blur"}
                        ],
                        price:[{required:true,message:"不能为空",trigger:"blur"}],
                        from:[{required:true,message:"不能为空",trigger:"change"}],
                        pay:[{required:true,message:"不能为空",trigger:"blur"}],
                        unit:[{required:true,message:"不能为空",trigger:"blur"}],
                      }
                    }
                  },
                  computed:{
                    ...mapState(["row"])
                  },
                  watch:{
                    visible(){
                        const {name,start,end,cargo,count,price,from,pay,unit}=this.row
                        this.title=name?"编辑订单":"新建订单"
                        this.rulefrom={name,start,end,cargo,count,price,from,unit,pay}
                    }
                  },
                  methods:{
                    ...mapMutations(["clearRow"]),
                    close(){
                      this.$refs.ruleForm.resetFields()
                      this.$emit("hide") //子组件无法修改直接修改父组件传的值，需要发请求给父组件，让父组件修改值，用emit传请求（方法）
                      this.clearRow()
                    },
                    save(){
                      this.$refs.ruleForm.validate((valid)=>{
                        if(valid){
                         post("/addOrder",this.rulefrom).then(()=>{
                          this.$notify({
                          title: '提示',
                          message:"成了",
                          type:'success'  
                        });
                          this.close()  //请求成功后关闭
                          this.$emit("reload") //再次刷新列表（列表内容是在父组件中）

                         })
                        }
                      })
                    }
                  }
}
</script>

<style lang="less" scoped>

</style>