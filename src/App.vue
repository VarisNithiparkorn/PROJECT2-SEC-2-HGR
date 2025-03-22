<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import productSection from "./components/productSection.vue";
import dataFile from '../data/db.json';
import productDetails from "./components/productDetails.vue";
const data = ref(dataFile.products)
console.log(data.value);
</script>

<template>
  <!-- show , hide -->
  <Header navBar="show" :userId="1"/>
  <!-- List product and filter -->
<div>
  <productSection/>
</div>
<!-- <div class="md:pt-20">
<productDetails/>
</div> -->
</template>

<style scoped></style>
 
