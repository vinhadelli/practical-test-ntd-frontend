/**
 * @vites-environment happy-dom
 */

import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import LoginView from '@/views/LoginView.vue'
import { login, register } from '@/services/authService'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const vuetify = createVuetify()

// Mock the services
vi.mock('@/services/authService', () => ({
  login: vi.fn().mockResolvedValue('Login successful'),
  register: vi.fn().mockResolvedValue('Registered successful')
}))

describe('LoginView.vue', () => {
  it('renders Login and Sign Up text based on isSignUp', async () => {
    const wrapper = mount(LoginView)

    // Check initial render for Login
    expect(wrapper.text()).toContain('Login')

    // Switch to Sign Up mode
    await wrapper.find('b.text-accent').trigger('click')
    await flushPromises()

    expect(wrapper.text()).toContain('Sign Up')
  })

  it('submits login form correctly', async () => {
    const wrapper = mount(LoginView, { global: { plugins: [vuetify] } })

    // Wait for rendering
    await wrapper.vm.$nextTick()
    await flushPromises()

    // Fill the form
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    // await wrapper.find('#passwd').setValue('password123')

    // Trigger form submission
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(login).toHaveBeenCalledWith({
      username: 'test@example.com',
      password: 'password123'
    })
  })

  it('submits signup form correctly if passwords match', async () => {
    const wrapper = mount(LoginView, { global: { plugins: [vuetify] } })

    // Switch to Sign Up mode
    await wrapper.find('b.text-accent').trigger('click')
    await flushPromises()

    // Fill the form
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper
      .find('input[type="password"][placeholder="Confirm your password"]')
      .setValue('password123')

    // Trigger form submission
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(register).toHaveBeenCalledWith({
      username: 'test@example.com',
      password: 'password123'
    })
  })

  it('alerts if passwords do not match on signup', async () => {
    const wrapper = mount(LoginView)

    // Switch to Sign Up mode
    await wrapper.find('b.text-accent').trigger('click')
    await flushPromises()

    // Fill the form
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper
      .find('input[type="password"][placeholder="Confirm your password"]')
      .setValue('differentpassword')

    // Mock alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    // Trigger form submission
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(alertMock).toHaveBeenCalledWith("The passwords don't match!")
  })
})
