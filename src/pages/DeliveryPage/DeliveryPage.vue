<template>
  <BasePage>
    <template v-slot:content>
      <h1 class="text-xl font-bold">Thanh toán</h1>
      <div class="grid grid-cols-4 gap-y-10 gap-x-5 mt-10">
        <div class="col-span-3">
          <div class="bg-white p-5 rounded-md mb-5">
            <h1 class="text-lg font-bold">Chọn phương thức giao hàng</h1>
            <div class="bg-sky-200 border-4 border-sky-300 rounded-md px-5 mt-5">
              <div v-for="delivery in orderConstant.deliveries" class="flex py-5">
                <input type="radio" :id="delivery.value" class="mr-5" :name="delivery.value" :value="delivery.value"
                  v-model="deliveryMethod">
                <label :for="delivery.value" class="text-lg">{{ delivery.text }}</label>
              </div>
            </div>
          </div>
          <div class="bg-white p-5 rounded-md mb-5">
            <h1 class="text-lg font-bold">Chọn phương thức thanh toán</h1>
            <div class="bg-sky-200 border-4 border-sky-300 rounded-md px-5 mt-5">
              <div v-for="payment in orderConstant.payments" class="flex py-5">
                <input :checked="payment.default" type="radio" :id="payment.value" class="mr-5" :name="payment.value"
                  :value="payment.value" v-model="paymentMethod">
                <label :for="payment.value" class="text-lg">{{ payment.text }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="bg-white p-5 rounded-md mb-5">
            <div class="border-b-2 pb-3">
              <div class="py-1">
                <span class="text-lg">Địa chỉ
                  <span class="font-bold">
                    {{ addressStore.getAddress?.address }} {{ addressStore.getAddress?.city }}
                  </span>
                  <button class="text-red-600 px-2" @click="togglePopupChangeAddress()">Thay đổi</button>
                </span>
              </div>
            </div>
            <AllPriceComponent></AllPriceComponent>
            <button @click="handleClickBuy"
              class="float-right w-64 px-5 py-3 mr-3 bg-red-600 text-white font-bold text-xl rounded-md">Mua
              hàng</button>
          </div>
        </div>
        <div
          class="rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-20 mx-auto my-0 bg-white w-2/5"
          v-if="globalStore.getIsShowModal">
          <div class="border-b-2 border-slate-400 p-8 relative">
            <h1 class="text-xl font-bold">Thay đổi địa chỉ</h1>
            <button class="absolute top-3 right-4 text-4xl text-slate-600"
              @click="globalStore.setShowModal(false)">x</button>
          </div>
          <div class="px-8 pt-8 pb-20">
            <label>Name</label>
            <input type="text" v-model.lazy="name"
              class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

            <label>Address</label>
            <input type="text" v-model.lazy="address"
              class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

            <label>City</label>
            <input type="text" v-model.lazy="city"
              class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

            <label>Phone</label>
            <input type="text" v-model.lazy="phone"
              class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

            <button class="text-white bg-sky-600 rounded-xl px-5 py-3 text-xl float-right"
              @click="handleClickSubmit">Submit</button>
          </div>
        </div>
      </div>
    </template>
  </BasePage>
</template>

<script setup lang="ts">
import BasePage from '../BasePage/BasePage.vue';
import { ref, watch } from 'vue';
import { useAddressStore } from '../../store/address';
import { useGlobalStore } from '../../store/global';
import AllPriceComponent from '../../components/AllPriceComponent/AllPriceComponent.vue';
import { orderConstant } from '../../constant';
import { useOrderStore } from '../../store/order';
import { createOrder } from '../../api/order';
import { Order } from '../../types/Product'
import { useRouter } from 'vue-router';

const addressStore = useAddressStore();
const orderStore = useOrderStore();
const deliveryMethod = ref(orderConstant.deliveries.find(delivery => delivery.default)?.value || 'fast');
const paymentMethod = ref(orderConstant.payments.find(payment => payment.default)?.value || 'later_money');

watch(() => deliveryMethod.value, () => {
  orderStore.changeDeliveryMethod(deliveryMethod.value);
})

watch(() => paymentMethod.value, () => {
  orderStore.changePaymentMethod(paymentMethod.value);
})

const globalStore = useGlobalStore();
const isOpenPopupChangeAddress = ref(false);
const router = useRouter();

const togglePopupChangeAddress = () => {
  globalStore.setShowModal(true);
  isOpenPopupChangeAddress.value = !isOpenPopupChangeAddress.value;
}

const name = ref<string | undefined>('')
const address = ref<string | undefined>('')
const city = ref<string | undefined>('')
const phone = ref<string | undefined>('')

name.value = addressStore.getAddress.name
address.value = addressStore.getAddress.address
city.value = addressStore.getAddress.city
phone.value = addressStore.getAddress.phone

const handleClickSubmit = () => {
  if (name.value && address.value && phone.value && city.value) {
    addressStore.setAddress(name.value, address.value, city.value, phone.value);
    globalStore.setShowModal(false);
  }
}

const handleClickBuy = async () => {
  const orderItems = orderStore.getSelectedItems.map(item => {
    return {
      productId: item.id,
      amount: item.amount,
      price: item.price,
      discount: item.discount,
      image: item.image,
    }
  })

  const shippingPrice = orderStore.getDeliveryMethod?.price || 10000

  const order: Order = {
    deliveryMethod: deliveryMethod.value,
    paymentMethod: paymentMethod.value,
    orderItems: orderItems,
    itemsPrice: orderStore.getTotal,
    shippingPrice,
    totalPrice: shippingPrice + orderStore.getTotal,
    isPaid: false,
    name: addressStore.getAddress.name,
    address: addressStore.getAddress.address,
    city: addressStore.getAddress.city,
    phone: addressStore.getAddress.phone,
  }
  await createOrder(order);
  orderStore.clearSelectedItems();
  router.push({ name: 'OrderSuccessPage' })
}
</script>

<style scoped>
.input {
  background-color: rgb(232, 240, 254);
}

.input:focus {
  border-bottom: solid 2px rgb(32, 48, 128);
}
</style>../../store/global