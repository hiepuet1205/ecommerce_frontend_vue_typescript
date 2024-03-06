<template>
  <BaseAdminPage>
    <template v-slot:content>
      <h1 class="text-2xl font-bold">Quản lý type</h1>
      <button class="border-2 border-inherit p-16 mt-5" @click="globalStore.setShowModal(true)">
        <font-awesome-icon :icon="['fas', 'plus']" class="text-9xl" />
      </button>
      <table class="w-full block whitespace-no-wrap overflow-x-scroll table-striped mt-5">
        <thead>
          <tr>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">ID</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Name</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Created At</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Updated At</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Actions</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          <template v-for="type in types">
            <tr class="bg-white">
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ type.id }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ type.name }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ type.createdAt }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ type.updatedAt }}</span>
              </td>

              <td class="bg-white border-t px-4 py-2">
                <div class="flex">
                  <button @click="handleClickUpdate(type)"
                    class="py-1 px-3 mr-1 rounded bg-green-400 hover:bg-green-600 ease-in-out duration-300 text-white">Edit</button>
                  <button @click="handleClickDelete(type.id)"
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
import { createType, deleteType, getAllType, updateType } from '../../../api/type';
import { Type } from '../../../types/Product';

const types = ref<Array<Type>>([]);
const page = ref(1);
const limit = 10;
const isLoading = ref(false);
const showMoreButton = ref(true);
const buttonText = computed(() => isLoading.value ? "...Loading" : "Xem Thêm")
const isUpdate = ref(false);
const modalTitle = computed(() => isUpdate.value ? "Cập nhật type" : "Tạo type")

const fetchTypes = async () => {
  isLoading.value = true;

  try {
    const data = await getAllType(page.value, limit)
    if (data.length < limit) {
      showMoreButton.value = false;
    }
    return data;
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};
onMounted(async () => {
  types.value = await fetchTypes();
})

const handleClickSeeMore = async () => {
  if (!isLoading.value && showMoreButton) {
    page.value++;
    types.value = [...types.value, ...await fetchTypes()];
  }
}

const globalStore = useGlobalStore();

const id = ref<number>(0)
const name = ref<string | undefined>("")

const router = useRouter();

const handleClickSubmit = async () => {
  if (name.value) {
    try {
      if (isUpdate.value) {
        await updateType(id.value, name.value);
        isUpdate.value = false;
      } else {
        await createType(name.value);
      }
      router.go(0)
    } catch (error) {
      console.error(error);
    }
  }
}

const handleClickDelete = async (id: number) => {
  if (confirm(`Xóa type có id: ${id}`)) {
    await deleteType(id);
    router.go(0);
  }
}

const handleClickUpdate = async (type: Type) => {
  isUpdate.value = true
  globalStore.setShowModal(true)

  id.value = type.id
  name.value = type.name
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