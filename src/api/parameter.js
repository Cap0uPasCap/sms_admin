import request from '@/utils/request'

export function getCellList() {
  return request({
    url: '/cellList',
    method: 'post'
  })
}

export function cellUpdate(data) {
  return request({
    url: '/cellUpdate',
    method: 'post',
    data
  })
}
export function getPowerInfo() {
  return request({
    url: '/power',
    method: 'post'
  })
}

export function setPowerInfo(data) {
  return request({
    url: '/powerOpen',
    method: 'post',
    data
  })
}
