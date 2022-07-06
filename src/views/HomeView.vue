<script>
import TheWelcome from "@/components/TheWelcome.vue";
import MyContainer from "../components/MyContainer.vue";
</script>

<template>
  <div class="home">
    <MyContainer />
  </div>
</template>

export default { name: 'Home', components: { MyContainer, } }
