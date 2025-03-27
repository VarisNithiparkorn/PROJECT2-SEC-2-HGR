<script setup>
import { defineProps,  ref,   computed, onMounted, onMounted } from 'vue';
import { getItems, getItemById,  updateItem } from "@/libs/fetchUtils"
import { useCarts } from '@/stores/Carts';

const data = ref([]);
const emit = defineEmits();

const props = defineProps({
  productseach: {
    type: Array,
    required: false,
  },
});

const cartsStore = useCarts();
const { initCart, updateProductInCart } = cartsStore;
const cartUrl = `${import.meta.env.VITE_APP_URL}/carts`;
const addItemToCart = async (item) => {
  try {
    console.log("Adding item to cart:", item);
    const cartId = props.userId;
    const cartItem = {
      ...item,
      amount: 1 
    };
    
    if (item.quantityInStock > 0) {
      const cart = await getItemById(cartUrl, cartId);
      const existingProductIndex = cart.products.findIndex(p => p.id === item.id);
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].amount += 1;
      } else {
        cart.products.push(cartItem);
      }
      const updatedCart = await updateItem(cartUrl, cartId, { products: cart.products });
      updateProductInCart(cartId, updatedCart);
      console.log("Item added to cart:", updatedCart);
      emit("cartUpdated");
    } else {
      console.log("NO STOCK");
    }
  } catch (error) {
    console.error("Failed to add item to cart:", error);
  }
};

const productsUrl = `${import.meta.env.VITE_APP_URL}/products`;
const fetchProducts = async () => {
  try {
    const products = await getItems(productsUrl);
    data.value = products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

const sortOption = ref('');
const selectedCategory = ref("");
const sortedProducts = computed(() => {
  let filtered = [...data.value];
  if (selectedCategory.value) {
    filtered = filtered.filter(product => 
      product.type.toLowerCase() === selectedCategory.value.toLowerCase()
    );
  }
  switch(sortOption.value) {
    case 'hitolow':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'lowtohi':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'histock':
      filtered.sort((a, b) => b.quantityInStock - a.quantityInStock);
      break;
    case 'lowstock':
      filtered.sort((a, b) => a.quantityInStock - b.quantityInStock);
      break;
  }
  return filtered;
});

onMounted(async () => {
  await fetchProducts();
  const cart = await getItemById(cartUrl, 1);
  initCart(cart);
});
</script>

<template>
<div class="flex h-auto w-auto">
  <div class="w-60 h-auto bg-gradient-to-b from-blue-400 to-violet-800 p-4 ">
  <p class="text-xl text-black underline underline-offset-8 decoration-2">Filter</p>
    <div class="pt-4">
    <select class="select" v-model="selectedCategory">
      <option value="">All Categories</option>
      <option value="pc">PC</option>
      <option value="laptop">Laptop</option>
      <option value="gadgets">Gadgets</option>
    </select>
</div>
<div>
  <p class="text-xl text-black pt-3 pb-3 underline underline-offset-8 decoration-2">Price selection</p>
  <div class="pb-2">
    <input type="radio" name="radio-1" class="radio radio-neutral radio-xs mr-2" 
           id="hitolow" value="hitolow" v-model="sortOption" />
    <label class="text-black" for="hitolow">Highest to lowest</label>
  </div>
  <div class="pb-2">
    <input type="radio" name="radio-1" class="radio radio-neutral radio-xs mr-2" 
           id="lowtohi" value="lowtohi" v-model="sortOption" />
    <label class="text-black" for="lowtohi">Lowest to highest</label>
  </div>
  <div class="pb-2">
    <input type="radio" name="radio-1" class="radio radio-neutral radio-xs mr-2" 
           id="histock" value="histock" v-model="sortOption" />
    <label class="text-black" for="histock">High quantity in stock</label>
  </div>
  <div class="pb-2">
    <input type="radio" name="radio-1" class="radio radio-neutral radio-xs mr-2" 
           id="lowstock" value="lowstock" v-model="sortOption" />
    <label class="text-black" for="lowstock">Low quantity in stock</label>
  </div>
</div>
</div>

  <div class="flex flex-wrap gap-4 flex-1 pl-2 pt-10">
    <div v-if="sortedProducts.length === 0" class="text-center w-full">
      No products available
    </div>
    <div v-else class="flex h-46 w-42 bg-white text-black border-solid border-red-500 border-2" 
         v-for="item in sortedProducts" :key="item.id">
      <div class="text-center">
        <p class="text-lg">{{ item.productName }}</p>
        <p class="text-base">price: {{ item.price }}</p>
        <p class="text-base pb-3">In stock: {{ item.quantityInStock }}</p>
        <button @click="addItemToCart(item)" class="btn btn-soft btn-primary">Add to Cart</button>
        <router-link :to="{ name: 'Products', params: { id: item.id }}">
          <button class="mt-2 btn btn-soft btn-info">View Product</button>
        </router-link>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>
