<template>
  <BasePage>
    <template v-slot:content>
      <h1 class="text-xl font-bold">Giỏ hàng</h1>
      <div class="grid grid-cols-4 gap-y-10 gap-x-5 mt-10">
        <div class="col-span-3">
          <table class="w-full">
            <thead>
              <tr class="bg-white">
                <th class="px-4 py-3 text-left">
                  <input type="checkbox" v-model="selectAll" @click="handleCheckboxChange">
                </th>
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
                    <input type="checkbox" v-model="item.selected">
                  </td>
                  <td class="bg-white border-t px-4 py-2">
                    <img class="flex items-center rounded-full w-10 h-10" :src="item.image">
                  </td>
                  <td class="bg-white border-t px-4 py-2">
                    <span class="text-gray-700 px-6 py-4 flex items-center">{{ item.name }}</span>
                  </td>
                  <td class="bg-white border-t px-4 py-2">
                    <span class="text-gray-700 px-6 py-4 flex items-center">{{ numberWithCommas(item.price) }} VND</span>
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
                    <span class="text-gray-700 px-6 py-4 flex items-center">{{ numberWithCommas(item.price * item.amount)
                    }} VND</span>
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
          <AllPriceComponent></AllPriceComponent>
          <button @click="handleClickOrder"
            class="float-right w-64 px-5 py-3 mr-3 bg-red-600 text-white font-bold text-xl rounded-md">Mua
            hàng</button>
        </div>
      </div>
    </template>
  </BasePage>
  <router-view></router-view>
</template>

<script setup lang="ts">
import BasePage from '../BasePage/BasePage.vue';
import { useOrderStore } from '../../store/order';
import { ref } from 'vue';
import AllPriceComponent from '../../components/AllPriceComponent/AllPriceComponent.vue';
import { useRouter } from 'vue-router';
import { useNotifyStore } from '../../store/notification';
import { numberWithCommas } from '../../util';

const orderStore = useOrderStore();
const notifyStore = useNotifyStore();

const handleDecreaseQuantity = (id: number) => {
  orderStore.decreaseAmount(id);
}

const handleIncreaseQuantity = (id: number) => {
  orderStore.increaseAmount(id);
}

const handleClickDelete = (id: number) => {
  orderStore.removeOrderItem(id);
  notifyStore.setShowNotify(false, 'Đã xóa thành công sản phẩm')
}

const selectAll = ref(orderStore.getSelectedAll);

const handleCheckboxChange = () => {
  selectAll.value = !selectAll.value;
  orderStore.toggleSelectedAll(selectAll.value);
};

const router = useRouter();

const handleClickOrder = () => {
  if (orderStore.getSelectedItems.length === 0) {
    notifyStore.setShowNotify(true, 'Bạn chưa chọn sản phẩm nào');
    return;
  }
  router.push({ name: 'OrderDeliveryPage' });
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