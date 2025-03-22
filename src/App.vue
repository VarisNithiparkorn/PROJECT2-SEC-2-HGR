<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import productSection from "./components/productSection.vue";
import dataFile from "../data/db.json";
import FillerProduct from "./components/FillerProduct.vue";
import AdminPage from "./components/AdminPage.vue";
import CartManager from "./components/CartManager.vue";
const data = ref(dataFile.products);
</script>

<template>
  <!-- <Header navBar="show" :userId="1" />
  <div class="grid grid-cols-6 h-full">
    <div class="h-max col-start-1 row-span-2">
      <FillerProduct />
    </div>
    <div class="col-start-2 col-end-7 pt-10">
      <div class="flex flex-1 flex-wrap gap-3 pl-10">
        <productSection v-for="item in data" :key="item.id" :item="item" />
      </div>
    </div>
  </div>
  <UserAccountManger/>  -->
  <!-- <CartManager :userId="1"/> -->
  <AdminPage />
</template>

<style scoped></style>
