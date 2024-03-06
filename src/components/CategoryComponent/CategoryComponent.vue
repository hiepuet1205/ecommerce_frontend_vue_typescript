<template>
  <div class="bg-white mr-5 p-4">
    <div class="text-2xl font-bold">
      <font-awesome-icon :icon="['fas', 'bars']" />
      Danh Mục
    </div>
    <div class="ml-5 mt-1 text-xl">
      <template v-for="(category, index) in types">
        <div class="py-1" @click="handleClickCategory(index)">
          <font-awesome-icon v-if="visibleCategories[index]" :icon="['fas', 'caret-right']" class="mr-2 text-red-600" />
          <span v-if="visibleCategories[index]" class="text-red-600">{{ category }}</span>
          <span v-else>{{ category }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAllType } from '../../api/type'

const types = ref<Array<string>>([])
const visibleCategories = ref(Array(types.value.length).fill(false));
const emit = defineEmits(["handleChangeType"]);

const handleClickCategory = (index: number) => {
  visibleCategories.value.forEach((value, idx) => {
    visibleCategories.value[idx] = false;
  });

  visibleCategories.value[index] = !visibleCategories.value[index];

  emit("handleChangeType", types.value[index]);
};


onMounted(async () => {
  const data = await getAllType();
  types.value = data.map((type: { name: any; }) => type.name);
})
</script>

<style scoped></style>