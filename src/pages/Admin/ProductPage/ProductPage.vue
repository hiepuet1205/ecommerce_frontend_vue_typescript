<template>
  <BaseAdminPage>
    <template v-slot:content>
      <h1 class="text-2xl font-bold">Quản lý sản phẩm</h1>
      <button class="border-2 border-inherit p-16 mt-5" @click="globalStore.setShowModal(true)">
        <font-awesome-icon :icon="['fas', 'plus']" class="text-9xl" />
      </button>
      <table class="w-full block whitespace-no-wrap overflow-x-scroll table-striped mt-5">
        <thead>
          <tr>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">ID</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Image</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Name</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Rating</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Type</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Price</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Count In Stock</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Selled</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Description</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Actions</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          <template v-for="product in products">
            <tr class="bg-white">
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ product.id }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <img class="flex items-center rounded-full w-10 h-10" :src="product.images[0]">
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ product.name }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ product.rating }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ product.type }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ product.price }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ product.countInStock }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ product.selled }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ product.description }}</span>
              </td>

              <td class="bg-white border-t px-4 py-2">
                <div class="flex">
                  <button @click="handleClickUpdate(product)"
                    class="py-1 px-3 mr-1 rounded bg-green-400 hover:bg-green-600 ease-in-out duration-300 text-white">Edit</button>
                  <button @click="handleClickDelete(product.id)"
                    class="py-1 px-3 rounded bg-red-400 hover:bg-red-600 ease-in-out duration-300 text-white">Delete</button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="flex flex-col items-center">
        <button v-if="showMoreButton" class="bg-sky-500 text-white px-5 py-2 text-xl rounded-md"
          @click="handleClickSeeMore">{{ buttonText }}</button>
      </div>
      <div
        class="rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-20 mx-auto my-0 bg-white w-2/5"
        v-if="globalStore.getIsShowModal">
        <div class="border-b-2 border-slate-400 p-8 relative">
          <h1 class="text-xl font-bold">{{ modalTitle }}</h1>
          <button class="absolute top-3 right-4 text-4xl text-slate-600"
            @click="globalStore.setShowModal(false)">x</button>
        </div>
        <div class="px-8 pt-8 pb-20">
          <label>Name</label>
          <input type="text" v-model.lazy="name"
            class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

          <label>Type</label>
          <!-- <input type="text" v-model.lazy="type"
            class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none"> -->

          <select v-model.lazy="type" class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">
            <option v-for="type in types" :key="type.name" :value="type.name">{{ type.name }}</option>
          </select>

          <label>Price</label>
          <input type="number" v-model.lazy="price"
            class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

          <label>Count in stock</label>
          <input type="number" v-model.lazy="countInStock"
            class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

          <label>Description</label>
          <input type="text" v-model.lazy="description"
            class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

          <label>images</label>
          <input type="file" multiple @change="handleFileChange"
            class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

          <button class="text-white bg-sky-600 rounded-xl px-5 py-3 text-xl float-right"
            @click="handleClickSubmit">Submit</button>
        </div>
      </div>
    </template>
  </BaseAdminPage>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useGlobalStore } from '../../../store/global';
import BaseAdminPage from '../BaseAdminPage.vue';
import { useRouter } from 'vue-router';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../../api/product';
import { Product, Type } from '../../../types/Product';
import { getAllType } from '../../../api/type';

const products = ref<Array<Product>>([]);
const types = ref<Array<Type>>([]);
const page = ref(1);
const limit = 10;
const isLoading = ref(false);
const showMoreButton = ref(true);
const buttonText = computed(() => isLoading.value ? "...Loading" : "Xem Thêm")
const isUpdate = ref(false);
const modalTitle = computed(() => isUpdate.value ? "Cập nhật sản phẩm" : "Tạo sản phẩm")

const fetchProducts = async () => {
  isLoading.value = true;

  try {
    const data = await getAllProducts(page.value, limit)
    if (data.length < limit) {
      showMoreButton.value = false;
    }
    return data
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
onMounted(async () => {
  products.value = await fetchProducts();
  types.value = await getAllType();
})

const handleClickSeeMore = async () => {
  if (!isLoading.value && showMoreButton) {
    page.value++;
    products.value = [...products.value, ...await fetchProducts()];
  }
}

const globalStore = useGlobalStore();

const id = ref<number>(-1)
const name = ref<string | undefined>('')
const images = ref<File[] | null>(null)
const type = ref<string | undefined>('')
const price = ref<number | undefined>(0)
const countInStock = ref<number | undefined>(0)
const description = ref<string | undefined>('')


const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0) {
    images.value = Array.from(files);
  }
};

const router = useRouter();

const handleClickSubmit = async () => {
  const formData = new FormData();
  if (images.value && name.value && type.value && price.value && countInStock.value && description.value) {
    images.value.forEach((file) => {
      formData.append('image', file);
    });
    
    formData.append('name', name.value);
    formData.append('price', String(price.value));
    formData.append('type', String(type.value));
    formData.append('countInStock', String(countInStock.value));
    formData.append('description', description.value);

    try {
      if (isUpdate.value) {
        await updateProduct(id.value, formData);
        isUpdate.value = false;
      } else {
        await createProduct(formData);
      }
      router.go(0)
    } catch (error) {
      console.error(error);
    }
  }
}

const handleClickDelete = async (id: number) => {
  if (confirm(`Xóa sản phẩm có id: ${id}`)) {
    await deleteProduct(id);
    router.go(0);
  }
}

const handleClickUpdate = async (product: Product) => {
  isUpdate.value = true
  globalStore.setShowModal(true)

  id.value = product.id
  name.value = product.name
  type.value = product.type
  price.value = product.price
  countInStock.value = product.countInStock
  description.value = product.description
}
</script>

<style scoped>
.input {
  background-color: rgb(232, 240, 254);
}

.input:focus {
  border-bottom: solid 2px rgb(32, 48, 128);
}
</style>