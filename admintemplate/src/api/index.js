import request from '@/fetch/index'

// 下载地图
export function downFunc (data) {
  return request({
    url: '/down',
    method: 'post',
    // responseType:'blob',
    data
  })
}