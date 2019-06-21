import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import instance from './utils/axios'
import ElementUI from 'element-ui';
import $ from 'jquery'
// 引入echarts
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/index.scss';
import './assets/styles/iconfont/iconfont.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
Vue.use(VueQuillEditor)
//进度条
// import NProgress from 'nprogress'
// import 'nprogress/n p rogress.css'
// router.beforeEach((to,from,next)=>{
//   NProgress.start();
//   next()
// });
// router.afterEach((to,from,next)=>{
//   NProgress.done();
//   });
  
Vue.prototype.$echarts = echarts;
Vue.prototype.$ = $;
Vue.config.productionTip = false;
Vue.prototype.axios=instance;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
