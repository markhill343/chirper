<template>
  <span>
    <i @click="handleAction()" class="PressButton"></i>
  </span>
</template>

<script lang="ts">
export default {
  props: ["action"],
  methods: {
    handleAction() {
      try {
        this[this.action]("Button pressed");
      } catch (e) {
        console.log(
          `Error in ActionButton components 'handleAction' method:\n ${e}`
        );
      }
    },
  },
};
</script>
