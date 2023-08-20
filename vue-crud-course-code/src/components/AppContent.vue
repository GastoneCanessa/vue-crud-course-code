<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
import ListUsers from './ListUsers.vue'
import AddNewUser from './AddNewUser.vue'
import Banner from './Banner.vue'
import axios from 'axios'
import { useBannerStore } from '@/stores/banner'

const store = useBannerStore()

// ----
// Data
// ----
const message = ref('List of Users:')

// Each user object should contain the following fields:
//  * id: integer,
//  * name: string
//  * username: string
//  * email: string
const users = ref([])

// Largest index of the users array to use when adding a new user
const largestUserIndex = ref(0)

// -------
// Methods
// -------
const createNewUser = (user) => {
  // Check that all fields are filled in before adding the user
  if ((user.name !== '') && (user.username !== '') && (user.email !== '')) {
    var newUser = {
      // LIMITATION: The ID of the new user should really be returned
      //             from the server in the response to the POST call
      id: largestUserIndex.value + 1,
      name: user.name,
      username: user.username,
      email: user.email
    }

    // Add the new user to the database via a HTTP POST call
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then((response) => {
        // handle success
        store.setBannerData('SUCCESS! User data was saved!', 'Success')

        // Add the user to the local array of users
        users.value.push(newUser)

        // Increase the largest index used in the database
        largestUserIndex.value++
      })
      .catch((error) => {
        // handle error
        store.setBannerData('ERROR! Unable to save user data!', 'Error')
        console.log(error)
      })
      .finally((response) => {
       // always executed
        console.log('HTTP POST Finished!')
      })
  }
}

const deleteUser = (user) => {
  // Find the user
  var userIndex = users.value.indexOf(user)

  // Delete the user from the database via a HTTP DELETE call
  axios.delete('https://jsonplaceholder.typicode.com/users/' + user.id)
    .then((response) => {
      // handle success
      store.setBannerData('SUCCESS! User #' + user.id + ' was deleted!', 'Success')

      // Delete the user from the local array of users
      users.value.splice(userIndex, 1)
    })
    .catch((error) => {
      // handle error
      store.setBannerData('ERROR! Unable to delete user #' + user.id + '!', 'Error')
      console.log(error)
    })
    .finally((response) => {
      // always executed
      console.log('HTTP DELETE Finished!')
    })
}

const updateUser = (user) => {
  // Find the user
  const userIndex = users.value.findIndex((currentUser) => {
    if (currentUser.id === user.id) {
      return true
    }
  })

  // The argument passed in is a custom object with the following fields:
  //   - id: the ID number of the user (as stored in the database)
  //   - name: name of the user
  //   - username: username of the user
  //   - email: email of the user

  // Update the user in the database via a HTTP PUT call
  axios.put('https://jsonplaceholder.typicode.com/users/' + user.id)
    .then((response) => {
      // handle success
      store.setBannerData('SUCCESS! User #' + user.id + ' was updated!', 'Success')
      console.log(user)

      // Update the user in the local array of users
      users.value[userIndex].name = user.name
      users.value[userIndex].username = user.username
      users.value[userIndex].email = user.email
    })
    .catch((error) => {
      // handle error
      store.setBannerData('ERROR! Unable to update user #' + user.id + '!', 'Error')
      console.log(error)
    })
    .finally((response) => {
      // always executed
      console.log('HTTP PUT Finished!')
    })
}

// ---------------
// Lifecycle Hooks
// ---------------
onBeforeMount(() => {
  console.log('AppContent.vue: onBeforeMount() called!')
})
onMounted(async () => {
  console.log('AppContent.vue: onMounted() called!')

  // GET request for user data
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      // handle success
      store.setBannerData('SUCCESS! Loaded user data!', 'Success')
      console.log('Received response.data:')
      console.log(response.data)

      users.value = response.data

      // Save the length of the users array
      largestUserIndex.value = users.value.length

      console.log('Users array in success callback:')
      console.log(users.value)
    })
    .catch((error) => {
      // handle error
      store.setBannerData('ERROR! Unable to load user data!', 'Error')
    })
    .finally((response) => {
      // always executed
      console.log('Finished!')
    })
})
onBeforeUnmount(() => {
  console.log('AppContent.vue: onBeforeUnmount() called!')
})
onUnmounted(() => {
  console.log('AppContent.vue: onUnmounted() called!')
})
</script>

<template>
    <main>
        <Banner></Banner>
        <AddNewUser v-on:createUser="createNewUser"></AddNewUser>
        <h1>{{ message }}</h1>
        <ListUsers v-bind:users="users" v-on:deleteUser="deleteUser" v-on:updateUser="updateUser"></ListUsers>
    </main>
</template>

<style scoped>
main {
  margin: 0 auto;
  max-width: 1000px;
  padding: 1em;
}
main h1 {
  padding-top: 0.5em;
}
button, input[type="submit"] {
  background-color: #99D3Df;
  padding: 0.5em 2.5em;
  text-align: center;
  font-size: 1.2em;
  border-radius: 4px;
  border: 1px solid black;
}

button:hover, input[type="submit"]:hover {
  background-color: #88BBD6;
  cursor: pointer;
}
</style>
