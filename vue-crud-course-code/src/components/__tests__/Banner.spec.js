import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import Banner from '@/components/Banner.vue'
import { useBannerStore } from '@/stores/banner'

// Factory function for initializing the state in the data store (banner)
// and for rendering the Banner component
const factory = (initialBannerMessage = '', initialBannerType = 'Info') => {
  // Render the component
  const wrapper = shallowMount(Banner, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            banner: { bannerMessage: initialBannerMessage, bannerType: initialBannerType }
          }
        })
      ]
    }
  })
  
  // Create the data store using the testing pinia
  const bannerStore = useBannerStore()

  return { wrapper, bannerStore }
}

// Unit test suite for the Banner component
describe('Banner.vue Test', () => {  
  it('initializes with correct elements', () => {
    const { wrapper, bannerStore } = factory()

    // check that the banner message is initialized to an empty string
    const banner = wrapper.find('div')
    expect(banner.text()).toMatch('')
    expect(banner.isVisible()).toBe(false)
    expect(banner.attributes().style).toMatch('background-color: blue;')
  })
  
  it('initializes with error message', () => {
    // set the banner data to display an error message
    const { wrapper, bannerStore } = factory('Banner message 123', 'Error')

    // check that the banner message displays the error message
    const banner = wrapper.find('div')
    expect(banner.text()).toMatch('Banner message 123')
    expect(banner.isVisible()).toBe(true)
    expect(banner.attributes().style).toMatch('background-color: red;')
  })
  
  it('initializes with success message', async () => {
    // set the banner data to display a success message
    const { wrapper, bannerStore } = factory('Banner message 456', 'Success')

    // check that the banner message displays the success message
    const banner = wrapper.find('div')
    expect(banner.text()).toMatch('Banner message 456')
    expect(banner.isVisible()).toBe(true)
    expect(banner.attributes().style).toMatch('background-color: green;')
  })
  
  it('initializes with info message', async () => {
    // set the banner data to display an info message
    const { wrapper, bannerStore } = factory('Banner message 789', 'Info')

    // check that the banner message displays the info message
    const banner = wrapper.find('div')
    expect(banner.text()).toMatch('Banner message 789')
    expect(banner.isVisible()).toBe(true)
    expect(banner.attributes().style).toMatch('background-color: blue;')
  })

  it('banner data is cleared when the clear button is clicked', async () => {
    const { wrapper, bannerStore } = factory('Banner message 123', 'Error')

    // trigger an event when the 'Clear' button is clicked
    await wrapper.find('span').trigger('click')
  
    // check that 1 call was made to `store.setBannerData`
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(1)
    expect(bannerStore.setBannerData).toHaveBeenLastCalledWith('', 'Info')
  })
})
