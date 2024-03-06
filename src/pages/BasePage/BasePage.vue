<template>
  <div>
    <div class="overlay fixed z-10 top-0 left-0 w-full h-full " v-if="globalStore.getIsShowModal"
      @click="globalStore.setShowModal(false)"></div>
    <HeaderComponent></HeaderComponent>
    <main>
      <div class="container mx-auto">
        <slot name="content"></slot>
      </div>
    </main>
    <FooterComponent></FooterComponent>
    <template v-if="notifyStore.getNotify.isShow">
      <div
        class="flex justify-center items-center rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-20 mx-auto my-0 bg-white w-96 h-52 border-4 border-sky-300"
        v-if="!notifyStore.getNotify.isError">
        <h1 class="text-xl text-sky-500">{{ notifyStore.getNotify.message }}</h1>
      </div>
      <div
        class="flex justify-center items-center rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-20 mx-auto my-0 bg-white w-96 h-52 border-4 border-red-500"
        v-else>
        <h1 class="text-xl text-red-500">{{ notifyStore.getNotify.message }}</h1>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import FooterComponent from '../../components/FooterComponent/FooterComponent.vue';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent.vue';
import { useGlobalStore } from '../../store/global';
import { useNotifyStore } from '../../store/notification';

const globalStore = useGlobalStore();
const notifyStore = useNotifyStore();
</script>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, .5);
}
</style>