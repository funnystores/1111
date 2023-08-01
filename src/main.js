import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/commen/reset.css"
import "@/commen/rule.css"
import "./mock/mock.js"
import "@/router/guard"   //路由守卫导入
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store, //vuex
  render: h => h(App)
}).$mount('#app')
