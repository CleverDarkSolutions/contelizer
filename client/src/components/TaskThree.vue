<template>
  <div id="app">
    <h1>Lista użytkowników</h1>
    <input v-model="searchQuery" placeholder="Szukaj użytkownika..." @input="filterUsers" />

    <ul>
      <li v-for="user in filteredUsers" :key="user.id">
        {{ user.name }} - {{ user.email }}
        <button @click="editUser(user)">Edytuj</button>
      </li>
    </ul>

    <div v-if="selectedUser">
      <h2>Edytuj użytkownika</h2>
      <form @submit.prevent="submitEdit">
        <label>Imię:</label>
        <input v-model="selectedUser.name" />
        <label>Email:</label>
        <input v-model="selectedUser.email" />
        <label>Płeć:</label>
        <select v-model="selectedUser.gender">
          <option value="male">Mężczyzna</option>
          <option value="female">Kobieta</option>
        </select>
        <label>Status:</label>
        <select v-model="selectedUser.status">
          <option value="active">Aktywny</option>
          <option value="inactive">Nieaktywny</option>
        </select>
        <button type="submit">Zapisz zmiany</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {getUsers, updateUser, type User} from "@/utils/UserService";


const users = ref<User[]>([]);
const filteredUsers = ref<User[]>([]);
const selectedUser = ref<User | null>(null);
const searchQuery = ref<string>('');


onMounted(async () => {
  try {
    const data = await getUsers();
    users.value = data;
    filteredUsers.value = data;
  } catch (error) {
    console.error('Błąd podczas pobierania użytkowników:', error);
  }
});


const filterUsers = () => {
  if (searchQuery.value === '') {
    filteredUsers.value = users.value;
  } else {
    filteredUsers.value = users.value.filter(user =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
};

const editUser = (user: User) => {
  selectedUser.value = { ...user };
};

const submitEdit = async () => {
  if (selectedUser.value) {
    try {
      const updatedUser = await updateUser(selectedUser.value.id, selectedUser.value);
      users.value = users.value.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );
      filterUsers();
      alert('Dane użytkownika zostały zaktualizowane.');
    } catch (error) {
      console.error('Błąd podczas aktualizacji użytkownika:', error);
      alert('Nie udało się zaktualizować użytkownika.');
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
input {
  margin-bottom: 10px;
  padding: 5px;
}
button {
  margin-left: 10px;
}
form {
  margin-top: 20px;
}
label {
  display: block;
  margin-top: 10px;
}
</style>
