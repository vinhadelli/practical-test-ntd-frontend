<template>
  <v-sheet rounded class="m-3 views text-center mt-10" min-width="500px">
    <div class="mr-5 ml-5 mb-10 mt-10">
      <h1 v-if="!isSignUp">Login</h1>
      <h1 v-else>Sign Up</h1>
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
          color="#007e54"
          size="large"
          type="submit"
          variant="elevated"
          :loading="this.loader"
          block
        >
          <span v-if="!isSignUp">Login</span>
          <span v-else>Sign Up</span>
        </v-btn>
      </v-form>
      <p class="mt-5" v-if="!isSignUp">
        Or <b class="text-accent" style="cursor: pointer" @click="isSignUp = true">Sign Up</b> if
        don't have an account yet!
      </p>
      <p class="mt-5" v-else>
        <b class="text-accent" style="cursor: pointer" @click="isSignUp = false"
          >Return to Login!</b
        >
      </p>
    </div>
  </v-sheet>
</template>

<script>
import { login, register } from '@/services/authService'
import { useRouter } from 'vue-router'
export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    let loader = false
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
          this.router.push({ name: 'CalculatorView' })
        })
        .finally(() => {
          this.loader = false
        })
    },
    async signup() {
      this.loader = true
      console.log(this.user.password + ' ' + this.confirmPassword)
      console.log(this.user.password === this.confirmPassword)

      if (this.user.password === this.confirmPassword) {
        console.log('entrei')
        await register(this.user).finally(() => {
          this.loader = false
        })
      } else {
        alert("The passwords don't match!")
        this.loader = false
      }
    },
    required(value) {
      return !!value || 'The Field is required'
    }
  }
}
</script>
