import api from '@/services/Api'

async function add(request) {
  return api().post('/calculator/add', request)
}
async function subtract(request) {
  return api().post('/calculator/subtract', request)
}
async function divide(request) {
  return api().post('/calculator/divide', request)
}
async function multiply(request) {
  return api().post('/calculator/multiply', request)
}
async function squareRoot(request) {
  return api().post('/calculator/squareroot', request)
}
async function generateString(request) {
  return api().get(`/random/${request.number1}`)
}

export default {
  add,
  subtract,
  divide,
  multiply,
  squareRoot,
  generateString
}
export { add, subtract, divide, multiply, squareRoot, generateString }
