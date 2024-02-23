<template>
  <BasePage>
    <template v-slot:content>
      <h1 class="text-xl font-bold">Giỏ hàng</h1>
      <div class="grid grid-cols-4 gap-y-10 gap-x-5 mt-10">
        <div class="col-span-3">
          <table class="w-full">
            <thead>
              <tr class="bg-white">
                <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs"></th>
                <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Ảnh</th>
                <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tên</th>
                <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Đơn giá</th>
                <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Số lượng</th>
                <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Thành tiền</th>
                <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Actions</th>
              </tr>
            </thead>
            <tbody id="tableBody">
              <template v-for="item in orderStore.getOrderItems">
                <tr class="bg-white">
                  <td class="bg-white border-t px-4 py-2">
                    <input type="checkbox" v-model="item.selected" @change="orderStore.toggleSelectedOrderItem(item.id)">
                  </td>
                  <td class="bg-white border-t px-4 py-2">
                    <img class="flex items-center rounded-full w-10 h-10" :src="item.image">
                  </td>
                  <td class="bg-white border-t px-4 py-2">
                    <span class="text-gray-700 px-6 py-4 flex items-center">{{ item.name }}</span>
                  </td>
                  <td class="bg-white border-t px-4 py-2">
                    <span class="text-gray-700 px-6 py-4 flex items-center">{{ item.price }}</span>
                  </td>
                  <td class="bg-white border-t px-4 py-2">
                    <div class="relative">
                      <button @click="handleDecreaseQuantity(item.id)"
                        class="px-4 py-3 text-2xl font-bold border-2">-</button>
                      <input type="text" :value="item.amount" class="absolute top-0 h-full w-14 text-center border-2">
                      <button @click="handleIncreaseQuantity(item.id)"
                        class="px-4 py-3 text-2xl font-bold border-2 ml-14">+</button>
                    </div>
                  </td>
                  <td class="bg-white border-t px-4 py-2">
                    <span class="text-gray-700 px-6 py-4 flex items-center">{{ item.price * item.amount }}</span>
                  </td>

                  <td class="bg-white border-t px-4 py-2">
                    <div class="flex">
                      <button @click="handleClickDelete(item.id)"
                        class="py-1 px-3 rounded bg-red-400 hover:bg-red-600 ease-in-out duration-300 text-white">Delete</button>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="col-span-1">
          <div class="bg-white p-5 rounded-md mb-5">
            <div class="border-b-2 pb-3">
              <div class="flex justify-between py-1">
                <span class="text-lg">Tạm tính</span>
                <span class="font-bold">{{ orderStore.caculateTotal() }}</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-lg">Giảm giá</span>
                <span class="font-bold">0</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-lg">Thuế</span>
                <span class="font-bold">0</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-lg">Phí giao hàng</span>
                <span class="font-bold">0</span>
              </div>
            </div>
            <div class="pt-3">
              <div class="flex justify-between py-1">
                <span class="text-lg">Tổng tiền</span>
                <span class="text-red-500 font-bold">0</span>
              </div>
            </div>
          </div>
          <button class="float-right w-64 px-5 py-3 mr-3 bg-red-600 text-white font-bold text-xl rounded-md">Mua
            hàng</button>
        </div>
      </div>
    </template>
  </BasePage>
</template>

<script setup lang="ts">
import BasePage from '../BasePage/BasePage.vue';
import { useOrderStore } from '../../store/order';

const orderStore = useOrderStore();

const handleDecreaseQuantity = (id: number) => {
  orderStore.decreaseAmount(id);
}

const handleIncreaseQuantity = (id: number) => {
  orderStore.increaseAmount(id);
}

const handleClickDelete = (id: number) => {
  orderStore.removeOrderItem(id);
}

</script>

<style scoped></style>