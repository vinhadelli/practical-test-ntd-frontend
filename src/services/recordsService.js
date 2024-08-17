import api from '@/services/Api'

async function getUserRecords(details) {
  return api().post('/record', details)
}
async function deleteUserRecord(id) {
  return api().delete('/record/' + id)
}

export default {
  getUserRecords,
  deleteUserRecord
}
export { getUserRecords, deleteUserRecord }
