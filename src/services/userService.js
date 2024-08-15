import api from '@/services/Api'

async function getUserBalance() {
  return api().get('/user/balance')
}

export default {
  getUserBalance
}
export { getUserBalance }
