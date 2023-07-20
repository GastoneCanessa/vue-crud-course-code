import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ListUsers from '@/components/ListUsers.vue'

describe('ListUsers.vue Test', () => {
  it('renders a table of users when component is created', () => {
    // render the component
    const wrapper = shallowMount(ListUsers, {
      propsData: {
        users: [
          {
            id: 1,
            name: 'Test User #1',
            username: 'user_1',
            email: 'test1@gmail.com',
          },
          {
            id: 2,
            name: 'Test User #2',
            username: 'user_2',
            email: 'test2@gmail.com',
          }
        ]
      }
    })

    // check that 4 columns are created in the table
    const tableColumns = wrapper.findAll('th')
    expect(tableColumns.length).toEqual(4)
    expect(tableColumns[0].text()).toMatch('User ID')
    expect(tableColumns[1].text()).toMatch('Name')
    expect(tableColumns[2].text()).toMatch('Username')
    expect(tableColumns[3].text()).toMatch('Email')

    // check that 2 user rows with 4 columns each are created in the table
    const tableData = wrapper.findAll('td')
    expect(tableData.length).toEqual(8)
    expect(tableData[0].text()).toMatch('1')
    expect(tableData[1].text()).toMatch('Test User #1')
    expect(tableData[2].text()).toMatch('user_1')
    expect(tableData[3].text()).toMatch('test1@gmail.com')
    expect(tableData[4].text()).toMatch('2')
    expect(tableData[5].text()).toMatch('Test User #2')
    expect(tableData[6].text()).toMatch('user_2')
    expect(tableData[7].text()).toMatch('test2@gmail.com')
  })
})