<script setup lang="ts">
import { ref, type Ref } from "vue";
import Router from "../router";

const router = Router(),
  login = async (data: { Username: Ref<string>; Password: Ref<string> }) => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

const Username = ref(""),
  Password = ref(""),
  data = { Username, Password };

const doLogin = () => {
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
