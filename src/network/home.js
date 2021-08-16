import {request} from "./request"

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      // type= type,
      // 简写：
      type,
      page
    }
  })
}

//函数调用  --》 压入函数栈（保存函数调用过程中所有的变量）
//函数调用结束 --》 弹出函数栈（释放函数所有的变量 然后垃圾回收  要是有变量名引用指向则不会被垃圾回收）
// function test() {
//   const names = ['wht','ddd']
// }
//
// test()


let totalNums = []

const num1 = [20,30,40]
const num2 = [22,33,44]

// for(let n of num1) {
//   totalNums.push(n)
// }
// es6:  ... 语法    『...』 扩展运算符能将『数组』转换为逗号分隔的『参数序列』
// totalNums.push(20,30,40)   //等价于：
totalNums.push(...num1)
