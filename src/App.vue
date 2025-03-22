<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import productSection from "./components/productSection.vue";
import dataFile from "../data/db.json";
import productDetails from "./components/productDetails.vue";
import AdminPage from "./components/AdminPage.vue";
import CartManager from "./components/CartManager.vue";
const data = ref(dataFile.products);
</script>

<template>
  <!-- <Header navBar="show" :userId="1" />
        <productSection/>
  <UserAccountManger/>  -->
  <!-- <CartManager :userId="1"/> -->
  <AdminPage />
<!-- <div class="md:pt-20">
<productDetails/>
</div> -->
</template>

<style scoped></style>
