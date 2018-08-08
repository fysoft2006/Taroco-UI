/**
 *
 * http配置
 *
 */

import axios from 'axios'
import store from '../store'
import { getToken, setToken, removeToken } from '@/util/auth'
import { validatenull } from '@/util/validate'
import { Message } from 'element-ui'
import {config as cfg} from './config';
import errorCode from '@/const/errorCode'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

axios.defaults.crossDomain = true;
axios.defaults.baseURL = cfg.baseURL;
// 超时时间
axios.defaults.timeout = 30000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
NProgress.configure({ showSpinner: false })// NProgress Configuration
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
  NProgress.done()
  return data;
}, error => {
  NProgress.done()
  if (error.response.data.status && error.response.data.status === 'FAILED') {
    let errMsg = error.response.data.errorMessage;
    if (!validatenull(errMsg)) {
      Message({
        message: errMsg,
        type: 'error'
      })
    }
  } else {
    let errMsg = error.toString()
    let code = errMsg.substr(errMsg.indexOf('code') + 5)
    Message({
      message: errorCode[code] || errorCode['default'],
      type: 'error'
    })
  }
  return Promise.reject(new Error(error))
})

export default axios
