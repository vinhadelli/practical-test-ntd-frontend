import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CalculatorView from '@/views/CalculatorView.vue'
import { add } from '@/services/calculatorService'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const vuetify = createVuetify()

// Mock the services and store
vi.mock('@/services/calculatorService', () => ({
  add: vi.fn(),
  subtract: vi.fn(),
  divide: vi.fn(),
  multiply: vi.fn(),
  squareRoot: vi.fn(),
  generateString: vi.fn()
}))

vi.mock('@/stores/userBalance', () => ({
  userBalanceStore: () => ({
    update: vi.fn()
  })
}))

describe('CalculatorView', () => {
  it('renders correctly', () => {
    const wrapper = mount(CalculatorView, { global: { plugins: [vuetify] } })
    expect(wrapper.find('h1').text()).toBe('Operations')
  })

  it('shows the correct label for first number', async () => {
    const wrapper = mount(CalculatorView, { global: { plugins: [vuetify] } })

    await wrapper.find('input[type="radio"][value="1"]').setValue('1')
    expect(wrapper.find('label[for="number1"]').text()).toBe('First Number')

    await wrapper.find('input[type="radio"][value="5"]').setValue('5')
    expect(wrapper.find('label[for="number1"]').text()).toBe('Number')
  })

  it('disables second number when selecting squareroot or string generation', async () => {
    const wrapper = mount(CalculatorView, { global: { plugins: [vuetify] } })

    await wrapper.find('input[type="radio"][value="1"]').setValue('1')
    expect(
      wrapper.find('input[type="number"][name="number2"]').attributes('disabled')
    ).toBeUndefined()

    await wrapper.find('input[type="radio"][value="5"]').setValue('5')
    expect(wrapper.find('input[type="number"][name="number2"]').attributes('disabled')).toBe('')

    await wrapper.find('input[type="radio"][value="6"]').setValue('6')
    expect(wrapper.find('input[type="number"][name="number2"]').attributes('disabled')).toBe('')
  })

  it('submits form and calls the appropriate service method', async () => {
    const wrapper = mount(CalculatorView, { global: { plugins: [vuetify] } })

    // Set up mock data
    add.mockResolvedValue({ data: 15 })

    await wrapper.find('input[type="radio"][value="1"]').setValue('1')
    await wrapper.find('input[type="number"][name="number1"]').setValue('10')
    await wrapper.find('input[type="number"][name="number2"]').setValue('5')

    await wrapper.find('form').trigger('submit.prevent')

    await wrapper.vm.$nextTick() // Wait for async updates

    expect(add).toHaveBeenCalledWith({
      number1: '10',
      number2: '5',
      operationType: 1
    })
    expect(wrapper.find('input[disabled][name="result"]').element.value).toBe('15')
  })

  it('validates form inputs correctly', async () => {
    const wrapper = mount(CalculatorView, { global: { plugins: [vuetify] } })

    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    await wrapper.find('form').trigger('submit.prevent')
    expect(alertMock).toHaveBeenCalledWith('Please fill all aplicable fields!')
  })
})
