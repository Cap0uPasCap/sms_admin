import request from '@/utils/request'

export function getSystemMode(data) {
  return request({
    url: '/systemMode',
    method: 'post'
  })
}
export function changeDeviceName(deviceName) {
  return request({
    url: '/changeDevice',
    method: 'post',
    data: {
      deviceName
    }
  })
}
