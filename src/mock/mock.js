import Mock from "mockjs"
//让请求延迟(模拟网络延迟)
Mock.setup({
    timeout:500
})
//登陆页面接口
Mock.mock("http://localhost:8081/login","post",(req)=>{
            // 请求对象  req代表了前端所传的参数 即axios里的东西
            const {username,password}=JSON.parse(req.body) //结构赋值拿到前端里的参数，body是字符串形式用json转换。
            //根据用户名和密码查询数据库，查询出数据返回给前端。
            if(username==6666&&password==123456){
                return {
                    code:200,
                    success:true,
                    message:"登陆成功",
                    token:"1212415232523",
                    nickname:"赵铁柱",
                    role:"administration"

                }
            }else{
                return{
                    code:100,
                    message:"账号或者密码有错误",
                    success:false
                }
            }
            
}) 
//入职日期接口 在对应的vue中请求接口
Mock.mock("http://localhost:8081/in","get",()=>{
                return {
                    code:200,
                    success:true,
                    message:"请求成功",
                    time:"2020-07-01"
                }
})
//菜单数据
const menuList = [
    {
        name: "首页",
        icon: "el-icon-s-home",
        url: "/index",
    },
    {
        name: "订单管理",
        icon: "el-icon-s-order",
        url: "/order",
        children: [  //有子路由的就是菜单里面有二级菜单即子集
            {
                name: "订单列表",
                icon: "el-icon-user",
                url: "/orders/list",
            }
        ]
    },
    {
        name: "运单管理",
        icon: "el-icon-menu",
        url: "/waybill",
        children: [
            {
                name: "运单录入",
                icon: "el-icon-notebook-2",
                url: "/waybill/in",
            },
            {
                name: "运单列表",
                icon: "el-icon-truck",
                url: "/waybill/list",
            }
        ]
    },
    {
        name: "发车管理",
        icon: "el-icon-s-order",
        url: "/depart",
        children: [
            {
                name: "发车数据单",
                icon: "el-icon-tickets",
                url: "/depart/data",
            }
        ]
    },
    {
        name: "承运商管理",
        icon: "el-icon-user",
        url: "/carrier",
        children: [
            {
                name: "承运商列表",
                icon: "el-icon-chat-square",
                url: "/carrier/list",
            },
            {
                name: "车辆列表",
                icon: "el-icon-bank-card",
                url: "/carrier/trucks",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/carrier/list",
            },
        ]
    },
    {
        name: "客户管理",
        icon: "el-icon-chat-dot-square",
        url: "/customer",
    },
    {
        name: "财务管理",
        icon: "el-icon-user",
        url: "/my",
        children: [
            {
                name: "客户对账单",
                icon: "el-icon-chat-square",
                url: "/customer/info",
            },
            {
                name: "承运商对账单",
                icon: "el-icon-bank-card",
                url: "/record",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/record",
            },
        ]
    },
    {
        name: "个人中心",
        icon: "el-icon-chat-dot-square",
        url: "/personal",
    },
]
//菜单接口
Mock.mock("http://localhost:8081/menu","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:menuList
    }
})
//折线图图表接口
Mock.mock("http://localhost:8081/line","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:{
            "22-01":30,
            "22-02":84,
            "22-03":56,
            "22-04":47,
            "22-05":84,
            "22-06":61,
            "22-07":90,
        } 
    }
})
//订单管理-订单列表
Mock.mock('http://localhost:8081/orderList', 'post', (req) => {
    const { page, pageSize,keyword } = JSON.parse(req.body);
    //page网页页码（处于的页数），pagesize一页有多少个数据，keyword搜索框中的关键字
    console.log("后端接口接收到参数（对应的组件中请求中发的参数）:",page,pageSize,keyword)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{ //生成list 多少个（以有多少pagesize为单位）
                'id|+1': 10000,//订单号
                'status|1': [1,2,3,4],//订单状态 1待审核 2已审核 3审核通过 4审核拒绝
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                'cargo|1': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'unit|1': ["方","吨"],//单位
                "price":Mock.Random.integer(5000,50000),//运费
                "from|1":["移动端","pc端"],
                "pay|1":[1,2],//是否支付 1 已支付 2未支付     
            }],
            "total": 47 //一共有多少个数据
        })
    }
})
//订单管理-新建订单
Mock.mock('http://localhost:8081/addOrder',"post",(req)=>{
    const  {name,start,end,cargo,count,unit,price,from,pay} =JSON.parse(req.body);
    console.log("新建订单接口收到参数:",name,start,end,cargo,count,unit,price,from,pay)
    return{
        code:200,
        success:true,
        message:"新建成功", 
    }
})
//运单管理-运单列表
Mock.mock('http://localhost:8081/waybillList', 'post', (req) => {
     const { page, pageSize,waybillNo,name,startDate,endDate,status} = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,waybillNo,name,startDate,endDate,status)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'no|+1': 10000,//订单号
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'cargo': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                "price":Mock.Random.integer(5000,50000),//运费
                "needRecive|1":[1,2],//需要接货 1需要 2不需要
                'plateNumber|1': ["京A12345","苏C66666","鲁B45678"],//车牌号
                 "driver":Mock.Random.cname(),
                 "tel|1":[18888888888,15577896554,15789654785,13698745269],
                 "percent|1":[37,22,89,65,80,74,56]
   
            }],
            "total": 47
        })
    }
})
//根据token获取权限名字
Mock.mock("http://localhost:8081/getRole","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功", 
        role:"boss"   //
        //根据人物与asyncRouterMap中的人物决定是否放开权限展示页面 （即在guard中是否添加权限页面）
    }
})