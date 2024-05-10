import { ElMessage } from 'element-plus'
import axios, { HttpStatusCode } from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if(config,HttpStatusCode === 500){
      ElMessage({
        message: '错误',
        type: 'error',
        duration: 5 * 1000
      })
    }
  },
  error => {
    ElMessage({
      message: error.message || '错误',
      type: 'error',
      duration: 5 * 1000
    })
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    console.log(response)
    const res = response
    if (res.status === 500) {
      ElMessage({
        message: res.newError || '错误',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(res.newError || '错误'))
    } else {
      return res
    }
  },
  error => {
    console.log('错误' + error)
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
