<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="p-10">
    <h1 class="text-4xl font-bold text-blue-500">Hola Diego 🚀</h1>
    <button class="mt-5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
      Botón Tailwind
    </button>
  </div>
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
