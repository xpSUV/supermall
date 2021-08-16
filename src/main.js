import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload"

import toast from 'components/common/toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

//安装toast插件  执行这句Vue.use(toast)   会自动调用toast对象中的install方法 ，vuex跟vuerouter也是这样
Vue.use(toast)

// 解决移动端的300ms的点击延迟
FastClick.attach(document.body)

// 使用图片懒加载插件
Vue.use(VueLazyload, {
  // 设置参数  loading   使用require导入图片   应为es6中 import导入需要有export导出
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
