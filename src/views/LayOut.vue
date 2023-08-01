<template>
  <div>
              <el-container>
            <el-aside width="200px" class="aside">
                <nav-left></nav-left>
            </el-aside>
            <el-container>
              <el-header class="head">
                   <top-header></top-header>
              </el-header>
              <el-main class="main">
                    <keep-alive>
                      <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive> 
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                    <!--主页的内容，由路由引入 HomeIndex-->
              </el-main>
              <el-footer class="foot">
                        京ICP备8888888号 京公安网备312123号
                </el-footer>
              </el-container>
            </el-container>
  </div>
</template>

<script>
import NavLeft from '@/components/NavLeft.vue';
import TopHeader from '@/components/TopHeader.vue';
export default {
                components:{
                  NavLeft,TopHeader
                               
                }
}
</script>

<style scoped lang="less">
  .head{
    background-color: white;
    box-shadow: 0px 2px 2px rgba(0, 21, 41, 0.3);
    line-height: 60px;
  }
  .aside{
    background-color: #001529;
    height: 100vh; //左边菜单条高度
  }
  .main{
    height: 70vh;
    background-color: #e9eef3;
  }
  .foot{
    font-size: 12px;
    color: #999;
    text-align: center;
    line-height: 60px;
    background-color: #e9eef3;
  }
</style>