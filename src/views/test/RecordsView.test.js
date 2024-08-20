import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import RecordsView from '@/views/RecordsView.vue'
import { getUserRecords, deleteUserRecord } from '@/services/recordsService'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const vuetify = createVuetify()

// Mock the services
vi.mock('@/services/recordsService', () => ({
  getUserRecords: vi.fn().mockResolvedValue({
    data: {
      totalElements: 50,
      content: [{ id: 1, date: new Date('20/08/2024') }]
    }
  }),
  deleteUserRecord: vi.fn().mockResolvedValue({})
}))

describe('RecordsView', () => {
  it('renders the component and its elements', () => {
    const wrapper = mount(RecordsView, { global: { plugins: [vuetify] } })

    // Check if v-data-table-server is rendered
    expect(wrapper.findComponent({ name: 'v-data-table-server' }).exists()).toBe(true)

    // Check if v-dialog is rendered
    expect(wrapper.findComponent({ name: 'v-dialog' }).exists()).toBe(true)

    // Check if the initial state of the delete dialog is closed
    expect(wrapper.vm.deleteDialog).toBe(false)
  })

  it('opens delete dialog with correct record', async () => {
    const wrapper = mount(RecordsView, { global: { plugins: [vuetify] } })
    const record = { id: 1 } // Example record

    // Simulate opening the delete dialog
    await wrapper.vm.openDeleteDialog(record)

    // Check if the delete dialog is open
    expect(wrapper.vm.deleteDialog).toBe(true)

    // Check if the record to delete is set correctly
    expect(wrapper.vm.recordToDelete).toEqual(record)
  })

  it('fetches records and updates table data', async () => {
    const wrapper = mount(RecordsView, { global: { plugins: [vuetify] } })

    // Trigger the getRecords method
    await wrapper.vm.getRecords({ page: 1, itemsPerPage: 10, sortBy: [] })

    // Check if the records and total number of records are updated
    expect(wrapper.vm.records).toEqual([{ id: 1, date: new Date('20-08-2024') }])
    expect(wrapper.vm.totalNumberOfRecords).toBe(50)
  })

  it('handles delete record operation', async () => {
    const wrapper = mount(RecordsView, { global: { plugins: [vuetify] } })
    const record = { id: 1 }

    // Set up the delete dialog
    wrapper.vm.recordToDelete = record
    wrapper.vm.deleteDialog = true

    // Trigger deleteRecord method
    await wrapper.vm.deleteRecord()

    // Check if deleteRecord method triggered the API call and updated the dialog
    expect(deleteUserRecord).toHaveBeenCalledWith(record.id)
    expect(wrapper.vm.deleteDialog).toBe(false)
  })
})
