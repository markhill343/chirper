<script setup lang="ts">
import { computed } from "vue";

import AccountFields from "../components/form/AccountFields.vue";
import Button from "../components/form/BButton.vue";
import MyContainer from "../components/MyContainer.vue";

import Router from "../router";
import StoreSession from "../store/StoreSession";
import StoreUser from "../store/StoreUser";
import StoreConfig from "../store/StoreConfig";
import defaultAccount from "../model/defaultAccount";

const router = Router(),
  storeSession = StoreSession(),
  session = storeSession.session,
  storeUser = StoreUser(),
  user = storeUser,
  errorMessage = computed(() => session.errorMessage?.message);

const storeConfig = StoreConfig(),
  config = storeConfig.config,
  paths = config.paths,
  reset = () => {
    storeSession.reset();
    Object.assign(defaultAccount());
  };

const register3 = async () => {
  const response = await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(document.getElementById("Name") as HTMLInputElement),
  });
};

const doRegister = async () => {
  console.log("hi");
  const namee = document.getElementById("namee") as HTMLInputElement,
    username = document.getElementById("Username") as HTMLInputElement,
    mail = document.getElementById("Email") as HTMLInputElement,
    password = document.getElementById("Password") as HTMLInputElement,
    data = { namee, username, mail, password };
  console.log(namee);
  register3();
};
</script>

<template>
  <div class="home"></div>
  <my-Container />
</template>

<style lang="scss">
@import "../css/View/View.scss";
</style>
