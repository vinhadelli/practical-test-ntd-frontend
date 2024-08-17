<template>
  <v-sheet rounded class="m-3 about">
    <div v-if="!isSignUp">
      <h1>Login</h1>
      <v-form v-model="loginForm" @submit.prevent="submit">
        <v-text-field
          v-model="user.username"
          class="mt-9"
          label="E-mail"
          variant="outlined"
          type="email"
          placeholder="example@email.com"
          :rules="[required]"
        />
        <v-text-field
          v-model="user.password"
          class="mt-5"
          label="Password"
          variant="outlined"
          type="password"
          placeholder="Enter your password"
          :rules="[required]"
        />
        <v-text-field
          v-if="isSignUp"
          v-model="confirmPassword"
          class="mt-5"
          label="Confirm the Password"
          variant="outlined"
          type="password"
          placeholder="Confirm your password"
          :rules="[required]"
        />
        <v-divider />
        <v-btn
          class="mt-5"
          :disabled="!loginForm"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          :loading="loader"
          block
        >
          <span v-if="!isSignUp">Login</span>
          <span v-else>Sign Up</span>
        </v-btn>
      </v-form>
    </div>
  </v-sheet>
</template>

<script>
import { login, register } from '@/services/authService'
import { useRouter } from 'vue-router'
import { inject } from 'vue'
export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const loader = inject('loader')
    return {
      router,
      loader
    }
  },
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      isSignUp: false,
      loginForm: false,
      confirmPassword: ''
    }
  },
  methods: {
    async submit() {
      if (this.isSignUp) await this.signup()
      else await this.login()
    },
    async login() {
      this.loader = true
      await login(this.user)
        .then(() => {
          this.router.push({ name: 'Home' })
        })
        .finally(() => {
          this.loader = false
        })
    },
    async signup() {
      this.loader = true
      if (this.password.equals(this.confirmPassword)) {
        await register(this.user).finally(() => {
          this.loader = false
        })
      } else alert("The passwords don't match!")
    },
    required(value) {
      return !!value || 'The Field is required'
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
