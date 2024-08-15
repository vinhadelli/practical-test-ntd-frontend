<template>
  <div>
    <v-overlay v-show="loader">
      <v-progress-circular
        color="primary"
        indeterminate
        :size="69"
        :width="7"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  data() {
    // const loader = inject('loader')
    const loader = true
    return { loader }
  },
  setup() {
    const isLoaderVisible = computed(() => {
      return this.loader
    })

    return {
      isLoaderVisible
    }
  }
}
</script>
