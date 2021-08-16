import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
  // 先在body中添加吐司元素
  // document.body.appendChild(Toast.$el)

  // 当执行安装插件即Vue.use()时还没有 挂载Toast组件模板 所以  Toast.$el = undefined  拿不到组件内部模板元素


  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 3.将组件对象，手动挂载到某一个元素上    $mount:挂载    将toast对象挂载到document.createElement('div')
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div     此时已经手动将toast组件对象挂载到document.创建的div元素上了   所以可以用$el
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}


export default obj
