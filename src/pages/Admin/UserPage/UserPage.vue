<template>
  <BaseAdminPage>
    <template v-slot:content>
      <h1 class="text-2xl font-bold">Quản lý người dùng</h1>
      <button class="border-2 border-inherit p-16 mt-5" @click="adminStore.setShowModal(true)">
        <font-awesome-icon :icon="['fas', 'plus']" class="text-9xl" />
      </button>
      <table class="w-full block whitespace-no-wrap overflow-x-scroll table-striped mt-5">
        <thead>
          <tr>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">ID</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Avatar</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Name</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Email</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Role</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Phone</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Address</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">City</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Created At</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Updated At</th>
            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Actions</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          <template v-for="user in users">
            <tr class="bg-white">
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ user.id }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <img class="flex items-center rounded-full w-10 h-10" :src="user.avatar">
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ user.name }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ user.email }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ user.role }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ user.phone }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ user.address }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ user.city }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ user.createdAt }}</span>
              </td>
              <td class="bg-white border-t px-4 py-2">
                <span class="text-gray-700 px-6 py-4 flex items-center">{{ user.updatedAt }}</span>
              </td>

              <td class="bg-white border-t px-4 py-2">
                <div class="flex">
                  <button @click="handleClickUpdate(user)"
                    class="py-1 px-3 mr-1 rounded bg-green-400 hover:bg-green-600 ease-in-out duration-300 text-white">Edit</button>
                  <button @click="handleClickDelete(user.id)"
                    class="py-1 px-3 rounded bg-red-400 hover:bg-red-600 ease-in-out duration-300 text-white">Delete</button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="flex flex-col items-center">
        <button v-if="showMoreButton" class="bg-sky-500 text-white px-5 py-2 text-xl rounded-md"
          @click="handleClickSeeMore">{{ buttonText }}</button>
      </div>
      <div
        class="rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-20 mx-auto my-0 bg-white w-2/5"
        v-if="adminStore.getIsShowModal">
        <div class="border-b-2 border-slate-400 p-8 relative">
          <h1 class="text-xl font-bold">{{ modalTitle }}</h1>
          <button class="absolute top-3 right-4 text-4xl text-slate-600"
            @click="adminStore.setShowModal(false)">x</button>
        </div>
        <div class="px-8 pt-8 pb-20">
          <label>Name</label>
          <input type="text" v-model.lazy="name"
            class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

          <label>Email</label>
          <input type="text" v-model.lazy="email"
            class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

          <template v-if="!isUpdate">
            <label>Password</label>
            <input type="password" v-model.lazy="password"
              class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

            <label>Password Confirm</label>
            <input type="password" v-model.lazy="confirmPassword"
              class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">
          </template>

          <label>Phone</label>
          <input type="text" v-model.lazy="phone"
            class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

          <label>Address</label>
          <input type="text" v-model.lazy="address"
            class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

          <label>City</label>
          <input type="text" v-model.lazy="city"
            class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

          <label>Avatar</label>
          <input type="file" @change="handleFileChange"
            class="w-full px-5 py-4 mb-3 placeholder:text-xl rounded-md input border-t-0 border-l-0 border-r-0 outline-none">

          <button class="text-white bg-sky-600 rounded-xl px-5 py-3 text-xl float-right"
            @click="handleClickSubmit">Submit</button>
        </div>
      </div>
    </template>
  </BaseAdminPage>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAdminStore } from '../../../store/admin';
import BaseAdminPage from '../BaseAdminPage.vue';
import { User } from '../../../types/User';
import { useRouter } from 'vue-router';
import { getAllUsers, createUser, deleteUser, updateUser } from '../../../api/user';

const users = ref<Array<User>>([]);
const page = ref(1);
const limit = 10;
const isLoading = ref(false);
const showMoreButton = ref(true);
const buttonText = computed(() => isLoading.value ? "...Loading" : "Xem Thêm")
const isUpdate = ref(false);
const modalTitle = computed(() => isUpdate.value ? "Cập nhật người dùng" : "Tạo người dùng")

const fetchUsers = async () => {
  isLoading.value = true;

  try {
    const data = await getAllUsers(page.value, limit)
    if (data.length < limit) {
      showMoreButton.value = false;
    }
    return data
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
onMounted(async () => {
  users.value = await fetchUsers();
})

const handleClickSeeMore = async () => {
  if (!isLoading.value && showMoreButton) {
    page.value++;
    users.value = [...users.value, ...await fetchUsers()];
  }
}

const adminStore = useAdminStore();

const id = ref<number>(0)
const name = ref<string | undefined>("")
const email = ref<string | undefined>("")
const phone = ref<string | undefined>("")
const avatar = ref<File | null>(null)
const address = ref<string | undefined>("")
const city = ref<string | undefined>("")
const password = ref<string | undefined>("")
const confirmPassword = ref<string | undefined>("")

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0) {
    avatar.value = files[0];
  }
};

const router = useRouter();

const handleClickSubmit = async () => {
  const formData = new FormData();
  if (avatar.value && name.value && phone.value && address.value && email.value && city.value) {
    formData.append('avatar', avatar.value);
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('phone', phone.value);
    formData.append('address', address.value);
    formData.append('city', city.value);

    try {
      if (isUpdate.value) {
        await updateUser(id.value, formData);
        isUpdate.value = false;
      } else {
        if (password.value && confirmPassword.value) {
          formData.append('password', password.value);
          formData.append('confirmPassword', confirmPassword.value);
          await createUser(formData);
        }
      }
      router.go(0)
    } catch (error) {
      console.error(error);
    }
  }
}

const handleClickDelete = async (id: number) => {
  if (confirm(`Xóa người dùng có id: ${id}`)) {
    await deleteUser(id);
    router.go(0);
  }
}

const handleClickUpdate = async (user: User) => {
  isUpdate.value = true
  adminStore.setShowModal(true)

  id.value = user.id
  name.value = user.name
  email.value = user.email
  phone.value = user.phone
  address.value = user.address
  city.value = user.city
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