<template>
  <span>
    <i @click="click()" class="PressButton"></i>
  </span>
</template>

<script setup lang="ts">
defineProps({
  type: { type: String, default: "button" },
  label: { type: String, default: "Button" },
});

const emit = defineEmits(["clickEvent"]),
  click = () => emit("clickEvent");
</script>

<style scoped>
.PressButton {
  color: var(--defaultColor);
  padding: 15px;
  border-radius: 30px;
  transition: 200ms all;
  cursor: pointer;
  font-size: 18px;
}

.PressButton:hover {
  background: var(--hoverBg);
  color: var(--hoverColor);
}
</style>
