<script setup lang="ts">
import storeUser from "../store";
</script>

<template>
  <h1>Chirper</h1>
  <p>Here you can chirp all you want</p>
  <h3>Our USP is that Elon Musk is not on chirper</h3>
  <p>
    <router-link to="/:username">
      <span>Your ARE LOGGED IN AS USER: {{ storeUser.state.currentUser }}</span>
    </router-link>
  </p>
</template>

<style lang="scss">
@import "../css/View/View.scss";
</style>
