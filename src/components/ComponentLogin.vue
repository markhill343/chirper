<script setup lang="ts">
import { ref, type Ref } from "vue";
import Router from "../router";
import store from "../store";

const router = Router(),
  login = async () => {
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
      router.push("/");
    });
  };

const Username = ref(""),
  Password = ref(""),
  data = { Username: Username, Password: Password };

</script>

<template>
  <form>
    <ul>
      <li><input v-model="Username" placeholder="Username" /></li>
      <li>
        <input v-model="Password" placeholder="Password" />
      </li>
      <button type="submit" id="login" @click="login">Login</button>
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
