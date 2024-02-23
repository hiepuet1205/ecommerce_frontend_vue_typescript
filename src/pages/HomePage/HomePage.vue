<template>
  <BasePage>
    <template v-slot:content>
      <div>
        <TypeComponent :types="types"></TypeComponent>
        <SliderComponent :images="sliderImages"></SliderComponent>
        <div class="grid grid-cols-6 mt-10">
          <div class="col-span-1">
            <CategoryComponent @handleChangeType="handleChangeType"></CategoryComponent>
          </div>
          <div class="col-span-5">
            <ProductListComponent :type="type"></ProductListComponent>
          </div>
        </div>
      </div>
    </template>
  </BasePage>
</template>

<script setup lang="ts">
import TypeComponent from '../../components/TypeComponent/TypeComponent.vue';
import SliderComponent from '../../components/SliderComponent/SliderComponent.vue';
import BasePage from '../BasePage/BasePage.vue';
import { SliderImage } from '../../types/SliderImage';
import Slider1 from '../../assets/images/slider1.webp'
import Slider2 from '../../assets/images/slider2.webp'
import Slider3 from '../../assets/images/slider3.webp'
import ProductListComponent from '../../components/ProductListComponent/ProductListComponent.vue';
import CategoryComponent from '../../components/CategoryComponent/CategoryComponent.vue';
import { ref } from 'vue';

const types: string[] = ['TV', 'Tủ Lạnh', 'Máy Giặt'];
const sliderImages: SliderImage[] = [
  {
    src: Slider1,
    alt: 'slider1'
  },
  {
    src: Slider2,
    alt: 'slider2'
  },
  {
    src: Slider3,
    alt: 'slider3'
  }
]

const type = ref("");

const handleChangeType = (t: string) => {
  type.value = t;
}

</script>

<style scoped></style>