<template>
  <div>
    <div
      class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 justify-items-center justify-center gap-y-10 gap-x-5 mb-5">
      <div v-for="product in products" class="max-w-sm bg-white">
        <router-link :to="{ name: 'ProductPage', params: { id: product.id } }"
          class="flex rounded-lg h-full flex-col relative">
          <img :src="product.productImage">
          <div class="absolute top-0 left-0">
            <img :src="product.logoImage">
          </div>
          <div class="p-3">
            <div>
              <span class="text-base">{{ product.brand }}</span>
            </div>
            <div>
              <span class="text-base text-gray-500">
                {{ product.rating }} <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-500" /> | Đã Bán {{
                  product.quantitySold }}
              </span>
            </div>
            <div>
              <span class="text-base text-red-500 font-bold">
                {{ numberWithCommas(product.price) }}đ
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <button v-if="showMoreButton" class="bg-sky-500 text-white px-5 py-2 text-xl rounded-md"
        @click="handleClickSeeMore">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { Product } from '../../types/Product';
import Logo from '../../assets/images/logo.png';
import Test from '../../assets/images/test.webp';
import axios from 'axios';

const props = defineProps({
  type: { type: String, required: true }
})

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const products = ref<Array<Product>>([]);
const showMoreButton = ref(true);
const isLoading = ref(false);
const buttonText = computed(() => isLoading.value ? "...Loading" : "Xem Thêm")

const page = ref(1);
const limit = 10;

const fetchProducts = async () => {
  isLoading.value = true;

  const params: {
    page?: number,
    limit?: number,
    type?: string,
  } = {
    page: page.value,
    limit: limit
  }

  if (props.type) {
    params.type = props.type
  }

  try {
    const response = await axios.get(`products`, {
      params
    });

    const data = response.data;

    if (data.data.length === 0) {
      showMoreButton.value = false;
      return [];
    }

    return data.data.map((el: { id: number; image: string; name: string; price: number; selled: string; rating: number; }) => ({
      id: el.id,
      productImage: Test,
      productSmallImages: [Test, Test, Test, Test],
      logoImage: Logo,
      brand: el.name,
      price: el.price,
      quantitySold: el.selled,
      rating: el.rating,
      title: el.name
    }));
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
onMounted(async () => {
  products.value = await fetchProducts();
})

watch(() => props.type, async () => {
  page.value = 1;
  products.value = await fetchProducts();
});

const handleClickSeeMore = async () => {
  if (!isLoading.value && showMoreButton) {
    page.value++;
    products.value = [...products.value, ...await fetchProducts()];
  }
}

</script>

<style scoped></style>