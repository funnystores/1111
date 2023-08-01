<template>
  <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="24">
                <el-col :span="16">
                <el-row :gutter="12">
                    <el-col :span="8">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input></el-input>
                    </el-col>
                </el-row>
                <el-row class="mt" :gutter="12" v-show="show">
                    <el-col :span="8">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input></el-input>
                    </el-col>
                </el-row>
                </el-col>
                <el-col :span="2">
                    <el-dropdown>
                        <span class="el-dropdown-link" @click="expand">
                            {{ show?"收起":"展开"}}<i :class="`el-icon-arrow-${show?'up':'down'} el-icon--right`"></i>
                        </span> 
                        <el-dropdown-menu ></el-dropdown-menu>
                        </el-dropdown>
                </el-col>
                <el-col :span="6" class="tr fr">
                <el-button>查询1</el-button>
                <el-button>重置</el-button>
                </el-col>
            </el-row>
        </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
export default {
                    data(){
                        return {
                            show:false
                        }
                    },
                    components:{
                        BreadCrumb
                                     
                    },
                    methods:{
                        expand(){
                            this.show=!this.show
                        }
                    }
}
</script>

<style lang="less" scoped>
    .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>