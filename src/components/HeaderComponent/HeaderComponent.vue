<template>
  <div>
    <div class="bg-sky-500">
      <div class="container mx-auto py-10">
        <div class="grid grid-cols-4 gap-4">
          <div>
            <router-link to="/" class="text-4xl font-bold text-left text-white">Frontend</router-link>
          </div>
          <div class="col-span-2">
            <div class="flex text-center">
              <input type="text" placeholder="Search" class="w-full px-5 py-3 rounded-tl-xl rounded-bl-xl border-0" />
              <button class="text-white bg-sky-600 rounded-tr-xl rounded-br-xl px-5 py-2 text-2xl">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
              </button>
            </div>
          </div>
          <div class="flex justify-start text-white gap-5 relative">
            <div v-if="!authStore.getIsAuthenticated">
              <div class="flex">
                <font-awesome-icon :icon="['fas', 'user']" class="text-3xl mr-3 mt-3" />
                <div class="flex flex-col">
                  <router-link to="/login" class="hover:font-medium">Đăng Nhập</router-link>
                  <router-link to="/register" class="hover:font-medium">Đăng Ký</router-link>
                </div>
              </div>
            </div>
            <div v-else class="info">
              <img :src="userStore.getUser?.avatar" class="rounded-full w-12 h-12 mr-1">
              <div class="popup hidden">
                <div class="absolute traingle"></div>
                <div class="absolute bg-white top-16 shadow-lg rounded-md popup_details">
                  <ul class="text-black w-52">
                    <li class="p-5 hover:bg-slate-200">
                      <router-link to="/profile" class="flex">
                        Tài Khoản
                      </router-link>
                    </li>
                    <li class="p-5 hover:bg-slate-200" @click="handleLogout">
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <router-link to="/order">
                <font-awesome-icon :icon="['fas', 'cart-shopping']" class="text-3xl" />
                Giỏ Hàng
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../../store/auth';
import { useUserStore } from '../../store/user';
import { useRouter } from 'vue-router';
import { User } from '../../types/User';
import { getInfo } from '../../api/user';
import { logout } from '../../api/auth';

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

onMounted(async () => {
  if (authStore.getIsAuthenticated) {
    const user: User = await getInfo();
    userStore.setUser(user);
  }
});

const handleLogout = async () => {
  await logout();
  authStore.logoutHandle();
  router.push({ name: 'LoginPage' })
}
</script>

<style scoped>
.traingle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 20px 20px 20px;
  border-color: transparent transparent #fff transparent;
}

.info:hover .popup {
  display: block;
}

.popup_details {
  left: -10px;
}
</style>