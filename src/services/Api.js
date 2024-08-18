import axios from 'axios'
const config = {
  baseURL: import.meta.env.VITE_API_URL,
  maxContentLength: 2000 * 1000000000
}
export default function () {
  const api = axios.create(config)
  var token = null
  // Setting up interceptor to check if logged in and insert the JWT token in the request.
  api.interceptors.request.use((request) => {
    if (request.url.includes('/auth/login') || request.url.includes('/auth/signup')) return request

    if (!token) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user && user.token) {
        token = user.token
        request.headers.Authorization = `Bearer ${token}`
      }
    }
    return request
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('Error: ', error)
      if (401 === error.response.status) {
        localStorage.removeItem('user')
        window.reload(true)
      }
      if (403 === error.response.status) {
        localStorage.removeItem('user')
        window.reload(true)
      }
      if (400 === error.response.status) alert(error.response.data)
      if (500 === error.response.status) alert(error.response.data)
      return Promise.reject(error)
    }
  )

  return api
}
