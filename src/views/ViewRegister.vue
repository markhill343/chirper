<script setup lang="ts">
import { computed } from "vue";

import AccountFields from "../components/form/AccountFields.vue";
import Button from "../components/form/BButton.vue";

import Router from "../router";
import StoreSession from "../store/StoreSession";
import StoreUser from "../store/StoreUser";

const router = Router(),
  storeSession = StoreSession(),
  session = storeSession.session,
  storeUser = StoreUser(),
  user = storeUser.user,
  errorMessage = computed(() => session.errorMessage?.message),
  doRegister = async () => {
    const doit = async () => {
      const success = await storeUser.register();
      if (success) {
        router.push("/");
      }
    };
    await doit();
  };

const register = async () => {
  const response = await fetch("http://localhost:8080/register", {
    method: "POST",
    body: JSON.stringify(user),
  });
};
</script>

<template>
  <h1>Registrieren</h1>
  <form>
    <AccountFields :account="user" @enter="register" />
    <div>
      <Button label="Registrieren" @click="register" />
    </div>
    <div>{{ errorMessage }}</div>
  </form>
</template>

<style lang="scss">
@import "../css/View/View.scss";
</style>
