<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import { RouterView } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'

const headerTitle = ref("Vue Project (Dynamic)")

// ---------------
// Lifecycle Hooks
// ---------------
onBeforeMount(() => {
  console.log('App.vue: onBeforeMount() called!')
})
onMounted(() => {
  console.log('App.vue: onMounted() called!')
})
onBeforeUnmount(() => {
  console.log('App.vue: onBeforeUnmount() called!')
})
onUnmounted(() => {
  console.log('App.vue: onUnmounted() called!')
})
</script>

<template>
  <AppHeader v-bind:title="headerTitle"></AppHeader>
  <RouterView />
  <AppFooter>
    <template v-slot:message>Vue Project from TestDriven.io Course</template>
    <template v-slot:link><a href="https://testdriven.io">TestDriven.io</a></template>
  </AppFooter>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
