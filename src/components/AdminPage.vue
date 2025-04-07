<script setup>
import { onMounted, ref } from "vue";
import ListModel from "./ListModel.vue";
import { addItem, deleteItemById, getItems, editItem } from "@/libs/fetchUtils";
import ProductForm from "./ProductForm.vue";
import Header from "./Header.vue";
const products = ref([]);
const props = defineProps({
  aid: {
    type: String,
    required: true,
  },
});
const removeProduct = async (pid) => {
  const removeStatus = await deleteItemById(
    `${import.meta.env.VITE_APP_URL}/products`,
    pid
  );
  if (removeStatus === 200) {
    const removeIndex = products.value.findIndex((p) => p.id === pid);
    products.value.splice(removeIndex, 1);
  }
};

onMounted(async () => {
  try {
    products.value = await getItems(`${import.meta.env.VITE_APP_URL}/products`);
  } catch (error) {
    console.log(error);
  }
});
const isEditing = ref(false);
const isAdding = ref(false);
const currentProduct = ref({ productName: "", price: 0 });

const addNewProduct = async (product) => {
  try {
    const addedItem = await addItem(
      `${import.meta.env.VITE_APP_URL}/products`,
      product
    );
    products.value.push(addedItem);
  } catch (error) {
    console.log(error);
  }
  isAdding.value = false;
  currentProduct.value = {};
};

const cancelAddProduct = () => {
  isAdding.value = false;
  currentProduct.value = {};
};
const updateProductInfo = async (product) => {
  try {
    const editedItem = await editItem(
      `${import.meta.env.VITE_APP_URL}/products`,
      product.id,
      product
    );
    const updatedIndex = myProducts.value.findIndex((item) => {
      item.id === editedItem.id;
    });
    products.value.splice(updatedIndex, 1, editedItem);
  } catch (error) {
    console.log(error);
  }
  isEditing.value = false;
  currentProduct.value = {};
};
const setEditProduct = (product) => {
  currentProduct.value = product;
  isEditing.value = true;
};
</script>

<template>
  <div class="p-8 flex justify-end">
    <router-link to="/">
      <h1 class="text-blue-500 underline">Logout</h1>
    </router-link>
  </div>
  <div>
    <div class="pr-8 flex justify-end" v-if="!isAdding && !isEditing">
      <button class="btn btn-primary" @click="isAdding = !isAdding">Add</button>
    </div>

    <div class="mt-12" v-if="isAdding || isEditing">
      <ProductForm
        @add-new-product="addNewProduct"
        :activeProduct="currentProduct"
        @edit-product="updateProductInfo"
        @cancel-add="cancelAddProduct"
      />
    </div>

    <div
      class="w-full mt-6 flex justify-center items-center"
      v-if="!isAdding && !isEditing"
    >
      <ListModel :items="products">
        <template #item="{ item: product }">
          <div
            class="w-[900px] flex flex-col items-center mb-4 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 max-sm:w-[300px] max-[769px]:w-[600px]"
          >
            <div class="flex w-full justify-between items-center mb-4">
              <div class="flex items-center">
                <img
                  :src="`/ProductImages/${product.id}.jpg`"
                  class="w-24 h-24 max-sm:w-20 max-sm:h-20 rounded-md max-sm:-ml-3"
                />
                <div class="ml-4">
                  <h1 class="text-xl font-semibold max-sm:text-lg">
                    {{ product.productName }}
                  </h1>
                  <p class="text-sm text-gray-600">ID: {{ product.id }}</p>
                  <p class="text-sm text-gray-600">
                    Price: ${{ product.price.toLocaleString() }}
                  </p>
                  <p class="text-sm text-gray-600">
                    In Stock: {{ product.quantityInStock }}
                  </p>
                  <p class="text-sm text-gray-600">
                    Desc: {{ product.description }}
                  </p>
                  <p class="text-sm text-gray-600">Type: {{ product.type }}</p>
                </div>
              </div>

              <div class="flex flex-col items-center">
                <button
                  class="btn btn-active w-full mb-2 max-sm:w-15 max-sm:h-8 max-sm:text-[11px]"
                  @click="setEditProduct(product)"
                >
                  Edit
                </button>
                <label
                  :for="`modal_${product.id}`"
                  class="btn bg-red-500 w-full max-sm:w-15 max-sm:h-8 max-sm:text-[11px]"
                >
                  Remove
                </label>
              </div>
            </div>

            <input
              type="checkbox"
              :id="`modal_${product.id}`"
              class="modal-toggle"
            />
            <div class="modal" role="dialog">
              <div class="modal-box">
                <h3 class="text-lg font-bold">Confirm Removal</h3>
                <p class="py-4">
                  Are you sure you want to remove {{ product.productName }}?
                </p>
                <div class="modal-action">
                  <label :for="`modal_${product.id}`" class="btn">Cancel</label>
                  <label
                    :for="`modal_${product.id}`"
                    class="btn btn-error"
                    @click="removeProduct(product.id)"
                  >
                    Confirm
                  </label>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ListModel>
    </div>
  </div>
</template>
