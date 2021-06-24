<template>
  <div :style="{color: color === 'red' ? 'red' : 'blue'}">Text from vue app</div>
</template>

<script>
export default {
  name: "VueText",
  props: {
    color: {
      type: String,
    },
  }
};
</script>

<style></style>
