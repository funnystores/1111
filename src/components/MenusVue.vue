<template>
    <div>
        <el-submenu v-if="menu.children" :index="menu.url" class="mitem"> <!--一级菜单有子菜单,menu.children代表二级菜单-->
            <template slot="title">
                <i :class="menu.icon"></i>
                <span slot="title">{{ menu.name }}</span>
            </template>
            <!--子菜单-->
            <nav-menu v-for="(item,index) in menu.children" :key="index" :menu="item"></nav-menu> <!--递归，组件自己调用自己-->
        </el-submenu>

        <el-menu-item v-else :index="menu.url" class="mitem"> <!--一级菜单没有子菜单-->
            <i :class="menu.icon"></i>
            <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
    </div>
    
</template>

<script>
export default {
                name:"NavMenu", //当组件自己调用自己时才需要写（即组件递归）
                props:{ //在navleft中添加一个menu属性，不同组件的传值。
                    menu:{
                        typeof:Object,
                        required:true
                    }
                }
}
</script>

<style lang="less" scoped>
    .mitem{width: 200px;}
</style>