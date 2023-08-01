import axios from "axios"; //无需在main.js中引用
import { Message } from 'element-ui';
import { getToken } from "./auth";
//创建axios实例对象
const service=axios.create({
    baseURL:"http://localhost:8081/",
    timeout:5000
})



//请求拦截器  给每一个axios里的请求添加token（令牌）
service.interceptors.request.use((config)=>{     //use里的两个参数，第一个是成功的参数，第二个是失败的参数。
    if(getToken()){  //也就是有token属性，
            config.headers.token=getToken()  //一般讲token添加至请求头中
    }
    // config.headers.token="" 
    return config
},()=>{
        Message({
            type:"error",
            message:"请求错误"
        })
        return Promise.reject(new Error("请求错误"))
})


//响应拦截器
service.interceptors.response.use((res)=>{ //res为请求的结果(请求成功时的)
    const result=res.data
    if(result.success){
        return result
    }else{
            Message({
                type:"error",
                message:result.message||"请求错误" //防止后端里的message为空或者不存在
            })
            return Promise.reject(new Error(result.message||"请求错误"))   //将错误抛出去
    }
},()=>{ //（请求失败时的，无法拿到后端的数据） 
    Message({
        type:"error",
        message:"请求错误"
    })
    return Promise.reject(new Error("请求错误"))
})

export default service