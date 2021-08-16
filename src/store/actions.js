import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  // action中一般放入异步操作 或 逻辑操作
  // 内部方法中的第一个context参数代表执行上下文对象  可以使用es6语法对象解构将context换为(改写为（解构为）)需要的例如：{state, commit}
  // 从而 可以直接在action中使用state对象  commit方法 而不是通过context.state , context.commit()
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 数组常用的方法有哪些： push/pop/unshift/shift/sort/reverse/map/filter/reduce/join/find......

      //1.查找之前的数组中是否含有该商品
      // 这里item 当前遍历到的元素。  跟其他高级函数方法用法差不多
      // find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count +=1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量加+1')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })

  }
}
