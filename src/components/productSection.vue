<script setup>
import { defineProps, ref, watch } from 'vue';
import { addItem } from "@/libs/fetchUtils"
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const cartUrl = `${import.meta.env.VITE_APP_URL}/carts`;
const addItemToCart = async (item) => {
  try {
    console.log("Adding item to cart:", item);
    const cartId = 1; 
    const cartItem = {
      ...item,
      amount: 1 
    };
    const getCartResponse = await fetch(`${cartUrl}/${cartId}`);
    if (!getCartResponse.ok) {
      throw new Error(`Server error: ${getCartResponse.statusText}`);
    }
    const cart = await getCartResponse.json();
    const existingProductIndex = cart.products.findIndex(p => p.id === item.id);
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].amount += 1;
    } else {
      cart.products.push(cartItem);
    }
    // Update the cart
    const updateResponse = await fetch(`${cartUrl}/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
    if (!updateResponse.ok) {
      throw new Error(`Server error: ${updateResponse.statusText}`);
    }
    const updatedCart = await updateResponse.json();
    console.log("Item added to cart:", updatedCart);
  } catch (error) {
    console.error("Failed to add item to cart:", error);
  }
};

</script>

<template>
  <div class="flex h-36 w-32 bg-white text-black border-solid border-red-500 border-2">
    <div class="text-center h-36 w-32">
      <p class="text-lg">{{ props.item.productName }}</p>
      <p class="text-base">price: {{ props.item.price }}</p>
      <p class="text-base pb-4">In stock: {{ props.item.quantityInStock }}</p>
      <button @click="addItemToCart(props.item)" class="btn btn-soft btn-primary">Add to Cart</button>
    </div>
  </div>
</template>

<style scoped>

</style>
