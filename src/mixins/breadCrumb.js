//面包屑导航样式
export default{
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
            this.getbreadlist=this.$route.meta.bread||[] //从使用它的组件获取组件所对应的路由中的根信息
        }
    }
}