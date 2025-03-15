<script setup>
import { ref } from "vue";
import { ref } from "vue";
import Header from "./components/Header.vue";
import productSection from "./components/productSection.vue";
import dataFile from '../data/db.json';
import FillerProduct from "./components/FillerProduct.vue";
import FillerProduct from "./components/FillerProduct.vue";
const data = ref(dataFile.products)
console.log(data.value);
</script>

<template>
  <!-- show , hide -->
  <Header navBar="show" :userId="1"/>
  <div class="flex">
    <div>
  <div class="grid grid-cols-5">
  <div class="h-max  col-start-1 row-span-2">
  <FillerProduct/> 
  </div>
  <div class=" col-start-2 col-end-6">
  <div class="flex flex-1 flex-wrap gap-3 ">
  <productSection v-for="item in data" :key="item.id" :item="item" />
</div>
</div>
  </div>  
</div>
  </div>

</template>

<style scoped></style>
 