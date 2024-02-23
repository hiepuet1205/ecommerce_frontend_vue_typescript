<template>
  <swiper class="mySwiper">
    <swiper-slide v-for="image in props.images">
      <img :src="image.src" :alt="image.alt" class="w-full h-96">
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import { SliderImage } from '../../types/SliderImage';

const props = defineProps({
  images: Array<SliderImage>
})
</script>

<style scoped>

</style>