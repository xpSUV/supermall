import axios from 'axios'


export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //2.axios的拦截器      .use(）中的两个函数参数 顺序对应就行 参数命名无所谓 第一个函数参数是成功时  该函数的参数返回一些配置信息
  // 2.1 请求拦截   (客户端向服务器发送请求)
  instance.interceptors.request.use(config => {
    // 拦截后可以对config中的一些信息进行操作
    // 1.比如config中的一些信息不符合服务器的要求

    // 2.比如每次发送网络请求时， 都希望在界面中显示一个请求的图标 如加载

    // 3.某些网络请求（比如登录（token））是需要携带一些特殊的信息

    return config         //拦截到后  需要返回配置信息  否则服务器拿不到配置信息 应为被拦截了
  }, err => {
    console.log(err)
  })//请求拦截

  // 2.2 响应拦截   (接收到客户端的请求后 服务器进行响应)
  instance.interceptors.response.use(res => {
    return res.data           //拦截到后  需要返回请求结果  否则客户端拿不到服务器响应的结果 应为被拦截了
                      // 此处只需要返回data数据即可（res.data ），应为data才是用户真正需要的东西  其他东西都是axios默认拼接的一些相关信息
  },err => {
    console.log(err);
  })     //响应拦截

  //3.发送真正的网络请求
  return instance(config)         //instance是axios的实例   axios支持Promise  所以instance(config)也相当于一个promise

}


