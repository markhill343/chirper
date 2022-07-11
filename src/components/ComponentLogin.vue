<script setup lang="ts">
import { ref, type Ref } from "vue";
import Router from "../router";
import store from "../store";

import axios from "axios";
// import router from "@/router";

const http = axios.create();

const router = Router(),
  login = async (data: { Username: string; Password: string }) => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      console.log("Success", Username.value);
      store.state.currentUser = Username.value;
      localStorage.setItem("currentUser", Username.value);
      store.state.userId = Username.value;
    } else {
      alert("Invalid username or password");
    }

    /*
        console.log("Success logged in User =", response.username);
        store.state.currentUser = data.foundUser;
        localStorage.setItem("userId", data.foundUser.username);
        store.state.userId = data.foundUser.username;
        router.push({ path: "/" });
        store.state.loginUsernameModel = "";
        store.state.loginPasswordModel = "";

      .then((response) => {
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(Response.arguments);
    */
  };

const Username = ref(""),
  Password = ref(""),
  data = { Username, Password };

const doLogin = async () => {
  console.log(Username.value);
  console.log(Password.value);
  login(data);
};
</script>

<template>
  <form>
    <ul>
      <li><input v-model="Username" placeholder="Username" /></li>
      <li>
        <input v-model="Password" placeholder="Password" />
      </li>
      <button type="submit" id="login" @click="doLogin">Login</button>
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
