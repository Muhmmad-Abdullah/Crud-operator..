<template>
  <div>
    <h1>Api fetch Data</h1>
    <table border="1px"  >   
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Avatar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.email }}</td>
          <td><img :src="item.avatar" alt="Avatar" width="50" height="50"></td>
        </tr>
      </tbody>
    </table>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "App",
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getAllUsers(); // Fetch all users on component mount
  },

   methods: {

  //   async getAllUsers() {
  //     try {
  //       const response = await axios.get("https://reqres.in/api/users?page=1");
  //       this.list = response.data.data; // The user list is nested under 'data'
  //     } catch (error) {
  //       console.error('Error fetching all users:', error);
  //     }
  //   },
    async getUserById(userId) {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${userId}`);
        const user = response.data.data; // The user object is nested under 'data'
        console.log('User by ID:', user);
      } catch (error) {
        console.error('Error fetching user by ID:', error);
      }
    },
},
};
</script> 

<!-- <template>
  <div>
    <h1>Fetch Data using Vue</h1>
    <table border="1px" v-if="users.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Education</th>
          <th>Email</th>
          <th>Address</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.education }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.number }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      loading: true,
      error: null,
    };
  },
  async mounted() {
  try {
    const response = await axios.get("http://localhost:900/api"); // Use the correct URL
    this.users = response.data;
    this.loading = false;
  } catch (error) {
    this.loading = false;
    this.error = "Error fetching users data.";
    this.users = [];
    console.error("Error details:", error);
  }
},
};
</script>-->



















