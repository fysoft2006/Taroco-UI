

import { clientSec } from '@/config/env'
import request from '@/router/axios'

export const loginByUsername = (username, password, code, randomStr) => {
  var grant_type = 'password'
  var scope = 'server'
  return request({
    url: '/auth/oauth/token',
    headers: {
      'Authorization': 'Basic ' +　clientSec
    },
    method: 'post',
    params: { username, password, randomStr, code, grant_type, scope }
  })
}

export function mobileLogin(mobile, code) {
  var grant_type = 'mobile'
  var scope = 'server'
  return request({
    url: '/auth/mobile/token',
    headers: {
      'Authorization': 'Basic ' + clientSec
    },
    method: 'post',
    params: { mobile, code, grant_type, scope }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/admin/user/info',
    method: 'get'
  })
}

export const logout = (accesstoken, refreshToken) => {
  return request({
    url: '/auth/authentication/removeToken',
    method: 'post',
    params: { accesstoken, refreshToken }
  })
}
