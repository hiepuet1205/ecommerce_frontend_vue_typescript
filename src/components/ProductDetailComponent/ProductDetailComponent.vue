<template>
  <div class="grid grid-cols-6 gap-5 p-5 bg-white ">
    <div class="col-span-2">
      <img :src="product?.productImage" class="mb-5">
      <swiper :slidesPerView="6" :spaceBetween="30" :freeMode="true" :pagination="{
        clickable: true,
      }" :modules="modules" class="mySwiper">
        <swiper-slide v-for="smallImage in product?.productSmallImages">
          <img :src="smallImage">
        </swiper-slide>
      </swiper>
    </div>
    <div class="col-span-4">
      <h3 class="text-2xl mb-5">{{ product?.title }}</h3>
      <div class="mb-5">
        <span class="text-base text-gray-500">
          {{ product?.rating }} <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-500" /> | Đã Bán {{
            product?.quantitySold }}
        </span>
      </div>
      <div class="bg-slate-100 py-4">
        <h1 class="text-3xl pl-2">{{ numberWithCommas(product?.price || 0) }}</h1>
      </div>
      <div class="py-4 border-b-2">
        <Span>Giao đến
          <span class="font-bold underline px-2">Address</span>
          <router-link to="/" class="text-sky-500 font-bold">Đổi địa chỉ</router-link>
        </Span>
      </div>
      <div class="py-3 border-b-2">
        <h2 class="py-1">Số Lượng</h2>
        <div class="relative">
          <button @click="handleDecreaseQuantity" class="px-4 py-3 text-2xl font-bold border-2">-</button>
          <input type="text" :value="orderProduct && orderProduct.amount"
            class="absolute top-0 h-full w-14 text-center border-2">
          <button @click="handleIncreaseQuantity" class="px-4 py-3 text-2xl font-bold border-2 ml-14">+</button>
        </div>
      </div>
      <div class="py-4">
        <button @click="handleClickOrder"
          class="w-64 px-5 py-3 mr-3 bg-red-600 text-white font-bold text-xl rounded-md">Chọn Mua</button>
        <button class="w-64 px-5 py-3 mr-3 bg-white text-sky-500 border-2 border-sky-500 text-xl rounded-md">Mua Trả
          Sau</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { ref, onMounted } from 'vue';
import { OrderProduct, Product } from '../../types/Product';
import { FreeMode, Pagination } from 'swiper/modules';
import { useRoute } from 'vue-router';
import Logo from '../../assets/images/logo.png';
import Test from '../../assets/images/test.webp';
import axios from 'axios';
import { useOrderStore } from '../../store/order';

const route = useRoute()

const modules = [FreeMode, Pagination];
const product = ref<Product | null>(null);
const orderProduct = ref<OrderProduct | null>(null);
const orderStore = useOrderStore();

const fetchProduct = async () => {
  try {
    const id = route.params.id;
    const response = await axios.get(`products/${id}`);
    const data = response.data;

    if (data && data.data) {
      orderProduct.value = { ...data.data, amount: 0, selected: false }
      product.value = {
        id: data.data.id,
        productImage: Test,
        productSmallImages: [Test, Test, Test, Test],
        logoImage: Logo,
        brand: data.data.name,
        price: data.data.price,
        quantitySold: data.data.selled,
        rating: data.data.rating,
        title: data.data.name
      };
    }
  } catch (error) {
    console.error('Lỗi khi fetch dữ liệu:', error);
  }
};

onMounted(async () => {
  await fetchProduct();
})

const handleDecreaseQuantity = () => {
  if (orderProduct.value && orderProduct.value.amount > 0) {
    orderProduct.value.amount--;
  }
}

const handleIncreaseQuantity = () => {
  if (orderProduct.value) {
    orderProduct.value.amount++;
  }
}

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const handleClickOrder = () => {
  if (orderProduct.value && orderProduct.value.amount > 0) {
    orderStore.addOrderProduct(orderProduct.value);
  }
}


</script>

<style scoped></style>