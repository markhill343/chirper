<script>
import Register from "./ComponentRegister.vue";
import Login from "./ComponentLogin.vue";
export default {
  name: "MyContainer",
  components: {
    Register,
    Login,
  },
};
</script>

<template>
  <form>
    <h3>Sign up or Sign in</h3>
    <register />
    <login />
  </form>
</template>

<style scoped></style>
