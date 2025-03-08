<script setup>
import { ref } from "vue";
import FillerProduct from "./componant/FillerProduct.vue";
import ProductSection from "./componant/productSection.vue";
import dataFile from '../data/db.json';
const data = ref(dataFile);
</script>

<template>
    <FillerProduct />
    <div class="flex flex-wrap gap-2 justify-center">
    <ProductSection v-for="item in data" :key="item.ID" :item="item"/>
  </div>
</template>

<style scoped>

</style>
