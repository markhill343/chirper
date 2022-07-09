<script setup lang="ts">
const register = async (data: {
  name: HTMLInputElement;
  username: HTMLInputElement;
  mail: HTMLInputElement;
  password: HTMLInputElement;
}) => {
  const response = await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const register2 = () => {
  console.log("works");
  console.log(document.getElementById("namee") as HTMLInputElement);
  const name = document.getElementById("namee") as HTMLInputElement,
    username = document.getElementById("Username") as HTMLInputElement,
    mail = document.getElementById("Email") as HTMLInputElement,
    password = document.getElementById("Password") as HTMLInputElement,
    data = { name, username, mail, password };
  register(data);
};
</script>

<template>
  <form>
    <ul>
      <li><input type="text" id="Name" placeholder="Name" /></li>
      <li><input type="username" id="Username" placeholder="Username" /></li>
      <li><input type="email" id="Email" placeholder="Email" /></li>
      <li><input type="password" id="Password" placeholder="Password" /></li>
      <button type="submit" id="register" @click="register2">Register</button>
    </ul>
  </form>
</template>

<style scoped>
ul {
  list-style-type: none;
}

ul li {
  margin: 40px;
}
</style>
