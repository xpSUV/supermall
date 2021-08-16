import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

// 对象中的属性 方法 名 可以直接写 字符串 也可以用['字符串'] [变量] 来进行表示   当然引用时同理  三种： a.b 、a['c']、 a[d]  d是变量 bc是字符串
// 以上前两个引入或命名都是静态的  第三种都是动态的
// 当然这只是 对象 的引用属性 方法 或命名属性方法时，其余的应用场景还是该怎么用怎么用
export default {
  //mutations唯一的目的就是修改state中状态
  //mutations中的每个方法完成的事情尽可能的比较单一一点
  //应该只有当commit mutations中的方法时才会跟踪
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
