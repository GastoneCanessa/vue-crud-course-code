import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount } from "@vue/test-utils"
import AddNewUser from '@/components/AddNewUser.vue'

let wrapper = null

// SETUP - run prior to each unit test
beforeEach(() => {
    wrapper = shallowMount(AddNewUser)
});


// TEARDOWN - run after to each unit test
afterEach(() => {
    wrapper.unmount()
});

// Unit test suite for the AddNewUser component
describe('AddNewUser.vue Test', () => {
    it('initializes with correct elements', () => {
        // check that the heading text is rendered
        const heading = wrapper.findAll('h1')
        expect(heading.length).toEqual(1)
        expect(heading[0].text()).toMatch('Add a New User:')
      
        // check that 3 labels are created
        const label = wrapper.findAll('label')
        expect(label.length).toEqual(3)
        expect(label[0].text()).toMatch('Name:')
        expect(label[1].text()).toMatch('Username:')
        expect(label[2].text()).toMatch('Email:')
    })

    it('emits an event when a new user with valid data is added', async () => {
    // set the input data for the user
    const nameInput = wrapper.find('#newName')
    const usernameInput = wrapper.find('#newUsername')
    const emailInput = wrapper.find('#newEmail')
    await nameInput.setValue('Name1')
    await usernameInput.setValue('Username1')
    await emailInput.setValue('user@email.com')
    
    // trigger an event when the 'Submit' button is clicked
    await wrapper.find('button').trigger('click')
    
    // check that 1 occurrence of the event has been emitted
    const emittedEvent = wrapper.emitted('createUser')
    expect(emittedEvent).toHaveLength(1)
    expect(emittedEvent[0]).toEqual([
        {
        name: 'Name1',
        username: 'Username1',
        email: 'user@email.com'
        }
    ])
    
    // check that the user data is cleared after emitting the event
    expect(nameInput.element.value).toBe('')
    expect(usernameInput.element.value).toBe('')
    expect(emailInput.element.value).toBe('')
    }) 

    it('does not emit an event when a new user without data is added', async () => {
        // don't set the input data for the user
      
        // trigger an event when the 'Submit' button is clicked
        await wrapper.find('button').trigger('click')
      
        // check that the event has NOT been emitted
        expect(wrapper.emitted('createUser')).toBeUndefined()
    })


  })  
  