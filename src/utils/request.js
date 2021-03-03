import axios from 'axios'
import store from '../store'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import { MessageBox } from 'element-ui'

axios.defaults.withCredentials = true

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if(window.localStorage.getItem("lt")){
      config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("lt")
    }
    return config
  },
  error => {
    // do something with request error
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const resData = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (resData.code && resData.code !== '000000') {
      Message({
        message: resData.message || '请求错误！',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(response)
    } else {
      return response
    }
  },
  error => {
    const response = error.response
    console.error('errorres', error, response) // for debug
    if (!response) {
      const errMsg = error.message
      console.log(error)
      console.log(error.error)
      if (errMsg && errMsg.indexOf('timeout') !== -1) {
        Message({
          message: '请求超时！',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        Message({
          message: '网络错误！',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(response)
    }
    if (response && response.status && (response.status === 401 || response.status === 403)) {
      // 401 403 重新登录
        if (store.getters.layoutType) {
          MessageBox.confirm('登陆已过期，请重新登录！', '登录确认', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            location.href = process.env.VUE_APP_LOGIN_URL
            window.localStorage.clear()
          })
        }
  
    } else {
      Message({
        message: (response.data ? response.data.message : null) || response.message || '请求失败！',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(response)
  }
)

export default service
