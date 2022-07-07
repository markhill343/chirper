<template>
  <h3>Sign up or Sign in</h3>
  <div v-if="newUser">
    <register />
  </div>
  <div v-else>
    <login />
  </div>
  <input type="checkbox" id="newUser" v-on:click="showLogin" /> Already have an
  account?
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
