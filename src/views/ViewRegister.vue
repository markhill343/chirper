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
</script>

<template>
  <div class="home"></div>
  <my-Container />
</template>

<style lang="scss">
@import "../css/View/View.scss";
</style>
