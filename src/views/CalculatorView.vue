<template>
  <v-sheet rounded class="m-3 views text-center mt-10" min-width="500px">
    <div class="mr-5 ml-5 mb-10 mt-10">
      <h1>Operations</h1>
      <v-form class="mt-3" ref="form" v-model="calcForm" @submit.prevent="submit">
        <v-radio-group
          :rules="[() => !!calcRequest.operationType || 'This field is required']"
          inline
          v-model="calcRequest.operationType"
        >
          <v-radio class="mr-3" color="success" label="Addition" :value="1" />
          <v-radio class="mr-3" color="success" label="Subtract" :value="2" />
          <v-radio class="mr-3" color="success" label="Divide" :value="3" />
          <v-radio class="mr-3" color="success" label="Multiply" :value="4" />
          <v-radio class="mr-3" color="success" label="Square Root" :value="5" />
          <v-radio class="mr-3" color="success" label="Generate Random String" :value="6" />
        </v-radio-group>
        <v-divider />
        <v-text-field
          v-model="calcRequest.number1"
          class="mt-9"
          :label="labelFirst"
          variant="outlined"
          type="number"
        />
        <v-text-field
          v-model="calcRequest.number2"
          class="mt-5"
          :label="labelSecond"
          variant="outlined"
          :disabled="calcRequest.operationType == 5 || calcRequest.operationType == 6"
          type="number"
        />
        <v-text-field
          v-model="result"
          class="mt-5"
          label="Result"
          variant="outlined"
          type="text"
          disabled
        />
        <v-divider />
        <v-btn
          class="mt-5"
          :disabled="!calcForm"
          color="#007e54"
          size="large"
          type="submit"
          variant="elevated"
          :loading="this.loader"
          block
        >
          Calculate
        </v-btn>
      </v-form>
    </div>
  </v-sheet>
</template>
<script>
import { userBalanceStore } from '@/stores/userBalance'
import {
  add,
  subtract,
  divide,
  multiply,
  squareRoot,
  generateString
} from '@/services/calculatorService'
export default {
  data() {
    return {
      operation: '',
      calcForm: false,
      loader: false,
      result: null,
      calcRequest: {
        number1: null,
        number2: null,
        operationType: null
      }
    }
  },
  setup() {
    const userBalance = userBalanceStore()
    userBalance.update()
    return { userBalance }
  },
  mounted() {
    this.userBalance.update()
  },
  methods: {
    update() {
      this.userBalance.update()
    },
    async submit() {
      if (!this.validate()) return
      this.loader = true
      this.result = null

      switch (this.calcRequest.operationType) {
        case 1:
          await add(this.calcRequest)
            .then((response) => (this.result = response.data))
            .finally(() => (this.loader = false))
          break
        case 2:
          await subtract(this.calcRequest)
            .then((response) => (this.result = response.data))
            .finally(() => (this.loader = false))
          break
        case 3:
          await divide(this.calcRequest)
            .then((response) => (this.result = response.data))
            .finally(() => (this.loader = false))
          break
        case 4:
          await multiply(this.calcRequest)
            .then((response) => (this.result = response.data))
            .finally(() => (this.loader = false))
          break
        case 5:
          await squareRoot(this.calcRequest)
            .then((response) => (this.result = response.data))
            .finally(() => (this.loader = false))
          break
        case 6:
          await generateString(this.calcRequest)
            .then((response) => (this.result = response.data))
            .finally(() => (this.loader = false))
          break
      }
      this.userBalance.update()
      this.loader = false
    },
    validate() {
      if (!this.calcRequest.number1) {
        alert('Please fill all aplicable fields!')
        return false
      }
      if (this.calcRequest.operationType != 5 && this.calcRequest.operationType != 6) {
        if (!this.calcRequest.number2) {
          alert('Please fill all aplicable fields!')
          return false
        }
      }
      return true
    }
  },
  computed: {
    labelFirst() {
      switch (this.calcRequest.operationType) {
        case 5:
          return 'Number'
        case 6:
          return 'Length'
        default:
          return 'First Number'
      }
    },
    labelSecond() {
      switch (this.calcRequest.operationType) {
        case 5:
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.calcRequest.number2 = null
          return 'Not aplicable'
        case 6:
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.calcRequest.number2 = null
          return 'Not aplicable'
        default:
          return 'Second Number'
      }
    }
  }
}
</script>
