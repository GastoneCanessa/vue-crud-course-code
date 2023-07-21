<script setup>
    import { ref } from 'vue'

    const props = defineProps({
    user: {type: Object, required: true}
    })

    const emit = defineEmits(['cancelEdit', 'updateUser'])

    // ----
    // Data
    // ----

    // Data for editing a user
    const inputId = ref(props.user.id)
    const inputName = ref(props.user.name)
    const inputUsername = ref(props.user.username)
    const inputEmail = ref(props.user.email)

    // -------
    // Methods
    // -------
    const cancel = () => {
    emit('cancelEdit')
    }
    const submit = () => {
    // When emitting the custom event, include an object with the following fields:
    //   - id: the ID number of the user (as stored in the database)
    //   - name: name of the user
    //   - username: username of the user
    //   - email: email of the user
    emit('updateUser', {
        id: inputId.value,
        name: inputName.value,
        username: inputUsername.value,
        email: inputEmail.value
    })
    }
</script>

<template>
    <div class="modal-backdrop" v-on:click="cancel">
        <div class="modal" v-on:click.stop="">
            <h1>Edit User:</h1>
            <div class="field">
                <label for="newName">Name:</label>
                <input type="text" id="newName" v-model="inputName" />
            </div>
            <div class="field">
                <label for="newUsername">Username:</label>
                <input type="text" id="newUsername" v-model="inputUsername" />
            </div>
            <div class="field">
                <label for="newEmail">Email:</label>
                <input type="email" id="newEmail" v-model="inputEmail" />
            </div>
            <div class="field">
                <button class="submitButton" v-on:click="submit">Update</button>
                <button class="cancelButton" v-on:click="cancel">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  padding: 1em;
}

h1 {
  padding-bottom: 0.5em;
}
.field {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

label {
  margin: auto 0;
  font-weight: 600;
  padding-right: 4px;
}

input {
  padding: 0.5em;
  border: 1px solid #999;
  border-radius: 2px;
  min-width: 30ch;
}

.field + .field {
  margin-top: 0.3rem;
}

button {
  background-color: #99D3Df;
  padding: 0.5em 2.0em;
  text-align: center;
  font-size: 1.2em;
  border-radius: 4px;
  border: 1px solid black;
}

button:hover {
  background-color: #88BBD6;
  cursor: pointer;
}

.cancelButton {
  background-color: #CDCDCD;
}

.field:last-child {
  padding-top: 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>