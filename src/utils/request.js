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
    // 解决中文乱码问题
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
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
    // 如果状态码返回的不是0
    if (res.code !== 0) {
      if (res.code === 4010001) {
        // to re-login
        MessageBox.confirm(
          `${res.msg}`,
          '温馨提示',
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
      } else {
        Message.error(res.msg, 3000)
      }
      return Promise.reject(new Error(res.msg || '访问错误'))
    } else {
      return res
    }
  },
  error => {
    Message.error(error.msg, 3000)
    return Promise.reject(error)
  }
)

export default service
