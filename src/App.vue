<template>
  <v-layout class="rounded rounded-md">
    <HeaderBar />
    <v-main class="d-flex align-center justify-center">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script>
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
export default {
  components: {
    HeaderBar,
    RouterView
  },
  setup() {
    const router = useRouter()
    let user = JSON.parse(localStorage.getItem('user'))

    if (user == null) {
      localStorage.removeItem('user')
      router.push({ name: 'LoginView' })
    }
  }
}
</script>

<style></style>
