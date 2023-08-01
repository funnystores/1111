<template>
  <div>
    <h1 class="title">邦达国际物流平台</h1>
    <!--菜单的外部容器-->
      <el-menu 
      :router="true"
      background-color="#001529"
      text-color="#fff"
      > 
        <menus-vue v-for="(item,index) in menuDate" :menu="item" :key="index"></menus-vue>
      </el-menu>
  </div>
</template>

<script>
import { get } from '@/utils/http';
import MenusVue from "./MenusVue.vue"
export default {
            data(){
              return {
                menuDate:[]
              }
            },
            created(){
              this.getMenu()
            },
            methods:{
              getMenu(){
                get("/menu").then((res)=>{
                  this.menuDate=res.data
                })
              }
            },
            components:{
              MenusVue
            }
}
</script>

<style lang="less" scoped>
  .title{
    line-height: 50px;
    color: #fff;
    text-align: center;
  }
</style>