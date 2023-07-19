import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppFooter from '@/components/AppFooter.vue'

describe('AppFoter.vue Test', () => {
    it('renders message when component is created', () => {
        // render the component
        const wrapper = shallowMount(AppFooter)

        // check that the title is rendered
        expect(wrapper.text()).toMatch('TestDriven.io')
    })
})