<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import productSection from "./components/productSection.vue";
import dataFile from '../data/db.json';
const data = ref(dataFile.products)
console.log(data.value);
</script>

<template>
  <!-- show , hide -->
  <Header navBar="show" :userId="1"/>
  <div class="flex flex-wrap gap-3 justify-center pt-20">
  <productSection v-for="item in data" :key="item.id" :item="item" />
  </div>
</template>

<style scoped></style>
 