import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BlogEntries from '@/components/BlogEntries.vue'

describe('BlogEntries.vue Test', () => {
  it('renders three blog posts when component is created', () => {
    // render the component
    const wrapper = shallowMount(BlogEntries)

    // check that the blog post titles are rendered
    const titles = wrapper.findAll('h2')
    expect(titles.length).toEqual(3)
    expect(titles[0].text()).toMatch('My Favorite Aspects of Vue')
    expect(titles[1].text()).toMatch('How to Use Components to Build Complex Web Applications')
    expect(titles[2].text()).toMatch('Unit Testing a Pinia Data Store')
  })
})