<script setup>
import Header from "./components/Header.vue";
import CartManager from "./components/CartManager.vue";
</script>

<template>
  <!-- show , hide -->
  <Header navBar="show" :userId="1"/>
   <CartManager :userId="1"/>

</template>

<style scoped></style>