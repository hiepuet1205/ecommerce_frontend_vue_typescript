<template>
  <div class="bg-white p-5 rounded-md mb-5">
    <div class="border-b-2 pb-3">
      <div class="flex justify-between py-1">
        <span class="text-lg">Tạm tính</span>
        <span class="font-bold">{{ numberWithCommas(orderStore.getTotal) }}VND</span>
      </div>
      <div class="flex justify-between py-1">
        <span class="text-lg">Phí giao hàng</span>
        <span class="font-bold">{{ numberWithCommas(orderStore.getDeliveryMethod?.price || 0) }} VND</span>
      </div>
    </div>
    <div class="pt-3">
      <div class="flex justify-between py-1">
        <span class="text-lg">Tổng tiền</span>
        <span class="text-red-500 font-bold">{{ numberWithCommas(orderStore.getTotal + 10000) }} VND</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '../../store/order';
import { numberWithCommas } from '../../util';
const orderStore = useOrderStore();
</script>

<style scoped></style>