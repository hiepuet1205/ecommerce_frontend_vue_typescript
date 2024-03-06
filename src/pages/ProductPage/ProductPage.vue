<template>
  <BasePage>
    <template v-slot:content>
      <h1>Trang Chủ</h1>
      <ProductDetailComponent></ProductDetailComponent>
    </template>
  </BasePage>
</template>

<script setup lang="ts">
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent.vue';
import BasePage from '../BasePage/BasePage.vue';
</script>

<style scoped></style>