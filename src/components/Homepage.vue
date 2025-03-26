<script setup>
import Header from "./Header.vue";
import ProductSection from "./ProductSection.vue";
import { onMounted, ref } from "vue";
import { getItems } from "@/libs/fetchUtils";
import { useCarts } from "@/stores/Carts";
import { storeToRefs } from "pinia";
const myCart = useCarts();
const { carts } = storeToRefs(myCart);
const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});

const cartItemCount = ref(0);

const calculateCartTotal = () => {
  let totalCount = 0;
  carts.value.forEach((cart) => {
    cart.products.forEach((product) => {
      totalCount += parseInt(product.amount || 0);
    });
  });
  cartItemCount.value = totalCount;
};

const cartUpdated = async () => {
  try {
    const items = await getItems(`${import.meta.env.VITE_APP_URL}/carts`);
    carts.value = Array.isArray(items) ? items : [items];
    calculateCartTotal();
  } catch (error) {
    console.error( error);
  }
};

onMounted(async () => {
  try {
    const items = await getItems(`${import.meta.env.VITE_APP_URL}/carts`);
    carts.value = Array.isArray(items) ? items : [items];
    calculateCartTotal();
  } catch (error) {
    console.error( error);
  }
});
</script>

<template>
  <Header :userId="props.userId" :cartItemCount="cartItemCount" />
  <ProductSection :item="carts" @cartUpdated="cartUpdated" />
</template>
