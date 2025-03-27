<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getItemById } from "@/libs/fetchUtils";

const route = useRoute();
const product = ref(null);

onMounted(async () => {
  const productId = route.params.id;
  const productUrl = `${import.meta.env.VITE_APP_URL}/products`;
  product.value = await getItemById(productUrl, productId);
});

const getProductImage = (type) => {
  const imageMap = {
    pc: 'product1.jpg',
    laptop: 'product2.jpg',
    gadgets: 'product3.jpg'
  };
  return imageMap[type];
};

</script>

<template>
    <router-link :to="{ name: 'Home' }">
    <button class="text-xl p-4 cursor-pointer" @click="back">Back</button>
  </router-link>
  <div class="flex items-center justify-center" v-if="product">
    <div class="w-full max-w-6xl md:grid md:grid-cols-2 flex flex-wrap justify-center p-4">
      <div class="flex justify-center items-center col-1">
        <img class="w-90 h-90" :src="`/public/ProductImages/${getProductImage(product.type)}`" :alt="product.productName">
      </div>
      <div class="col-2 flex flex-col justify-center">
        <h2 class="text-xl font-semibold mb-2 text-black">{{ product.productName }}</h2>
        <p class="text-gray-600">{{ product.type }}</p>
        <div class="flex items-center mt-2">
          <span class="text-yellow-400">★★★★★</span>
          <span class="text-gray-600 ml-2">4.8 | in stock: {{ product.quantityInStock }}</span>
        </div>
        <div class="mt-3">
          <span class="text-gray-500">${{ product.price }}</span>
        </div>
        <div class="mt-6 flex flex-wrap max-md:justify-center">
          <button class="bg-blue-500 text-white px-4 py-2 rounded">Buy Now</button>
          <button class="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded">Add to Cart</button>
        </div>
        <div class="flex flex-col pt-5 max-md:justify-center">
          <div class="rating">
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="1 star" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="2 star" checked="checked" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="3 star" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="4 star" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="5 star" />
          </div>
          <textarea class="textarea mt-2" placeholder="Comment"></textarea>
          <button class="btn w-15 mt-2">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>