<script setup>
import { ref } from "vue";
const emit = defineEmits(["addNewProduct", "editProduct"]);
const props = defineProps({
  activeProduct: {
    type: Object,
  },
});
const newProduct = ref(props.activeProduct);
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-lg px-6">
      <div class="p-8 bg-white shadow-md rounded-md">
        <h2 class="text-2xl text-black font-bold mb-6 text-center">
          {{ newProduct.id === undefined ? "Add Product" : "Edit Product" }}
        </h2>

        <div class="w-full">
          <div>
            <div class="mb-4">
              <label class="text-gray-700 font-medium mb-2">Product Name</label>
              <input
                v-model="newProduct.productName"
                type="text"
                class="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter product name"
              />
            </div>
            <div class="mb-6">
              <label class="text-gray-700 font-medium mb-2">Price</label>
              <input
                v-model.number="newProduct.price"
                type="number"
                class="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div class="mb-6">
              <label class="text-gray-700 font-medium mb-2"
                >QuantityInStock</label
              >
              <input
                v-model.number="newProduct.quantityInStock"
                type="number"
                class="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div class="mb-6">
              <label class="text-gray-700 font-medium mb-2">Description</label>
              <input
                v-model="newProduct.description"
                type="text"
                class="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div class="mb-6">
              <label class="text-gray-700 font-medium mb-2">Type</label>
              <input
                v-model="newProduct.type"
                type="text"
                class="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              v-show="newProduct.id === undefined"
              @click="$emit('addNewProduct', newProduct)"
              class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
            >
              Add Product
            </button>
            <button
              v-show="newProduct.id !== undefined"
              @click="$emit('editProduct', newProduct)"
              class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
            >
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
