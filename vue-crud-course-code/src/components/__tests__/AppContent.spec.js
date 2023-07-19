import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppContent from '@/components/AppContent.vue'

describe('AppContent.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(AppContent)

    // check that the title is rendered
    expect(wrapper.vm.message).toMatch('Content goes here!')
  })
})