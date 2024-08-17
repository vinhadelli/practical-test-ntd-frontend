<template>
  <v-app-bar :elevation="2" rounded class="mt-3 ml-5 appbar">
    <v-app-bar-title>NTD Calculator</v-app-bar-title>
    <template v-slot:append>
      <div class="d-flex">
        <RouterLink class="mr-8" v-if="this.loggedIn" to="/calculator">Calculator</RouterLink>
        <RouterLink class="mr-8" v-if="this.loggedIn" to="/records">User Records</RouterLink>
        <RouterLink class="mr-8" v-if="!this.loggedIn" to="/login">Login</RouterLink>
        <RouterLink class="mr-8" v-else @click="logout" to="/login">Logout</RouterLink>
        <div v-if="this.loggedIn" class="userBalance">
          <span class="userBalance" v-if="!userBalance.loading">{{ userBalance.toString() }}</span>
          <v-progress-circular
            class="mr-8"
            v-else
            color="#7fff00"
            indeterminate
          ></v-progress-circular>
        </div>
      </div>
    </template>
  </v-app-bar>
</template>
<script>
import authService from '@/services/authService'
import { userBalanceStore } from '@/stores/userBalance'
import { RouterLink } from 'vue-router'
export default {
  setup() {
    let user = JSON.parse(localStorage.getItem('user'))
    let loggedIn = false
    const userBalance = userBalanceStore()
    if (user) {
      loggedIn = true
      userBalance.update()
    }
    return { userBalance, loggedIn }
  },
  components: {
    RouterLink
  },
  methods: {
    logout() {
      authService.logout()
    }
  }
}
</script>
<style>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.userBalance {
  margin-right: 32px !important;
  align-content: center;
  color: #7fff00;
}
</style>
