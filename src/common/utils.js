export function debounce(func,delay) {
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)      //使用apply(this,args) 是为了让在其他地方（作用域）也能调用该函数 如上面的 refresh()
    },delay)
  }
}


// 正则表达式是用来字符串匹配的  利器 （难：规则太多）
export function formatDate (date, fmt) {
  // 1.获取年份：
  //正则表达式 y+:   + -> 1个或多个
  // y+：匹配一个或多个y
  // y*：匹配0个或多个y
  // y?：匹配0个或1个y
  // RegExp.$1  指匹配到的结果   此处就是yyyy   将yyyy替换成真实数字年份   substr(位数)  表示字符串截取几位 从前面截掉 留下后面的
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }


  // new RegExp(`(${k})`)  == /(${k})/
  // 2.获取
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

// 针对后面的月 日 时 秒 分 这些两位的数字进行截取 调整 补齐
function padLeftZero (str) {
  return ('00' + str).substr(str.length);  //例如传入的是 04  则是0004  截取2位 变04   传入的是4 则是004  截取一位 变04
}
