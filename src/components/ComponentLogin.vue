<template>
  <form>
    <ul>
      <li><input type="username" id="Username" placeholder="Username" /></li>
      <li><input type="password" id="Password" placeholder="Password" /></li>
    </ul>

    <button>Login</button>
  </form>
</template>

<script setup lang="ts"></script>

<style scoped>
ul {
  list-style-type: none;
}

ul li {
  margin: 40px;
}
</style>
