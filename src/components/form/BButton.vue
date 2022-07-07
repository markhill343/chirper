<script setup lang="ts">
defineProps({
  type: { type: String, default: "button" },
  label: { type: String, default: "Button" },
});

const emit = defineEmits(["click"]),
  click = () => emit("click");
</script>

<template>
  <input :value="label" :type="type" @click="click" />
</template>

<style scoped lang="scss"></style>
