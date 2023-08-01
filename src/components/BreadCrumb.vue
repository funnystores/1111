<template>
  <div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in getbreadlist" :key="index">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    data(){
        return {
            getbreadlist:[]
        }
    },
    created(){
        this.getbreaddata()
    },
    methods:{
        getbreaddata(){
            this.getbreadlist=this.$route.meta.bread||[]
        }
    }
}
</script>

<style>

</style>