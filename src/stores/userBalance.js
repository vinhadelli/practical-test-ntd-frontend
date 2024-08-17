import { getUserBalance } from '@/services/userService'
import { defineStore } from 'pinia'

export const userBalanceStore = defineStore('userBalance', {
  state: () => {
    return { userBalance: 0.0, loading: false }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async update() {
      this.loading = true
      await getUserBalance()
        .then((response) => (this.userBalance = response.data))
        .catch()
        .finally(() => (this.loading = false))
    },
    toString() {
      return this.userBalance + ''
    }
  }
})
