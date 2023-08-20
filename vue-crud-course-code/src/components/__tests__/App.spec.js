import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { createTestingPinia } from '@pinia/testing'
import router from '@/router'


describe('App.vue Test', () => {
  it('renders sub-components when the component is created', async() => {
    // push the '/' URL to Vue Router to load the Home page
    await router.push('/')

    // render the component
    const wrapper = mount(App, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    // check that all 3 sub-components are used
    expect(wrapper.getComponent({ name: 'AppHeader' }).exists()).toBeTruthy()
    expect(wrapper.getComponent({ name: 'AppContent' }).exists()).toBeTruthy()
    expect(wrapper.getComponent({ name: 'AppFooter' }).exists()).toBeTruthy()
  })

  it('renders about page', async () => {
    // push the '/about' URL to Vue Router to load the About page
    await router.push('/about')
  
    // render the component
    const wrapper = mount(App, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
  
    // check that 2 sub-components are rendered
    expect(wrapper.getComponent({ name: 'AppHeader' }).exists()).toBeTruthy()
    expect(wrapper.getComponent({ name: 'AppFooter' }).exists()).toBeTruthy()
  
    // check that the 'About' heading is displayed
    const heading = wrapper.findAll('h2')
    expect(heading.length).toEqual(1)
    expect(heading[0].text()).toMatch('About')
  })

  it('renders blog page', async () => {
    // push the '/blog' URL to Vue Router to load the Blog page
    await router.push('blog')
  
    // render the component
    const wrapper = mount(App, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
  
    // check that all 3 sub-components are rendered
    expect(wrapper.getComponent({ name: 'AppHeader' }).exists()).toBeTruthy()
    expect(wrapper.getComponent({ name: 'BlogEntries' }).exists()).toBeTruthy()
    expect(wrapper.getComponent({ name: 'AppFooter' }).exists()).toBeTruthy()
  })
})