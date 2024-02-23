<template>
  <div class="flex py-3 border-b-2">
    <router-link v-for="type in props.types" to="/" class="mr-3 text-xl">{{ type }}</router-link>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  types: Array<string>
})
</script>

<style scoped>

</style>