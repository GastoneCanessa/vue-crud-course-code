<script setup>
import { onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, ref } from 'vue'
import EditUserModal from './EditUserModal.vue'

const props = defineProps({
  users: {type: Array, required: true}
})

const emit = defineEmits(['deleteUser', 'updateUser'])

// ----
// Data
// ----

// Flag indicating if the modal should be displayed
const showEditModal = ref(false)

// Data for editing a user
const userEditing = ref({})

// -------
// Methods
// -------
const deleteUser = (user) => {
  emit('deleteUser', user)
}

const editUser = (user) => {
  // Set the initial data to display in the modal
  userEditing.value = user

  // Display the modal
  showEditModal.value = true
}

const cancelEdit = () => {
  showEditModal.value = false
}

const updateUser = (updatedUser) => {
  showEditModal.value = false

  // Emit a custom event to the parent component to update a user
  emit('updateUser', {
    id: updatedUser.id,
    name: updatedUser.name,
    username: updatedUser.username,
    email: updatedUser.email
  })
}

// ---------------
// Lifecycle Hooks
// ---------------
onBeforeMount(() => {
  console.log('ListUsers.vue: onBeforeMount() called!')
})
onMounted(() => {
  console.log('ListUsers.vue: onMounted() called!')
})
onBeforeUnmount(() => {
  console.log('ListUsers.vue: onBeforeUnmount() called!')
})
onUnmounted(() => {
  console.log('ListUsers.vue: onUnmounted() called!')
})
</script>

<template>
    <table>
        <!-- Table Header Row -->
        <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        <!-- Table Elements (Rows) -->
        <tr v-for="(user, index) in users" v-bind:key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
                <button id="deleteButton" v-on:click="deleteUser(user)">Delete</button>
                <button id="editButton" v-on:click="editUser(user)">Edit</button>
            </td>        
        </tr>
    </table>

    <EditUserModal v-if="showEditModal" v-bind:user="userEditing" v-on:cancelEdit="cancelEdit" v-on:updateUser="updateUser"></EditUserModal>
</template>

<style scoped>
table {
  margin-top: 0.5em;
  width: 100%;
}

td, th {
  border: 1px solid #88BBD6;
  padding: 0.3rem 0.8rem;
  overflow: hidden;
}

th {
  text-align: center;
  background-color: #88BBD6;
  color: black;
}

tr:nth-child(even) {
  background-color: #CDCDCDB0;
}

tr:nth-child(odd) {
  background-color: #CDCDCD40;
}

button {
  background-color: #99D3Df;
  padding: 4px;
  border-radius: 4px;
  font-size: 0.8em;
  text-align: center;
  border: 1px solid black;
}

button:hover {
  background-color: #88BBD6;
  cursor: pointer;
}

button + button {
  margin-left: 0.4em;
}
</style>
