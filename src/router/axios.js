import { baseUrl } from '@/config/env'
import { validatenull } from '@/util/validate'
import axios from 'axios'
import store from '../store'
import { getToken, removeToken } from '@/util/auth'
import { Message } from 'element-ui'
import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style


axios.defaults.crossDomain = true;
// 超时时间
axios.defaults.timeout = 30000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
// baseURL
axios.defaults.baseURL = baseUrl;
NProgress.configure({ showSpinner: false })// NProgress Configuration
let msg
// HTTPrequest拦截
axios.interceptors.request.use(config => {
  NProgress.start() // start progress bar
  if (store.getters.access_token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})
// HTTPresponse拦截
axios.interceptors.response.use(data => {
  let res = data.data;
  if (res.status && res.status !== 'SUCCEED') {
    let errMsg = res.errorMessage;
    if (!validatenull(errMsg)) {
      Message({
        message: errMsg,
        type: 'error'
      })
    }
  }
  NProgress.done();
  return data
}, error => {
  let errMsg;
  if (error && error.response) {
    if (error.response.data && error.response.data.status && error.response.data.status === 'FAILED') {
      errMsg = error.response.data.errorMessage;
    }
    if (validatenull(errMsg)) {
      switch (error.response.status) {
        case 400:
          error = '错误请求';
          break;
        case 401:
          errMsg = '当前操作没有权限';
          if (error.response.data && error.response.data.error === 'invalid_token') {
            errMsg = 'Token已失效';
            // 清除菜单
            store.commit('SET_MENU', [])
            // 清除权限
            store.commit('SET_PERMISSIONS', [])
            // 清除用户信息
            store.commit('SET_USER_INFO', {})
            store.commit('SET_ACCESS_TOKEN', '')
            store.commit('SET_REFRESH_TOKEN', '')
            store.commit('SET_ROLES', [])
            store.commit('DEL_ALL_TAG')
            removeToken()
            router.push({
              path: '/login'
            })
          }
          break;
        case 403:
          errMsg = '当前操作没有权限';
          break;
        case 404:
          errMsg = '未找到该资源';
          break;
        case 405:
          errMsg = '请求方法未允许';
          break;
        case 408:
          errMsg = '请求超时';
          break;
        case 478:
          errMsg = '验证码错误,请重新输入';
          break;
        case 479:
          errMsg = '演示环境，没有权限操作';
          break;
        case 500:
          errMsg = '服务器端出错';
          break;
        case 501:
          errMsg = '网络未实现';
          break;
        case 502:
          errMsg = '网络错误';
          break;
        case 503:
          errMsg = '服务不可用';
          break;
        case 504:
          errMsg = '网络超时';
          break;
        case 505:
          errMsg = 'http版本不支持该请求';
          break;
        default:
          errMsg = '系统未知错误,请反馈给管理员';
          break;
      }
    }
  }
  
  if (!validatenull(errMsg)) {
    error.message = errMsg;
    Message({
      message: errMsg,
      type: 'error'
    })
  }
  NProgress.done();
  return Promise.reject(new Error(error))
})

export default axios
