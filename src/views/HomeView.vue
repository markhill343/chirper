<script setup lang="ts">
import { computed } from "vue";

import AccountFields from "../components/AccountFields.vue";
import Button from "../components/BButton.vue";

import Router from "../router";
import StoreSession from "../store/StoreSession";
import StoreUser from "../store/StoreUser";

import TheWelcome from "../components/TheWelcome.vue";

const router = Router(),
  storeSession = StoreSession(),
  session = storeSession.session,
  storeUser = StoreUser(),
  user = storeUser.user;

export default { name: "HomeView", components: { MyContainer } };
</script>

<template>
  <div class="home"></div>
  <my-Container />
</template>
