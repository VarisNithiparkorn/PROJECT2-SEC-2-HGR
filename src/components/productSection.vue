<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="flex h-36 w-32 bg-white text-black border-solid border-red-500 border-2">
    <div class="text-center h-36 w-32">
      <p class="text-xl">{{ item.productName }}</p>
      <p class="text-lg">{{ item.price }}</p>
      <p class="text-base">{{ item.quantityInStock }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
