<script setup lang="ts">
import { computed } from "vue";


import Button from "../components/form/BButton.vue";
import MyContainer from "../components/MyContainer.vue";
import Router from "../router";
import store from "../store/index";


const router = Router();
</script>

<template>
  <div class="home"></div>
  <my-Container />
</template>
