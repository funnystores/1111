//存放所有需要权限的路由 即动态路由
export default[
    {
        path:"/attendance",
        name:"Attendance",
        meta:{auth:["boss","administration"]},
        component:()=>import("@/views/AuthViews/AuthAttendance")
    },
    {
        path:"/salary",
        name:"Salary",
        meta:{auth:["boss","finance"]},
        component:()=>import("@/views/AuthViews/AuthSalay")
    },
    {
        path:"*",
        name:"NotFound",
        meta:{auth:["boss","finance","user","administration"]},
        component:()=>import("@/views/NotFound")
      }
]