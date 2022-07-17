<template>
  <h3>Sign up or Sign in</h3>
  <div v-if="newUser">
    <login />
  </div>
  <div v-else>
    <register />
  </div>
  <input type="checkbox" id="newUser" v-on:click="showLogin" /> Register?
</template>

<script>
import Register from "./ComponentRegister.vue";
import Login from "./ComponentLogin.vue";
export default {
  name: "MyContainer",
  components: {
    Register,
    Login,
  },
  data() {
    return {
      newUser: true,
    };
  },
  methods: {
    showLogin() {
      this.newUser = !this.newUser;
    },
  },
};
</script>

<style scoped></style>
