<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getItemById, updateItem } from "@/libs/fetchUtils";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["cartUpdated"]);

const route = useRoute();
const product = ref(null);

const cartUrl = `${import.meta.env.VITE_APP_URL}/carts`;

const addItemToCart = async (item) => {
  try {
    const cartId = props.userId;
    const cart = await getItemById(cartUrl, cartId);
    const existingProductIndex = cart.products.findIndex(
      (p) => p.id === item.id
    );
    if (existingProductIndex !== -1) {
      const currentAmount = cart.products[existingProductIndex].amount;
      if (currentAmount >= item.quantityInStock) {
        alert("Cannot add more items - Maximum stock reached!");
        return;
      }
      cart.products[existingProductIndex].amount += 1;
      alert("Added one more to cart!");
    } else {
      if (item.quantityInStock <= 0) {
        alert("This item is out of stock!");
        return;
      }
      const cartItem = {
        ...item,
        amount: 1,
      };
      cart.products.push(cartItem);
      alert("Added to cart!");
    }

    const updatedCart = await updateItem(cartUrl, cartId, {
      products: cart.products,
    });
    emit("cartUpdated");
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    alert("Failed to add item to cart");
  }
};

onMounted(async () => {
  const productId = route.params.id;
  const productUrl = `${import.meta.env.VITE_APP_URL}/products`;
  product.value = await getItemById(productUrl, productId);
});

</script>
<template>
<div class="h-screen flex flex-col bg-white">
  <div>
  <router-link :to="{ name: 'Home' }">
    <button class="text-xl p-4 cursor-pointer text-black" @click="back">Back</button>
  </router-link>
</div>
  <div class="flex-1 flex flex-col items-center justify-center mb-26" v-if="product">

    <div
      class="w-full max-w-6xl md:grid md:grid-cols-2 flex flex-wrap justify-center p-4"
    >
      <div class="flex justify-center items-center col-1">
        <img
          class="w-90 h-90"
          :src="`/ProductImages/${product.id}.jpg`"
          :alt="product.productName"
        />
      </div>
      <div class="col-2 flex flex-col justify-center">
        <h2 class="text-xl font-semibold mb-2 text-black">
          {{ product.productName }}
        </h2>
        <p class="text-gray-600">{{ product.description}}</p>
        <div class="flex items-center mt-2">
          <span class="text-yellow-400">★★★★★</span>
          <span class="text-gray-600 ml-2"
            >4.8 | in stock: {{ product.quantityInStock }}</span
          >
        </div>
        <div class="mt-3">
          <span class="text-gray-500">${{ product.price.toLocaleString() }}</span>
        </div>
        <div class="mt-6 flex flex-wrap max-md:justify-center">
          <button 
            class="bg-blue-500 text-white px-4 py-2 rounded"
            @click="addItemToCart(product)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped></style>
