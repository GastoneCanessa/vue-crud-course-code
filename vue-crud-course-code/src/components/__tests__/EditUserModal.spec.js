import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import EditUserModal from '@/components/EditUserModal.vue'

describe('EditUserModal.vue Test', () => {
    let wrapper = null
  
    // SETUP - run prior to each unit test
    beforeEach(() => {
      // render the component
      wrapper = shallowMount(EditUserModal, {
        propsData: {
          user: {
            id: 1,
            name: 'Test User #1',
            username: 'user_1',
            email: 'test1@gmail.com'
          }
        }
      })
    })
  
    // TEARDOWN - run after to each unit test
    afterEach(() => {
      wrapper.unmount()
    })

    it('renders the fields for editing a user when component is created', async () => {
        // Wait until the DOM updates
        await flushPromises()
      
        // check that the heading text is rendered
        const heading = wrapper.findAll('h1')
        expect(heading.length).toEqual(1)
        expect(heading[0].text()).toMatch('Edit User:')
      
        // check that 3 labels are created
        const labels = wrapper.findAll('label')
        expect(labels.length).toEqual(3)
        expect(labels[0].text()).toMatch('Name:')
        expect(labels[1].text()).toMatch('Username:')
        expect(labels[2].text()).toMatch('Email:')
      
        // check that the prop data is used to initialize the input fields
        const inputs = wrapper.findAll('input')
        expect(inputs.length).toEqual(3)
        expect(inputs[0].element.value).toMatch('Test User #1')
        expect(inputs[1].element.value).toMatch('user_1')
        expect(inputs[2].element.value).toMatch('test1@gmail.com')
      
        // check that 2 buttons are created
        const buttons = wrapper.findAll('button')
        expect(buttons.length).toEqual(2)
        expect(buttons[0].text()).toMatch('Update')
        expect(buttons[1].text()).toMatch('Cancel')

    })

    it('emits an event the cancel button is clicked', async () => {
    // trigger an event when the 'Cancel' button is clicked
    await wrapper.find('.cancelButton').trigger('click')
    
    // check that 1 occurrence of the event has been emitted
    const emittedEvent = wrapper.emitted('cancelEdit')
    expect(emittedEvent).toHaveLength(1)
    })  

    it('emits an event the backdrop is clicked', async () => {
        // trigger an event when the modal backdrop is clicked
        await wrapper.find('.modal-backdrop').trigger('click')
      
        // check that 1 occurrence of the event has been emitted
        const emittedEvent = wrapper.emitted('cancelEdit')
        expect(emittedEvent).toHaveLength(1)
    })

    it('emits an event when the update button is clicked', async () => {
        // set the input data for the user
        const nameInput = wrapper.find('#newName')
        const usernameInput = wrapper.find('#newUsername')
        const emailInput = wrapper.find('#newEmail')
        await nameInput.setValue('Name1')
        await usernameInput.setValue('Username1')
        await emailInput.setValue('user@email.com')
      
        // trigger an event when the 'Submit' button is clicked
        await wrapper.find('.submitButton').trigger('click')
      
        // check that 1 occurrence of the event has been emitted
        const emittedEvent = wrapper.emitted('updateUser')
        expect(emittedEvent).toHaveLength(1)
        expect(emittedEvent[0]).toEqual([
          {
            id: 1,
            name: 'Name1',
            username: 'Username1',
            email: 'user@email.com'
          }
        ])
    })
  })