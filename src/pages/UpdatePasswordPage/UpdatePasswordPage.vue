<template>
  <div class="bg-slate-300 flex justify-center items-center h-screen">
    <div class="form grid grid-cols-3 bg-white rounded-lg">
      <div class="col-span-2 p-10 h-full">
        <h1 class="text-3xl font-bold pb-5">Xin Chào</h1>
        <h2 class="text-xl pb-5">Thay Đổi Mật Khẩu</h2>
        <input type="text" placeholder="old password" v-model.lazy="oldPassword"
          class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input">
          <input type="text" placeholder="new password" v-model.lazy="newPassword"
          class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input">
          <input type="text" placeholder="password confirm" v-model.lazy="passwordConfirm"
          class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input">
        <button @click="handleSubmit" :disabled="isLoading"
          class="w-full px-5 py-3 mb-5 bg-red-600 text-white font-bold text-xl rounded-md">Submit</button>
        <router-link to="/" class="text-sky-500 font-bold">Trang Chủ</router-link>
      </div>
      <div class="col-span-1 bg-slate-100 flex justify-center items-center rounded-lg">
        <img :src="Login" class="h-52 w-52">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Login from '../../assets/images/login.png';
import { updatePassword } from '../../api/user';
import { useRouter } from 'vue-router';
import { logout } from '../../api/auth';
import { useAuthStore } from '../../store/auth';

const oldPassword = ref('');
const newPassword = ref('');
const passwordConfirm = ref('');
const isLoading = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const handleSubmit = async () => {
  if (!isLoading.value) {
    try {
      isLoading.value = true;
      await updatePassword(oldPassword.value, newPassword.value, passwordConfirm.value);
      isLoading.value = false;
      await logout();
      authStore.logoutHandle();
      router.push({ name: 'LoginPage' })
    } catch (error) {
    }
  }
}
</script>

<style scoped>
.form {
  width: 800px;
  height: 500px;
}

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