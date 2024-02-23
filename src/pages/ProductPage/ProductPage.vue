<template>
  <BasePage>
    <template v-slot:content>
      <h1>Trang Chủ</h1>
      <ProductDetailComponent :product="product"></ProductDetailComponent>
    </template>
  </BasePage>
</template>

<script setup lang="ts">
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent.vue';
import { Product } from '../../types/Product';
import BasePage from '../BasePage/BasePage.vue';
import Test from '../../assets/images/test.webp';
import Logo from '../../assets/images/logo.png';
import imageSmall from '../../assets/images/imagesmall.webp';

const product: Product = {
  title: 'Đồng hồ nữ dây kim loại KOI K001.150.641.50.03.01 chính hãng',
  productImage: Test,
  productSmallImages: [imageSmall, imageSmall, imageSmall, imageSmall, imageSmall, imageSmall, imageSmall],
  logoImage: Logo,
  brand: 'Iphone',
  price: 10000000,
  quantitySold: 1000, 
  rating: 4.96,
}
</script>

<style scoped>

</style>