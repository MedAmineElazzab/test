import axios from 'axios'
import { API_URL } from './constants'
import JWTToken from './token'
import { IsSSR } from './utils'
const client = axios.create({
  baseURL: API_URL,
  withCredentials:true
})

client.interceptors.request.use(
  function (config) {
    const token = JWTToken.getToken()

    if (token && !IsSSR()) {
      config.headers!['Authorization'] = token
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default client
