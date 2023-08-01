<template>
  <el-empty description="页面跑去火星了">
  <el-button type="primary" @click="back">返回首页</el-button>
</el-empty>
</template>

<script>
export default {
                    methods:{
                        back(){
                            this.$router.push("/")
                        }
                    }
}
</script>

<style>

</style>