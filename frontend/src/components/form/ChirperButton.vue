<script setup lang="ts">
defineProps({
  type: { type: String, default: "button" },
  label: { type: String, default: "Button" },
  text: { type: String, default: "Button" },
});

const emit = defineEmits(["clickEvent"]),
  click = () => emit("clickEvent");
</script>

<style scoped></style>

<template>
  <div class="chirper-button-root">
    <button @click="click">ChirperButton</button>
  </div>
</template>
