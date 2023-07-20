<script setup>
import { ref } from '@vue/reactivity'
const emit = defineEmits(['createUser'])

// Data
const user = ref({
    name: '',
    username: '',
    email: ''
})

//Methods
const addNewUser = () => {
    if ((user.value.name !== '') && (user.value.username !== '') && (user.value.email !== '')) {
        emit('createUser',{
                name: user.value.name,
                username: user.value.username,
                email: user.value.email
        })
    }
     // Clear the variables used for reading in the new user's info
    user.value.name = ''
    user.value.username = ''
    user.value.email = ''
}
    

</script>

<template>
     <form>
        <h1>Add a New User:</h1>
        <div class="field">
            <label for="newName">Name:</label>
            <input type="text" id="newName" v-model="user.name" placeholder="Enter your name..." />
        </div>
        <div class="field">
            <label for="newUsername">Username:</label>
            <input type="text" id="newUsername" v-model="user.username" placeholder="Enter your username..." />
        </div>
        <div class="field">
            <label for="newEmail">Email:</label>
            <input type="email" id="newEmail" v-model="user.email" placeholder="Enter your email..." />
        </div>
        <div class="field">
            <button v-on:click.prevent="addNewUser">Add User</button>
        </div>
    </form>
</template>

<style scoped>
    form {
    padding: 0.5px 0;
    }

    .field {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    }

    label {
    margin: auto 0;
    font-weight: 600;
    }

    input {
    width: 80%;
    padding: 0.5em;
    border: 1px solid #999;
    border-radius: 2px;
    }

    .field + .field {
    margin-top: 0.2rem;
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