//写路由实列
export default [
    //两个一级路由
    {
      path:"/",//默认路由
      name:"Layout",
      component:()=>import("@/views/LayOut.vue"),
      redirect:"/index",  //当进入layout页面时，自动定向进入index
      children:[
        {
          path:"/index",
          name:"index",
          component:()=>import("@/views/index/HomeIndex")
        },
        {
          path:"/orders/list",
          name:"orders_list",
          meta:{bread:["订单管理","订单列表"]}, //面包屑数据
          component:()=>import("@/views/orders/OrderList")
        },
        {
          path:"/waybill/list",
          name:"waybill_list",
          meta:{bread:["运单管理","运单列表"],keepAlive:true},  //判断该页面是否需要缓存
          component:()=>import("@/views/waybill/WaybillList.vue")
        },
        {
          path:"/waybill/list/detaill",
          name:"waybill_list_detaill",
          meta:{bread:["运单管理","运单列表","运单详情"]},
          component:()=>import("@/views/waybill/WaybillDetail.vue")
        },
        {
          path:"/depart/data",
          name:"waybill_list_in",
          meta:{bread:["发车管理","发车列表"]},
          component:()=>import("../views/depart/DepartData.vue")
        },
  ]
      
},
{
  path:"/login",
  name:"Login",
  component:()=>import("@/views/LoginVue.vue")
},
]
