<template>
  <div class="bg-slate-300 flex justify-center items-center h-screen">
    <div v-if="isSuccess" class="bg-white rounded-lg flex justify-center items-center flex-col p-5">
      <font-awesome-icon :icon="['fas', 'check']" class="text-9xl text-sky-500"/>
      <h1 class="text-center text-xl font-bold pb-5">Một Email đã được gửi đến địa chỉ {{ email }}.<br>Vui lòng làm theo hướng dẫn để đặt lại mật khẩu tài khoản của bạn</h1>
    </div>
    <div v-else class="form grid grid-cols-3 bg-white rounded-lg">
      <div class="col-span-2 p-10">
        <h1 class="text-3xl font-bold pb-5">Xin Chào</h1>
        <h2 class="text-xl pb-5">Quên Mật Khẩu</h2>
        <input type="text" placeholder="abc@gmail.com" v-model.lazy="email"
          class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input">
        <button @click="handleSubmit" :disabled="isLoading"
          class="w-full px-5 py-3 mb-5 bg-red-600 text-white font-bold text-xl rounded-md">Submit</button>
        <router-link to="/login" class="text-sky-500 font-bold">Đăng Nhập</router-link>
        <h2 class="text-xl">Chưa có tài khoản? <router-link to="/register" class="text-sky-500 font-bold">Đăng
            ký</router-link></h2>
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
import { forgotPassword } from '../../api/user';

const email = ref('');
const isLoading = ref(false);
const isSuccess = ref(false);

const handleSubmit = async () => {
  if (!isLoading.value) {
    try {
      isLoading.value = true;
      await forgotPassword(email.value);
      isLoading.value = false;
      isSuccess.value = true;
    } catch (error) {
      isSuccess.value = false;
    }
  }
}
</script>

<style scoped>
.form {
  width: 800px;
  height: 445px;
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