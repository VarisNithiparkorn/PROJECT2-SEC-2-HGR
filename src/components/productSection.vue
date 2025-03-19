<script setup>
import { defineProps, ref, watch } from 'vue';
import { getItemById, addItem } from "@/libs/fetchUtils"
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
      <p class="text-lg">{{ item.productName }}</p>
      <p class="text-base">price: {{ item.price }}</p>
      <p class="text-base pb-4">In stock: {{ item.quantityInStock }}</p>
      <button @click="addtoCart(item.id)" class="btn btn-soft btn-primary">Add to Cart</button>
    </div>
  </div>
</template>

<style scoped>

</style>
