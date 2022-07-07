<script setup lang="ts">
import StoreUser from "./store/StoreUser";
import Router from "./router";
const router = Router(),
  storeUser = StoreUser(),
  isActive = (path: string) => router.currentRoute.value.path.startsWith(path);
</script>

<template>
  <nav>
    <ul style="float: right">
      <li :class="storeUser">
        <router-link to="/profile">Profil</router-link>
      </li>
    </ul>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li :class="storeUser">
        <router-link
          to="/hello"
          :class="{ 'router-link-active': isActive('/hello') }"
          >Hallo</router-link
        >
      </li>
      <li :class="storeUser">
        <router-link
          to="/login"
          :class="{ 'router-link-active': isActive('/login') }"
          >Login</router-link
        >
      </li>
      <li :class="storeUser">
        <router-link
          to="/register"
          :class="{ 'router-link-active': isActive('/register') }"
          >Registrieren</router-link
        >
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import "css/App.scss";
</style>
