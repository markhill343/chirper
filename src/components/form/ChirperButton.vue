<template>
  <div class="chirper-button-root">
    <button
      @click="chirperHandler()"
      :class="[isBlueBg ? 'blueBg' : 'whiteBg']"
      :style="{ height: h, width: w, borderRadius: br }"
      v-html="text"
    ></button>
  </div>
</template>

<script lang="ts">
export default {
  props: ["clickEvent"],
  methods: {
    chirperHandler() {
      try {
        this[this.clickEvent]();
      } catch (e) {
        console.log(
          `Error in ChirperButton components Chirper handler method:\n ${e}`
        );
      }
    },
  },
};
</script>
