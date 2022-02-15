import request from '@/utils/request'
import { addTokenToFormData } from '@/utils'

export function login(data) {
  return request({
    url: '/cgi-bin/bin/login.cgi',
    method: 'post',
    data: addTokenToFormData(data)
  })
}

export function editPass(data) {
  return request({
    url: '/cgi-bin/bin/edituser.cgi',
    method: 'post',
    data: addTokenToFormData(data)
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
