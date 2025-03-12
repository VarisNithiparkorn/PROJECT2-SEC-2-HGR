<script setup>
import { ref } from "vue";
import dataFile from '../../data/db.json';
import { defineProps } from 'vue';
const data = ref(dataFile)
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
for (const { ID, name, price, brand } of data.value) {
  console.log(name);
}
</script>

<template>
   <div class="flex h-36 w-32 bg-white text-black border-solid border-red-500 border-2">
    <div class="text-center h-36 w-32">
    <p class="text-xl">{{ item.name }}</p>
    <p class="text-lg">{{ item.brand }}</p>
    <p class="text-base">{{ item.price }}</p>
</div>
  </div>
</template>

<style scoped>
</style>
