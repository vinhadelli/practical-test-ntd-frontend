import axios from 'axios'
export default function () {
  const config = {
    baseUrl: import.meta.env.VITE_API_URL,
    withCredentials: true,
    maxContentLength: 2000 * 1000000000
  }
  const api = axios.create(config)
  const token = null

  // Setting up interceptor to check if logged in and insert the JWT token in the request.
  api.interceptors.request.use(async (config) => {
    if (!token) {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user && user.token) {
        this.token = user.token
        config.headers.Authorization = `Bearer ${this.token}` // you may need "Bearer" here
        return config
      }
    }
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (401 === error.response.status) {
        try {
          window.reload(true)
        } catch {
          throw error
        }
      } else {
        throw error
      }
    }
  )

  return api
}
