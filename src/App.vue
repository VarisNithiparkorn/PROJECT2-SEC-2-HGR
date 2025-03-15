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
  <Header navBar="show" />
  
  <div class=" flex pt-20">
  <div class="inset-y-0 left-0">
  <FillerProduct/> 
  </div>
  <div class="flex flex-wrap gap-3 justify-center">
  <productSection v-for="item in data" :key="item.id" :item="item" />
</div>
  </div>  
  

</template>

<style scoped></style>
 