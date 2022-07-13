<script setup lang="ts">
import { ref, type Ref } from "vue";
import Router from "../router";
import store from "../store";

const router = Router(),
  login = async (data: { Username: string; Password: string }) => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (result) => {
      const data = JSON.parse(await result.text());
      console.log("Success", data.Username);
      store.state.currentUser = data;
      store.state.userId = data.Username;
    });
  };

const Username = ref(""),
  Password = ref(""),
  data = { Username, Password };

const doLogin = async () => {
  console.log(Username.value);
  console.log(Password.value);
  login(data);
  router.push("/");
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
