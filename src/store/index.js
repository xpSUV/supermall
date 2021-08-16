import Vue from 'vue';
import Vuex from 'vuex';

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";


// 在使用插件时都要先安装  创建对象  然后挂载到vue实例对象上  插件： vuex  vuerouter 等等
// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 3.挂载到vue实例上   es6
export default store


