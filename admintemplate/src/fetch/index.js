import axios from 'axios'

function service (axiosConfig) {
  const service = axios.create({
    // baseURL: 'http://192.168.110.42:3000',
    // baseURL: process.env.VUE_APP_BASE_API,
    baseURL: '/service',
    timeout: 2000
  })

  service.interceptors.request.use(
    config => {
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      return Promise.reject(error)
    }
  )
  return service(axiosConfig)
}

export default service
