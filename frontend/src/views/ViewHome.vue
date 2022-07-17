<script setup lang="ts">
import store from "../store/index";
</script>

<template>
  <h1>Chirper</h1>
  <p>Here you can chirp all you want</p>
  <h3>Our USP is that Elon Musk is not on chirper and there are no bots here</h3>
  <p>
    <router-link to="/:username">
      <span>Your ARE LOGGED IN AS USER: {{ store.state.currentUser }}</span>
    </router-link>
  </p>
</template>

<style lang="scss">

</style>
