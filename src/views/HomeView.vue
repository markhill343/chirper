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
  user = storeUser.user;
</script>

<template>
  <div class="home"></div>
  <my-Container />
</template>
