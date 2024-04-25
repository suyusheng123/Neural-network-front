import request from '@/util/request'

function queryLocation (phone) {
  return request({
    url: `/phone/${phone}`,
    method: 'get'
  })
}

export default queryLocation
