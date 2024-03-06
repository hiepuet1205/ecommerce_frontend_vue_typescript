<template>
  <BasePage>
    <template v-slot:content>
      <h1 class="text-xl font-bold mb-5">Đơn hàng</h1>
      <div v-for="order in orders" class="bg-white p-5 rounded-md mb-5 shadow-lg">
        <h1 class="text-lg font-bold">Phương thức giao hàng
          <span v-if="order.isDelivered">(Đã giao)</span>
          <span v-else>(Chưa giao)</span>
        </h1>
        <span>{{ orderConstant.deliveries.find(delivery => delivery.value == order.order.deliveryMethod)?.text }}</span>
        <h1 class="text-lg font-bold">Phương thức thanh toán
          <span v-if="order.isPaid">(Đã thanh toán)</span>
          <span v-else>(Chưa thanh toán)</span>
        </h1>
        <span>{{ orderConstant.payments.find(payment => payment.value == order.order.paymentMethod)?.text }}</span>
        <table class="w-full mt-5">
          <thead>
            <tr class="bg-white">
              <th class="px-4 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Ảnh</th>
              <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tên</th>
              <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Đơn giá</th>
              <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Số lượng</th>
              <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Thành tiền</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            <template v-for="item in order.items">
              <tr class="bg-white">
                <td class="bg-white border-t px-4 py-2">
                  <img class="flex items-center rounded-full w-10 h-10" :src="item.image">
                </td>
                <td class="bg-white border-t px-4 py-2">
                  <span class="text-gray-700 px-6 py-4 flex items-center">{{ item.product }}</span>
                </td>
                <td class="bg-white border-t px-4 py-2">
                  <span class="text-gray-700 px-6 py-4 flex items-center">{{ numberWithCommas(item.price) }}</span>
                </td>
                <td class="bg-white border-t px-4 py-2">
                  <span class="text-gray-700 px-6 py-4 flex items-center">{{ item.amount }}</span>
                </td>
                <td class="bg-white border-t px-4 py-2">
                  <span class="text-gray-700 px-6 py-4 flex items-center">{{ numberWithCommas(item.price * item.amount)
                  }}</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="h-14 py-3" v-if="!order.order.isDelivered">
          <button @click="handleCancelOrder(order.order.id)"
            class="float-right w-64 px-5 py-3 mr-3 bg-red-600 text-white font-bold text-xl rounded-md">Hủy đơn
            hàng</button>
        </div>
      </div>
    </template>
  </BasePage>
  <router-view></router-view>
</template>

<script setup lang="ts">
import BasePage from '../BasePage/BasePage.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getOrderOfUser, cancelOrder } from '../../api/order';
import { orderConstant } from '../../constant';
import { numberWithCommas } from '../../util';

const router = useRouter();

const orders = ref(null)

onMounted(async () => {
  orders.value = await getOrderOfUser();
})

const handleCancelOrder = async (orderId: string) => {
  if (confirm(`Bạn có chắc muốn hủy đơn hàng này ${orderId}`)) {
    await cancelOrder(orderId);
    router.go(0);
  }
}
</script>

<style scoped></style>