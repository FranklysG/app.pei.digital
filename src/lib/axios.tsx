import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:9000',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
  withCredentials: true,
})

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@peidigital:token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axios
