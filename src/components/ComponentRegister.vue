<script setup lang="ts">
import { ref, type Ref } from "vue";
import Router from "../router";
import store from "../store";

const router = Router(),
  register = async (data: {
    Name: Ref<string>;
    Username: Ref<string>;
    Email: Ref<string>;
    Password: Ref<string>;
  }) => {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

const Name = ref(""),
  Username = ref(""),
  Email = ref(""),
  Password = ref(""),
  data = { Name, Username, Email, Password };

const doRegister = () => {
  console.log("works");
  console.log(Name.value);
  console.log(Username.value);
  console.log(Email.value);
  console.log(Password.value);
  register(data);
  router.push("/");
};
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
      <button type="submit" id="register" @click="doRegister">Register</button>
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
