import axios from 'axios'
const config = {
  baseURL: import.meta.env.VITE_API_URL,
  maxContentLength: 2000 * 1000000000
}
export default function () {
  const api = axios.create(config)
  let token = null
  // Setting up interceptor to check if logged in and insert the JWT token in the request.
  api.interceptors.request.use(async (config) => {
    if (!token) {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user && user.token) {
        token = user.token
        config.headers.Authorization = `Bearer ${token}`
        return config
      }
    }
    return config
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('Error: ', error)
      if (401 === error.status) {
        window.reload(true)
      }
      return Promise.reject(error)
    }
  )

  return api
}
