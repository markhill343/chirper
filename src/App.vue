<script setup lang="ts">
import store from "./store/index";
import Router from "./router";
const router = Router(),
  storeUser = store,
  isActive = (path: string) => router.currentRoute.value.path.startsWith(path),
  username = storeUser.state.currentUser.username;
console.log(username);
</script>

<template>
  <nav>
    <ul style="float: right">
      <li :class="storeUser">
        <router-link
          :to="'/' + username"
          :class="{ 'router-link-active': isActive('/:username') }"
          >My Profile</router-link
        >
      </li>
    </ul>
    <ul>
      <li :class="storeUser">
        <router-link to="/" :class="{ 'router-link-active': isActive('/') }"
          >Home</router-link
        >
      </li>
      <li :class="storeUser">
        <router-link
          to="/register"
          :class="{ 'router-link-active': isActive('/register') }"
          >Login</router-link
        >
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import "css/App.scss";
</style>
