import { get } from "@/utils/http"
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
            state:{
                row:{},
                role:""
            },
            getters:{},
            mutations:{
                setRow(state,payload){
                    state.row=payload
                },
                clearRow(state){
                    state.row={}
                },
                setRole(state,payload){
                    state.role=payload //此时的role是登陆接口中的role，在登陆页面中用。在登陆时就应该得到role（即知道权限身份）
                    //所以，在登陆页中用请求得到role后在传给vuex（
                }
            },
            actions:{
                //这个role是权限接口的role，用异步操作是因为每次刷新role会被去掉。使用异步操作在每次刷新的时候，再把接口中的role给vuex
                //用vuex储存role
                async getRole({commit}){
                    let {role}=await get("/getRole")
                    commit("setRole",role)
                }
            },
            modules:{}
})
