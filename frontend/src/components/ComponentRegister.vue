<script setup lang="ts">
import { ref, type Ref } from "vue";
import Router from "../router";
import store from "../store";

const router = Router(),
  register = async () => {
    console.log("register");
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (result) => { 
      if (result.status === 200) {
      const data = JSON.parse(await result.text());
      console.log("hello 123"+ data);
      console.log("Success", data.username);
      store.state.currentUser = data;
      store.state.userId = data.Username;
      localStorage.setItem('userId', data.Username);
      console.log("incoming data from regsiter"+ data)
      //router.push("/user");
      } else if (result.status === 500) {
          alert('Username already exists');
      }
    });
  };

const Name = ref(""),
  Username = ref(""),
  Email = ref(""),
  Password = ref(""),
  data = { Name: Name, Username: Username, Email: Email, Password: Password };

</script>

<template>
  <form>
    <ul>
      <li><input v-model="Name" placeholder="Name" /></li>
      <li><input v-model="Username" placeholder="Username" /></li>
      <li><input v-model="Email" placeholder="Email" /></li>
      <li>
        <input v-model="Password" placeholder="Password" />
      </li>
      <button type="submit" id="register" @click="register">Register</button>
    </ul>
  </form>
</template>

<style scoped>
ul {
  list-style-type: none;
}

ul li {
  margin: 40px;
}
</style>
