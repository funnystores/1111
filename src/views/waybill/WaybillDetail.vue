<template>
  <div>
    <bread-crumb class="mt"></bread-crumb>
    12131233
    <el-button @click="back">返回</el-button>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
export default {
                    methods:{
                        back(){
                            this.$router.push("/waybill/list")
                        }
                    },
                    components:{
                        BreadCrumb
                                       
                    }
}
</script>

<style>

</style>