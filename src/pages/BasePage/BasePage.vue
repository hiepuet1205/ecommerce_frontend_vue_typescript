<template>
  <div>
    <HeaderComponent></HeaderComponent>
    <main>
      <div class="container mx-auto">
        <slot name="content"></slot>
      </div>
    </main>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script lang="ts" setup>
import FooterComponent from '../../components/FooterComponent/FooterComponent.vue';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent.vue';
</script>

<style scoped>

</style>