<script setup lang="ts">
/*
 * @Author: Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @Author: Markus Hillreiner <markus.hillreiner@hs-augsburg.de>
 * @copyirght: 2016-2022 Wolfgang Kowarschick
 * @license: MIT
 */

import { computed } from "vue";

import AccountFields from "../components/form/AccountFields.vue";
import Button from "../components/form/BButton.vue";

import Router from "../router";
import StoreSession from "../store/StoreSession";
import StoreUser from "../store/StoreUser";
import axios from "axios";
import express from "express";

const app = express();

app.post("/", (req, res) => {
  res.send("Hello World!");
});

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
</script>

<template>
  <h1>Registrieren</h1>
  <form>
    <AccountFields :account="user" @enter="doRegister" />
    <div>
      <Button label="Registrieren" @click="doRegister" />
    </div>
    <div>{{ errorMessage }}</div>
  </form>
</template>

<style lang="scss">
@import "../css/View/View.scss";
</style>
