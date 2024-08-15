import { inject } from 'vue'
function loading() {
  const loader = inject('loader')
  loader.value = true
}
function doneLoading() {
  const loader = inject('loader')
  loader.value = false
}

export default {
  loading,
  doneLoading
}
export { loading, doneLoading }
