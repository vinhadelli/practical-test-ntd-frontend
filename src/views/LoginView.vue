<template>
  <v-sheet rounded class="m-3 about">
    <LoadOverlay />
    <div v-if="!isSignUp">
      <h1>Login</h1>
      <v-form v-model="loginForm" @submit.prevent="submit">
        <v-text-field
          v-model="user.username"
          class="mt-2"
          label="E-mail"
          variant="outlined"
          type="email"
          placeholder="example@email.com"
          :rules="[required]"
        />
        <v-text-field
          v-model="user.password"
          class="mt-2"
          label="Password"
          variant="outlined"
          type="password"
          placeholder="Enter your password"
          :rules="[required]"
        />
        <v-text-field
          v-if="isSignUp"
          v-model="confirmPassword"
          class="mt-2"
          label="Confirm the Password"
          variant="outlined"
          type="password"
          placeholder="Confirm your password"
          :rules="[required]"
        />
        <v-divider />
        <v-btn
          class="mt-2"
          :disabled="!loginForm"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          <span v-if="!isSignUp">Login</span>
          <span v-if="!isSignUp">Sign Up</span>
        </v-btn>
      </v-form>
    </div>
  </v-sheet>
</template>

<script>
import { login, register } from '@/services/authService'
import { loading, doneLoading } from '@/utils/LoaderUtils'
import LoadOverlay from '@/components/LoadOverlay.vue'
import { useRouter } from 'vue-router'
export default {
  name: 'LoginView',
  components: {
    LoadOverlay
  },
  setup() {
    const router = useRouter()
    return {
      router
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
    submit() {
      if (this.isSignUp) this.signup()
      else this.login()
    },
    async login() {
      loading()
      console.log('User', this.user) // TODO: remove console.log
      await login(this.user).finally(() => {
        doneLoading()
      })
    },
    async signup() {
      loading()
      if (this.password.equals(this.confirmPassword)) {
        await register(this.user).finally(() => {
          doneLoading()
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
