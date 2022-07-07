<script setup lang="ts">
import Router from "../router";
import StoreSession from "../store/StoreSession";
import StoreUser from "../store/StoreUser";

const router = Router(),
  storeSession = StoreSession(),
  session = storeSession.session,
  storeUser = StoreUser(),
  user = storeUser.user,
  doRegister = async () => {
    const doit = async () => {
      const success = await storeUser.register();
      if (success) {
        router.push("/");
      }
    };
    await doit();
  };
</script>

<template>
  <form>
    <ul>
      <li><input type="text" id="Name" placeholder="Name" /></li>
      <li><input type="username" id="Username" placeholder="Username" /></li>
      <li><input type="email" id="Email" placeholder="Email" /></li>
      <li><input type="password" id="Password" placeholder="Password" /></li>
    </ul>

    <Button label="register" @click="doRegister">Sign Up</Button>
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
