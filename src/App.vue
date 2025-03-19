<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import productSection from "./components/productSection.vue";
import dataFile from '../data/db.json';
import FillerProduct from "./components/FillerProduct.vue";
const data = ref(dataFile.products)
console.log(data.value);
</script>

<template>
  <!-- show , hide -->
  <Header navBar="show" :userId="1"/>
  <div class="grid grid-cols-6 h-full">
  <div class="h-max  col-start-1 row-span-2">
  <FillerProduct/> 
  </div>
  <div class=" col-start-2 col-end-7 pt-10">
  <div class="flex flex-1 flex-wrap gap-3 pl-10">
  <productSection v-for="item in data" :key="item.id" :item="item" />
</div>
</div>
</div>  

</template>

<style scoped></style>
 
