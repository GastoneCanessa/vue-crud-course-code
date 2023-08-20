import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import AppContent from '@/components/AppContent.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createTestingPinia } from '@pinia/testing'
import { useBannerStore } from '@/stores/banner'

// Set the mock adapter for mocking the axios library
var mock = new MockAdapter(axios);

describe('AppContent.vue Test with Successful HTTP calls', () => {
  let wrapper = null
  let bannerStore = null

  beforeEach(() => {
    // Mock any GET requests to the specified URL
    // NOTE: arguments for reply are (status, data, headers)
    mock.onGet("https://jsonplaceholder.typicode.com/users").reply(200, [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz'
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv'
      }
    ])

    // Mock any POST calls to the specified URL
    // NOTE: arguments for reply are (status, data, headers)
    mock.onPost("https://jsonplaceholder.typicode.com/users").reply(201, [
      {
        id: 3,
        name: 'Patrick',
        username: 'patrick123',
        email: 'patrick@email.com'
      }
    ])

    // Mock any DELETE calls to the specified URL
    // NOTE: arguments for reply are (status, data, headers)
    mock.onDelete("https://jsonplaceholder.typicode.com/users/2").reply(200, [
      {
        id: 2
      }
    ])

    // Mock any PUT calls to the specified URL
    // NOTE: arguments for reply are (status, data, headers)
    mock.onPut("https://jsonplaceholder.typicode.com/users/1").reply(200, [
      {
        id: 1,
        name: 'Patrick',
        username: 'patrick456',
        email: 'patrick@email.com'
      }
    ])

    // render the component
    wrapper = shallowMount(AppContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    // Create the data store using the testing pinia
    bannerStore = useBannerStore()
  })

  afterEach(() => {
    mock.reset();
    wrapper.unmount()
  })

  it('loads the user data when the component is created and mounted', () => {
    // check that the heading text is rendered
    const heading = wrapper.findAll('h1')
    expect(heading.length).toEqual(1)
    expect(heading[0].text()).toMatch('List of Users:')

    // Check that one call was made to axios.get()
    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toMatch('https://jsonplaceholder.typicode.com/users')
    expect(mock.history.get[0].method).toMatch('get')

    // Check that the user data is properly set
    expect(wrapper.vm.users.length).toEqual(2)
    expect(wrapper.vm.users[0].name).toMatch('Leanne Graham')
    expect(wrapper.vm.users[0].username).toMatch('Bret')
    expect(wrapper.vm.users[0].email).toMatch('Sincere@april.biz')
    expect(wrapper.vm.users[1].name).toMatch('Ervin Howell')
    expect(wrapper.vm.users[1].username).toMatch('Antonette')
    expect(wrapper.vm.users[1].email).toMatch('Shanna@melissa.tv')

    // check that 1 call was made to `store.setBannerData`
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(1)
    expect(bannerStore.setBannerData).toHaveBeenLastCalledWith('SUCCESS! Loaded user data!', 'Success')
  })

  it('saves the new user data', async () => {
    // set the input data for user #3
    var newUser3 = {
      id: 3,
      name: 'Patrick',
      username: 'patrick123',
      email: 'patrick@email.com',
    }
  
    // call the createNewUser() function with user #3
    wrapper.vm.createNewUser(newUser3);
  
    // Wait until the DOM updates
    await flushPromises()
  
    // Check that one call was made to axios.post()
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toMatch('https://jsonplaceholder.typicode.com/users')
    expect(mock.history.post[0].method).toMatch('post')
  
    // Check that the user data is properly set
    expect(wrapper.vm.users.length).toEqual(3)
    expect(wrapper.vm.users[2].name).toMatch(newUser3.name)
    expect(wrapper.vm.users[2].username).toMatch(newUser3.username)
    expect(wrapper.vm.users[2].email).toMatch(newUser3.email)

    // check that 2 calls were made to `store.setBannerData`:
    //   1. Retrieving user data via HTTP GET in onMounted()
    //   2. Creating the user data via HTTP POST
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(2)
    expect(bannerStore.setBannerData).toHaveBeenLastCalledWith('SUCCESS! User data was saved!', 'Success')
  })

  it('deletes the user #2 data', async () => {
    // set the input data for the user to delete
    var deleteUser2 = {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    }
  
    // call the deleteUser() function with user #2
    wrapper.vm.deleteUser(deleteUser2);
  
    // Wait until the DOM updates
    await flushPromises()
  
    // Check that one call was made to axios.delete()
    expect(mock.history.delete.length).toBe(1);
    expect(mock.history.delete[0].url).toMatch('https://jsonplaceholder.typicode.com/users/2')
    expect(mock.history.delete[0].method).toMatch('delete')
  
    // Check that the user data is properly set
    expect(wrapper.vm.users.length).toEqual(1)

    // check that 2 calls were made to `store.setBannerData`:
    //   1. Retrieving user data via HTTP GET in onMounted()
    //   2. Deleting the user data via HTTP DELETE
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(2)
    expect(bannerStore.setBannerData).toHaveBeenLastCalledWith('SUCCESS! User #2 was deleted!', 'Success')
  })

  it('updates the data for user #1', async () => {
    // set the input data for the user to update
    var updateUser1 = {
      id: 1,
      name: 'Patrick',
      username: 'patrick456',
      email: 'patrick@email.com'
    }
  
    // call the updateUser() function with user #1
    wrapper.vm.updateUser(updateUser1)
  
    // Wait until the DOM updates
    await flushPromises()
  
    // Check that one call was made to axios.put()
    expect(mock.history.put.length).toBe(1);
    expect(mock.history.put[0].url).toMatch('https://jsonplaceholder.typicode.com/users/1')
    expect(mock.history.put[0].method).toMatch('put')
  
    // Check that the user data is properly set
    expect(wrapper.vm.users.length).toEqual(2)
    expect(wrapper.vm.users[0].name).toMatch('Patrick')
    expect(wrapper.vm.users[0].username).toMatch('patrick456')
    expect(wrapper.vm.users[0].email).toMatch('patrick@email.com')
    expect(wrapper.vm.users[1].name).toMatch('Ervin Howell')
    expect(wrapper.vm.users[1].username).toMatch('Antonette')
    expect(wrapper.vm.users[1].email).toMatch('Shanna@melissa.tv')
    
    // check that 2 calls were made to `store.setBannerData`:
    //   1. Retrieving user data via HTTP GET in onMounted()
    //   2. Updating the user data via HTTP PUT
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(2)
    expect(bannerStore.setBannerData).toHaveBeenLastCalledWith('SUCCESS! User #1 was updated!', 'Success')
  })
})

describe('AppContent.vue Test with Failed HTTP GET', () => {
  let wrapper = null
  let bannerStore = null

  afterEach(() => {
    mock.reset();
    wrapper.unmount()
  })

  it('loads no user data when the HTTP GET request timeout', async () => {
    // Set the mock call to GET to timeout
    mock.onGet("https://jsonplaceholder.typicode.com/users").timeout()

    // render the component
    wrapper = shallowMount(AppContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    // Create the data store using the testing pinia
    bannerStore = useBannerStore()

    // Wait until the DOM updates
    await flushPromises()

    // Check that one call was made to axios.get()
    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toMatch('https://jsonplaceholder.typicode.com/users')
    expect(mock.history.get[0].method).toMatch('get')

    // Check that there is no user data loaded when the GET request times out
    expect(wrapper.vm.users.length).toEqual(0)

    // check that 1 call was made to `store.setBannerData`
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(1)
    expect(bannerStore.setBannerData).toHaveBeenLastCalledWith('ERROR! Unable to load user data!', 'Error')
  })

  it('loads no user data when the HTTP GET request fails', async () => {
    // Set the mock call to GET to fail (404 - Not Found)
    mock.onGet("https://jsonplaceholder.typicode.com/users").reply(404)

    // render the component
    wrapper = shallowMount(AppContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    // Create the data store using the testing pinia
    bannerStore = useBannerStore()

    // Wait until the DOM updates
    await flushPromises()

    // Check that one call was made to axios.get()
    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toMatch('https://jsonplaceholder.typicode.com/users')
    expect(mock.history.get[0].method).toMatch('get')

    // Check that there is no user data loaded when the GET request fails
    expect(wrapper.vm.users.length).toEqual(0)

    // check that 1 call was made to `store.setBannerData`
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(1)
    expect(bannerStore.setBannerData).toHaveBeenLastCalledWith('ERROR! Unable to load user data!', 'Error')
  })
})

describe('AppContent.vue Test with Successful HTTP GET, Failed HTTP POST, Failed HTTP DELETE, and Failed HTTP PUT', () => {
  let wrapper = null
  let bannerStore = null

  beforeEach(() => {
    // Mock any GET requests to the specified URL
    // NOTE: arguments for reply are (status, data, headers)
    mock.onGet("https://jsonplaceholder.typicode.com/users").reply(200, [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz'
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv'
      }
    ])

    // Mock any POST calls to the specified URL
    mock.onPost("https://jsonplaceholder.typicode.com/users").reply(404)

    // Mock any DELETE calls to the specified URL
    mock.onDelete("https://jsonplaceholder.typicode.com/users/2").reply(404)

    // Mock any PUT calls to the specified URL
    mock.onPut("https://jsonplaceholder.typicode.com/users/1").reply(404)

    // render the component
    wrapper = shallowMount(AppContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    // Create the data store using the testing pinia
    bannerStore = useBannerStore()
  })

  afterEach(() => {
    mock.reset();
    wrapper.unmount()
  })

  it('does not save the new user data on failed HTTP POST call', async () => {
    // set the input data for user #3
    var newUser3 = {
      id: 3,
      name: 'Patrick',
      username: 'patrick123',
      email: 'patrick@email.com'
    }
  
    // Check that one call was made to axios.get()
    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toMatch('https://jsonplaceholder.typicode.com/users')
    expect(mock.history.get[0].method).toMatch('get')
  
    // call the createNewUser() function with user #3
    wrapper.vm.createNewUser(newUser3);
  
    // Wait until the DOM updates
    await flushPromises()
  
    // Check that one call was made to axios.post()
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toMatch('https://jsonplaceholder.typicode.com/users')
    expect(mock.history.post[0].method).toMatch('post')
  
    // Check that the new user data was not added
    expect(wrapper.vm.users.length).toEqual(2)

    // check that 2 calls were made to `store.setBannerData`:
    //   1. Retrieving user data via HTTP GET in onMounted()
    //   2. Attempting to create the user data via HTTP POST
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(2)
    expect(bannerStore.setBannerData).toHaveBeenLastCalledWith('ERROR! Unable to save user data!', 'Error')
  })
  
  it('does not delete the user data on failed HTTP DELETE call', async () => {
    // set the input data for the user to delete
    var deleteUser2 = {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    }
  
    // call the createUser() function with user #1
    wrapper.vm.deleteUser(deleteUser2);
  
    // Wait until the DOM updates
    await flushPromises()
  
    // Check that one call was made to axios.delete()
    expect(mock.history.delete.length).toBe(1);
    expect(mock.history.delete[0].url).toMatch('https://jsonplaceholder.typicode.com/users/2')
    expect(mock.history.delete[0].method).toMatch('delete')
  
    // Check that the user data was not deleted
    expect(wrapper.vm.users.length).toEqual(2)

    // check that 2 calls were made to `store.setBannerData`:
    //   1. Retrieving user data via HTTP GET in onMounted()
    //   2. Attempting to delete the user data via HTTP DELETE
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(2)
    expect(bannerStore.setBannerData).toHaveBeenLastCalledWith('ERROR! Unable to delete user #2!', 'Error')
  })

  it('does not update the user data on failed HTTP PUT call', async () => {
    // set the input data for the user to delete
    var updateUser1 = {
      index: 0,
      id: 1,
      name: 'Leanne123',
      username: 'Bret456',
      email: 'Sincere@april.biz'
    }
  
    // call the updateUser() function with user #1
    wrapper.vm.updateUser(updateUser1)
  
    // Wait until the DOM updates
    await flushPromises()

    // Check that one call was made to axios.put()
    expect(mock.history.put.length).toBe(1);
    expect(mock.history.put[0].url).toMatch('https://jsonplaceholder.typicode.com/users/1')
    expect(mock.history.put[0].method).toMatch('put')
      
    // Check that the user data was not deleted
    expect(wrapper.vm.users.length).toEqual(2)
      
    // check that 2 calls were made to `store.setBannerData`:
    //   1. Retrieving user data via HTTP GET in onMounted()
    //   2. Attempting to update the user data via HTTP PUT
    expect(bannerStore.setBannerData).toHaveBeenCalledTimes(2)
    expect(bannerStore.setBannerData).toHaveBeenLastCalledWith('ERROR! Unable to update user #1!', 'Error')
  })
})
