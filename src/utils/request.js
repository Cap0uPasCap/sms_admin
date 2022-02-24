import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { removeToken, getToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
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
    /*
    *  请求接口返回逻辑
    * status === '0' 请求成功
    * status === '1'  请求失败
    * status === '2'  token失效，跳转登录页面
    * */
    const data = response.data
    console.log('🚀data👉👉', data)
    const { status, msg } = data
    if (status === 1) {
      Message({
        message: msg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(msg || 'Error'))
    } else if (status === 2) {
      removeToken() // must remove  token  first
      resetRouter()
      Message({
        message: msg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      // store.dispatch('user/logout').then(() => {
      //   Message({
      //     message: msg || 'Error',
      //     type: 'error',
      //     duration: 3 * 1000
      //   })
      // })
      return Promise.reject(new Error(msg || 'Error'))
    } else if (status === 0) {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
