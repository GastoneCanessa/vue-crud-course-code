import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue Test', () => {
  it('renders sub-components when the component is created', () => {
    // render the component
    const wrapper = mount(App)

    // check that all 3 sub-components are used
    expect(wrapper.getComponent({ name: 'AppHeader' }).exists()).toBeTruthy()
    expect(wrapper.getComponent({ name: 'AppContent' }).exists()).toBeTruthy()
    expect(wrapper.getComponent({ name: 'AppFooter' }).exists()).toBeTruthy()
  })
})