<script setup lang="ts">
defineProps({
  type: { type: String, default: "button" },
  label: { type: String, default: "Button" },
  text: { type: String, default: "Button" },
});


const emit = defineEmits(["clickEvent"]);


 const clickEvent = () => {
    try {
    emit('clickEvent');
    } catch (error) {
      console.log(error);
    }
  }
</script>

<style scoped>
button{
  outline: none;
  font-weight: bolder;
  font-size: 17px;
  transition: 300ms all;
  cursor: pointer;
  background: white;
  color: #1da1f2;
  border: 1px solid #1da1f2;
}

button:hover{
  background-color: red;
}

</style>

<template>
  <div class="chirper-button-root">
    <button :value="label" class="Button" v-html="text" @click="clickEvent"></button>
  </div>
</template>
