<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { v4 as uuid } from "uuid";
import ControllerKey from "../../controller/ControllerKey";

const props = defineProps({
    label: { type: String, default: "" },
    text: { type: String, default: "" },
    error: { type: Boolean, default: false },
    autofocus: { type: Boolean, default: false },
  }),
  id = uuid(),
  emit = defineEmits(["update:text", "enter"]),
  text = computed({
    get() {
      return props.text;
    },
    set(p_value) {
      return emit("update:text", p_value);
    },
  }),
  enter = () => emit("enter"),
  controllerKey = new ControllerKey("Enter", enter, id);

onMounted(() => controllerKey.add());
onUnmounted(() => controllerKey.remove());
</script>

<template>
  <div>
    <input
      :id="id"
      type="text"
      :autofocus="autofocus"
      v-model="text"
      placeholder=" "
      :class="error ? 'displayError' : ''"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<style scoped lang="scss">
@import "../../css/component/Textfield.scss";
</style>
