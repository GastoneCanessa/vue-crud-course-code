import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '../AppHeader.vue'
import router from '@/router/index'

describe('AppHeader.vue Test', () => {
    it('renders message when component is created', async () => {
        // push the '/' link to Vue Router to load the Home page
        await router.push("/")

        // render the component
        const wrapper = mount(AppHeader, {
            propsData: {
                title: 'Vue Project'
            },
            global: {
              plugins: [router]
            }
        })
        
        // check that the title is displayed
        expect(wrapper.text()).toMatch('Vue Project')

        // check that 3 navigation links are displayed
        const items = wrapper.findAll('li')
        expect(items.length).toEqual(3)
        expect(items[0].text()).toMatch('Home')
        expect(items[1].text()).toMatch('About')
        expect(items[2].text()).toMatch('Blog')
    })
})
