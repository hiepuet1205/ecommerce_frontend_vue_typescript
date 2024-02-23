<template>
  <BasePage>
    <template v-slot:content>
      <div class="flex justify-center h-5xl py-8">
        <div class="max-w-4xl bg-white rounded-lg p-10">
          <h1 class="text-2xl py-3 font-bold">Thông tin người dùng</h1>
          <div class="w-full">
            <label>Name</label>
            <input type="text" v-model.lazy="name" class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input">

            <label>Email</label>
            <input type="text" v-model.lazy="email" class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input">

            <label>Phone</label>
            <input type="text" v-model.lazy="phone" class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input">

            <label>Avatar</label>
            <img :src="userStore.getUser?.avatar" class="rounded-full w-24 h-24 ">
            <input type="file" @change="handleFileChange"
              class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input">

            <label>Address</label>
            <input type="text" v-model.lazy="address" class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input">

            <label>City</label>
            <input type="text" v-model.lazy="city" class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input">
          </div>
          <div>
            <button class="text-white bg-sky-600 rounded-xl px-5 py-3 text-xl float-right"
              @click="handleClickUpdate">Chỉnh
              sửa</button>
          </div>
        </div>
      </div>
    </template>
  </BasePage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BasePage from '../BasePage/BasePage.vue';
import axios from 'axios';
import { useUserStore } from '../../store/user';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';

const router = useRouter();

const userStore = useUserStore();

const name = ref<string | undefined>(userStore.getUser?.name)
const email = ref<string | undefined>(userStore.getUser?.email)
const phone = ref<string | undefined>(userStore.getUser?.phone)
const avatar = ref<File | null>(null)
const address = ref<string | undefined>(userStore.getUser?.address)
const city = ref<string | undefined>(userStore.getUser?.city)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0) {
    avatar.value = files[0];
  }
};

const authStore = useAuthStore();

const handleClickUpdate = async () => {
  const formData = new FormData();
  if (avatar.value && name.value && phone.value && address.value && email.value && city.value) {
    formData.append('avatar', avatar.value);
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('phone', phone.value);
    formData.append('address', address.value);
    formData.append('city', city.value);

    axios
      .put('users/update-info', formData, {
        headers: {
          'Authorization': `Bearer ${authStore.getToken}`
        },
      })
      .then(response => {
        console.log('Update Successfully!', response);
        router.go(0);
      })
      .catch(error => {
        console.error('Update error!', error);
      });
  }
}

</script>

<style scoped>
.input {
  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;
  background-color: rgb(232, 240, 254);
}

.input:focus {
  border-bottom: solid 2px rgb(32, 48, 128);
}
</style>