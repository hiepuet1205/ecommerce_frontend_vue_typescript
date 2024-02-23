<template>
  <div>
    <div class="overlay fixed z-10 top-0 left-0 w-full h-full " v-if="adminStore.getIsShowModal" @click="adminStore.setShowModal(false)"></div>
    <HeaderComponent></HeaderComponent>
    <main>
      <div class="grid grid-cols-6">
        <div class="col-span-1">
          <NavigationComponent :navigations="navigations"></NavigationComponent>
        </div>
        <div class="col-span-5 p-5">
          <slot name="content"></slot>
        </div>
      </div>
    </main>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script setup lang="ts">
import FooterComponent from '../../components/FooterComponent/FooterComponent.vue';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent.vue';
import NavigationComponent from '../../components/NavigationComponent/NavigationComponent.vue';
import { useAdminStore } from '../../store/admin';
import { Navigation } from "../../types/Navigation"

const navigations: Array<Navigation> = [
  {
    text: "User",
    path: "/admin/user",
    icon: ['fas', 'user']
  },
  {
    text: "Product",
    path: "/admin/product",
    icon: ['fas', 'bars']
  }
]

const adminStore = useAdminStore();
</script>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, .5);
}
</style>