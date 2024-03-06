<template>
  <div class="bg-slate-300 flex justify-center items-center h-screen">
    <div class="form grid grid-cols-3 bg-white rounded-lg">
      <div class="col-span-2 p-10">
        <h1 class="text-3xl font-bold pb-5">Xin Chào</h1>
        <h2 class="text-xl pb-5">Tạo vào tài khoản</h2>
        <input type="text" placeholder="abc@gmail.com" v-model.lazy="email" class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input">
        <input type="text" placeholder="password" v-model.lazy="password" class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input">
        <input type="text" placeholder="confirm password" v-model.lazy="passwordConfirm" class="w-full px-5 py-4 mb-5 placeholder:text-xl rounded-md input">
        <button @click="handleSubmit" class="w-full px-5 py-3 mb-5 bg-red-600 text-white font-bold text-xl rounded-md">Đăng Ký</button>
        <h2 class="text-xl">Đã có tài khoản? <router-link to="/login" class="text-sky-500 font-bold">Đăng nhập</router-link></h2>
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
import { signup } from '../../api/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const router = useRouter();

const handleSubmit = async () => {
  if (password.value!== passwordConfirm.value) {
    alert('Mật khẩu không trùng khớp');
    return;
  }

  if (email.value === '' || password.value === '' || passwordConfirm.value === '') {
    alert('Vui lòng nhập đầy đủ thông tin');
    return;
  }

  await signup(email.value, password.value);
  router.push({ name: 'LoginPage' });
}
</script>

<style scoped>
.form{
  width: 800px;
  height: 500px;
}

.input{
  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;
  background-color: rgb(232, 240, 254);
}

.input:focus{
  border-bottom: solid 2px rgb(32, 48, 128);
}
</style>