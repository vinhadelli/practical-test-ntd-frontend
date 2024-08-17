import api from './Api'
async function login(user) {
  return api()
    .post('/auth/login', {
      username: user.username,
      password: user.password
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
    })
    .catch((error) => {
      console.log(error)
      alert(error.response.data)
      return Promise.reject(error)
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
      console.log(error)
      alert(error.response.data)
      return Promise.reject(error)
    })
}

export default {
  login,
  logout,
  register
}
export { login, logout, register }
