import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getAccessToken, getRefreshToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    /**
     * 存了两个token
     */
    if (store.getters.accessToken && store.getters.refreshToken) {
      // 放入请求头
      config.headers['Authorization'] = getAccessToken()
      config.headers['RefreshToken'] = getRefreshToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      Message({
        message: res.msg || '访问错误',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 4010001) {
        // to re-login
        MessageBox.confirm(
          '您已经登出，您可以取消以停留在此页面，或再次登录',
          '确认注销',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          /**
           * 清除cookies 并且跳转到首页
           */
          store.dispatch('user/resetCookies')
            .then(() => {
              location.reload()
            })
        })
      }
      return Promise.reject(new Error(res.msg || '访问错误'))
    } else {
      // 如果不是管理员 直接不让登陆
      // if ((JSON.stringify(res.isAdmin)) !== 1) {
      //   Message({
      //     message: '您不是管理员,不能访问该资源',
      //     type: 'error',
      //     duration: 5 * 1000
      //   })
      //   /**
      //      * 清除cookies 并且跳转到首页
      //      */
      //   store.dispatch('user/resetCookies')
      //     .then(() => {
      //       location.reload()
      //     })
      // }
      // alert(JSON.stringify(res.isAdmin))
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
