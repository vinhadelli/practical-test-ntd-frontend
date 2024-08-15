import api from './Api'
import { useRouter } from 'vue-router'
async function login(user) {
  return api()
    .post('/auth/login', {
      username: user.username,
      password: user.password
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
        useRouter().push({ name: 'Home' })
      }
      return response.data
    })
    .catch((error) => {
      alert(error)
      console.log(error)
    })
}

function logout() {
  localStorage.removeItem('user')
  window.location.reload()
}

async function register(user) {
  return api()
    .post('/auth/signup', {
      username: user.username,
      password: user.password
    })
    .then(() => {
      alert('Registered successfully! Please Login!')
      window.location.reload()
    })
    .catch((error) => {
      alert(error)
      console.log(error)
    })
}

export default {
  login,
  logout,
  register
}
export { login, logout, register }
