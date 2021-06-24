<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloText color="red" />
</template>

<script>
import HelloText from './components/HelloText.vue'

export default {
  name: 'App',
  components: {
    HelloText
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
