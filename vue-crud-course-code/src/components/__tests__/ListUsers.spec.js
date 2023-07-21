import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ListUsers from '@/components/ListUsers.vue'

describe('ListUsers.vue Test', () => {
  let wrapper = null

  // SETUP - run prior to each unit test
  beforeEach(() => {
    // render the component
    wrapper = shallowMount(ListUsers, {
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
  })

  // TEARDOWN - run after to each unit test
  afterEach(() => {
    wrapper.unmount()
  })

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
    expect(tableColumns.length).toEqual(5)
    expect(tableColumns[0].text()).toMatch('User ID')
    expect(tableColumns[1].text()).toMatch('Name')
    expect(tableColumns[2].text()).toMatch('Username')
    expect(tableColumns[3].text()).toMatch('Email')
    expect(tableColumns[4].text()).toMatch('Actions') 

    // check that 2 user rows with 4 columns each are created in the table
    const tableData = wrapper.findAll('td')
    expect(tableData.length).toEqual(10)
    expect(tableData[0].text()).toMatch('1')
    expect(tableData[1].text()).toMatch('Test User #1')
    expect(tableData[2].text()).toMatch('user_1')
    expect(tableData[3].text()).toMatch('test1@gmail.com')
    expect(tableData[4].text()).toMatch('Delete') 
    expect(tableData[5].text()).toMatch('2')
    expect(tableData[6].text()).toMatch('Test User #2')
    expect(tableData[7].text()).toMatch('user_2')
    expect(tableData[8].text()).toMatch('test2@gmail.com')
    expect(tableData[9].text()).toMatch('Delete')

    // check that the Delete and Edit buttons are displayed
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toEqual(4)

    const deleteButtons = wrapper.findAll('#deleteButton')
    expect(deleteButtons[0].isVisible()).toBe(true)  
    expect(deleteButtons[1].isVisible()).toBe(true)  

    const editButtons = wrapper.findAll('#editButton')
    expect(editButtons[0].isVisible()).toBe(true)   
    expect(editButtons[1].isVisible()).toBe(true)   
  })

  it('emits an event when a user is deleted', async () => {
    // trigger an event when the 'Submit' button is clicked
    await wrapper.find('button').trigger('click')
  
    // check that 1 occurrence of the event has been emitted
    const emittedEvent = wrapper.emitted('deleteUser')
    expect(emittedEvent).toBeTruthy()
    expect(emittedEvent).toHaveLength(1)
  })

  it('enables the modal when an edit button is clicked', async () => {
    // trigger an event when the 'Edit' button is clicked
    await wrapper.findAll('button')[1].trigger('click')
  
    // check that the flag to enable the modal is set
    expect(wrapper.vm.showEditModal).toBeTruthy()
  
    // check that user #1 is set as the prop data for the modal
    expect(wrapper.vm.userEditing.id).toEqual(1)
    expect(wrapper.vm.userEditing.name).toMatch('Test User #1')
    expect(wrapper.vm.userEditing.username).toMatch('user_1')
    expect(wrapper.vm.userEditing.email).toMatch('test1@gmail.com')
  })

  it('disables the modal when the cancel event occurs', async () => {
    // set the flag to enable the modal
    wrapper.vm.showEditModal = true
  
    // simulate the 'cancelEdit' event being generated
    wrapper.vm.cancelEdit()
  
    // check that the flag to enable the modal is cleared
    expect(wrapper.vm.showEditModal).not.toBeTruthy()
  })

  it('emits an event when a user is updated', async () => {
    var user1 = {
      'id': 1,
      'name': 'Name1',
      'username': 'Username1',
      'email': 'Email1'
    }
  
    wrapper.vm.updateUser(user1)
  
    // check that 1 occurrence of the event has been emitted
    const emittedEvent = wrapper.emitted('updateUser')
    expect(emittedEvent).toHaveLength(1)
    expect(emittedEvent[0]).toEqual([user1])
  })
})