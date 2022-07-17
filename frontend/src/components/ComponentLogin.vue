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
      if (result.status === 200) {
      const data = JSON.parse(await result.text());
      console.log("Success", data.Username);
      store.state.currentUser = data;
      store.state.userId = data.Username;
      router.push("/user");
      } else if (result.status === 404) {
        alert("Invalid username or password");
      }else if (result.status === 500) {
          alert('Server Error');
      }
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
