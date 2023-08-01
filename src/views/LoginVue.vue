<template>
  <div>
    <el-row type="flex" justify="center">
     <el-card class="box-card">
        <div  class="clearfix" slot="header">
            <h2 style="text-align: center;">蚂蚁金融管理系统</h2>
        </div>
        
        <div>
            <el-form :model="ruleForm"
            :rules="rules" 
            ref="ruleForm" 
            label-width="80px" 
            class="demo-ruleForm">
             
                <el-form-item label="用户名" prop="username">
                    <el-input v-model.trim="ruleForm.username"></el-input>
                </el-form-item>  
                <el-form-item label="密码" prop="password">
                    <el-input v-model.trim="ruleForm.password" type="password"></el-input>
                </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%;" @click="login" :loading="loading">登陆</el-button>
            </el-form-item>  
    </el-form>
            </div>
</el-card> 
    </el-row>
  </div>
</template>

<script>
import {post}  from "@/utils/http" 
import {setToken} from "@/utils/auth"
import { mapMutations } from "vuex"
export default {
                            data(){
                                return {
                                    loading:false,
                                    ruleForm:{
                                        username:"", //双向绑定，互相改变（值）name是属姓名 
                                        password:""
                                    },
                                    //定义的规则
                                    rules:{
                                        username:[  //对于prop名字为name的表单的规则
                                            {required:true, message: '用户名不能为空', trigger: 'blur'},  
                                            {pattern:/^\d{4,8}$/, message: '用户要求输入4—8个数字', trigger: 'blur'}
                                    ],
                                    password:[
                                        {required:true, message: '密码不能为空', trigger: 'blur'},  
                                        {pattern:/^\d{6}$/, message: '用户要求输入6个数字', trigger: 'blur'}
                                    ]
                                    }

                                }
                            },
                            methods:{
                                ...mapMutations(["setRole"]),
                                login(){
                                    this.$refs.ruleForm.validate((valid)=>{
                                            if(valid){             //表单校验为true，则往下进行
                                                this.loading=true //一点击登陆，马上加载。
                                                //登陆逻辑
                                                post("/login",this.ruleForm).then((res)=>{  
                                                    this.loading=false //登陆成功后，加载消失。                                       
                                                    setToken(res.token)//存储token
                                                    this.setRole(res.role) //调用vuex的方法将role传给vuex
                                                     //得到role储存到vuex中，登陆接口的role（但每次刷新时role会被去掉，所以有了接下来在vuex中的action异步操作存储role）
                                                    //该异步操作应在每次刷新时使用，所以放在全局前置守卫中（guard中）
                                                    sessionStorage.setItem("nickname",res.nickname)
                                                    this.$router.push("/") //登陆成功后跳转页面
                                                }).catch((error)=>{
                                                    this.loading=false //登陆失败，加载也同样要消失。
                                                    console.log(error)
                                                })
                                            }
                                    })
                                }
                            }
}
</script>

<style scoped lang="less">
.la{color:black;font-size: 50px;}
.box-card{
            width: 500px;
            margin-top: 250px;
            h2{
                text-align: center;
                .la();
              }
   }
</style>