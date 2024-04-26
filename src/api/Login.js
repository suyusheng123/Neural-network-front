import request from '@/util/request'

function queryLocation (phone,password) {
    return request({
      url: `/login/${phone,password}`,
      method: 'post'
    })
  }

  export default queryLocation