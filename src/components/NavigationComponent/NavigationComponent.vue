<template>
  <div class="flex flex-col border-r-2 border-slate-300 h-screen">
    <template v-for="navigation in props.navigations">
      <router-link :to="navigation.path"
        class="pl-5 py-4 text-xl hover:bg-sky-100 hover:text-sky-500 hover:border-r-4 hover:border-sky-500">
        <font-awesome-icon :icon="navigation.icon" class="pr-2" />
        {{ navigation.text }}
      </router-link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Navigation } from "../../types/Navigation"

const props = defineProps({
  navigations: { type: Array<Navigation>, required: true }
})
</script>

<style scoped></style>