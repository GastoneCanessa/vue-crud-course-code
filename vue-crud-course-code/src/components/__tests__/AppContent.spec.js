import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppContent from '@/components/AppContent.vue'

describe('AppContent.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(AppContent)

   // check that the heading text is rendered
   const heading = wrapper.findAll('h1')
   expect(heading.length).toEqual(1)
   expect(heading[0].text()).toMatch('List of Users:')
  })
})