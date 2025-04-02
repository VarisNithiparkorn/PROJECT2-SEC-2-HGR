<script setup>
import { ref, computed, onMounted } from "vue";
import { getItemById, updateItem, getItems } from "@/libs/fetchUtils";
import { useProducts } from "@/stores/Products";

const myProducts = useProducts();
const { initProduct } = myProducts;

const props = defineProps({
  searchProduct: {
    type: Array,
    default: [],
  },
  userId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["cartUpdated"]);

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
    }

    const updatedCart = await updateItem(cartUrl, cartId, {
      products: cart.products,
    });
    emit("cartUpdated");
  } catch (error) {
    console.error("Failed to add item to cart:", error);
  }
};

const sortOption = ref("");
const selectedCategory = ref("");

const sortedProducts = computed(() => {
  let filtered = [...props.searchProduct];

  if (selectedCategory.value) {
    filtered = filtered.filter((product) =>
      product.type.toLowerCase().includes(selectedCategory.value.toLowerCase())
    );
  }
  switch (sortOption.value) {
    case "hitolow":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "lowtohi":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "histock":
      filtered.sort((a, b) => b.quantityInStock - a.quantityInStock);
      break;
    case "lowstock":
      filtered.sort((a, b) => a.quantityInStock - b.quantityInStock);
      break;
  }

  return filtered;
});

onMounted(async () => {
  try {
    const product = await getItems(`${import.meta.env.VITE_APP_URL}/products`);
    initProduct(product);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="flex h-auto w-full">
    <div
      class="w-64 min-h-screen bg-gradient-to-b from-blue-600 to-violet-900 p-6 text-white shadow-lg
      max-[1025px]:w-48 max-[769px]:w-44 max-[376px]:w-30"
    >
      <h2 class="text-xl font-semibold mb-6 mt-16">Filter</h2>
      <div class="mb-8">
        <label class="block mb-2 font-medium">Category</label>
        <select
          class="max-sm:text-[12px] w-full p-2 rounded-md text-black bg-white border border-gray-300 focus:outline-none"
          v-model="selectedCategory"
        >
          <option value="">All Categories</option>
          <option value="pc">PC</option>
          <option value="laptop">Laptop</option>
          <option value="keyboard">Keyboard</option>
          <option value="mouse">Mouse</option>
          <option value="headset">Headset</option>
        </select>
      </div>
      <h2 class="text-xl font-semibold mb-4">Sort By</h2>
      <div class="space-y-3">
        <label class="flex items-center cursor-pointer">
          <input
            type="radio"
            name="sort"
            class="mr-2 accent-white"
            value="hitolow"
            v-model="sortOption"
          />
          Highest price
        </label>
        <label class="flex items-center cursor-pointer">
          <input
            type="radio"
            name="sort"
            class="mr-2 accent-white"
            value="lowtohi"
            v-model="sortOption"
          />
          Lowest price
        </label>
        <label class="flex items-center cursor-pointer">
          <input
            type="radio"
            name="sort"
            class="mr-2 accent-white"
            value="histock"
            v-model="sortOption"
          />
          Highest quantity in stock
        </label>
        <label class="flex items-center cursor-pointer">
          <input
            type="radio"
            name="sort"
            class="mr-2 accent-white"
            value="lowstock"
            v-model="sortOption"
          />
          Lowest quantity in stock
        </label>
      </div>
    </div>
    <div class="flex-1 p-6 bg-gray-50 mt-16">
      <div
        v-if="sortedProducts.length === 0"
        class="text-center text-gray-500 text-lg py-10 "
      >
        No products available
      </div>
      <div
        v-else
        class="grid grid-cols-5 
        max-[1025px]:grid-cols-3
        max-[426px]:grid-cols-1"
        
      >
        <div
          v-for="item in sortedProducts"
          :key="item.id"
          class="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition max-sm:w-[180px]"
        >
        <div class="flex justify-center ">
          <img
             :src="`/ProductImages/${item.id}.jpg`"
            alt="Product Image"
            class="w-auto h-40 object-cover rounded-md mb-3 bg-center bg-cover"
          />
        </div>
          <h3 class="text-lg font-semibold text-gray-800">
            {{ item.productName }}
          </h3>
          <p class="text-gray-600">Price: ฿{{ item.price.toLocaleString() }}</p>
          <p class="text-gray-500 mb-4">In stock: {{ item.quantityInStock }}</p>
          <button
            @click="addItemToCart(item)"
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Add to Cart
          </button>
          <router-link :to="{ name: 'Products', params: { id: item.id } }">
            <button
              class="mt-2 w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
            >
              View Product
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
