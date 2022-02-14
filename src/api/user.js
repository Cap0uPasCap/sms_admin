import request from '@/utils/request'
import { jsonToFormData } from '@/utils'

export function login(data) {
  return request({
    url: '/cgi-bin/login.cgi',
    method: 'post',
    data: jsonToFormData(data)
  })
}


export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
