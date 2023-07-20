<script setup>
import { ref } from '@vue/reactivity'

const footerMessage = ref('TestDriven.io')
</script>

<template>
  <footer>
    <p><slot name="message">Default Footer</slot></p>
    <p><slot name="link"></slot></p>
  </footer>
</template>

<style scoped>
footer {
  text-align: center;
  border-top: 1px solid #88BBD6;
  padding: 10px;
}
</style>