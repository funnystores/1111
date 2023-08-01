 //路由守卫
import router from "./index";
import {getToken} from "@/utils/auth";
import store from "@/store";
import asyncRoutes from "./asyncRouterMap"; //动态路由表（权限路由表）
router.beforeEach(async (to,from,next)=>{
    const hasToken=getToken();
    if(hasToken){
        await store.dispatch("getRole") //对应vuex中的action修改vuex的role（每次刷新时都给vuex添加role）
        if(to.path=="/login"){
            next("/")
        }else{
            if(to.name==null){ //登陆成功后，如果要去的静态页面不存在则根据权限添加动态页面
                let f=asyncRoutes.filter(item=>item.meta.auth.includes(store.state.role)) 
                //动态页面是个数组进行筛选，筛选条件时role的值。根据由接口传给至vuex的role判断，在动态路由中有相同role的值则添加该路由。
                for(let i=0;i<f.length;i++){
                    router.addRoute(f[i])
                }
                //replace:true,是让动态路由刷新不会丢失。
                next({...to,replace:true})
            }else{
                next();
            }
        }
    }else{
        if(to.path=="/login"){
            next()
        }else{
            next("/login")
        }
    }
})
