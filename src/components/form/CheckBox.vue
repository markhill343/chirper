<script setup lang="ts">
import { v4 as uuid } from "uuid";

const props = defineProps({
    label: { type: String, default: "" },
    autofocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    checked: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
  }),
  id = uuid(),
  emit = defineEmits(["update:checked"]),
  change = () => emit("update:checked", props.checked);
</script>

<template>
  <div>
    <input
      :id="id"
      type="checkbox"
      :autofocus="autofocus"
      :disabled="disabled"
      v-model="checked"
      @change="change"
      :class="error ? 'displayError' : ''"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<style scoped lang="scss">
@import "../../css/component/Checkbox.scss";
</style>
