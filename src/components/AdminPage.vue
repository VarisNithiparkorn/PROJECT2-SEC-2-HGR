<script setup>
import { onMounted, ref } from "vue";
import ListModel from "./ListModel.vue";
import { addItem, deleteItemById, getItems,editItem } from "@/libs/fetchUtils";
import ProductForm from "./ProductForm.vue";
const products = ref([]);

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
const showAddProductForm = ref(true);

onMounted(async () => {
  try {
    products.value = await getItems(`${import.meta.env.VITE_APP_URL}/products`);
    console.log(products.value);
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
    isAdding.value = true;
  } catch (error) {
    console.log(error);
  }
  isAdding.value = false;
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
  currentProduct.value = { productName: "", price: 0 };
};
const setEditProduct = (product) => {
  currentProduct.value = product;
  isEditing.value = true;
};
</script>

<template>
  <div>
    <div class="p-8 flex justify-end" v-if="!isAdding && !isEditing">
      <button class="btn btn-primary" @click="isAdding = !isAdding">Add</button>
    </div>

    <div class="mt-12" v-if="isAdding || isEditing">
      <ProductForm
        @add-new-product="addNewProduct"
        :activeProduct="currentProduct"
        @edit-product="updateProductInfo"
      />
    </div>

    <div
      class="w-full mt-6 flex justify-center items-center"
      v-if="!isAdding && !isEditing"
    >
      <ListModel :items="products">
        <template #item="{ item: product }">
          <div
            class="w-[900px] flex flex-col items-center border-2 mb-4 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div class="flex w-full justify-between items-center mb-4">
              <div class="flex items-center">
                <img
                  :src="`/ProductImages/product${product.id}.jpg`"
                  class="w-24 h-24 max-sm:w-20 max-sm:h-20 rounded-md"
                />
                <div class="ml-4">
                  <h1 class="text-xl font-semibold">{{ product.productName }}</h1>
                  <p class="text-sm text-gray-600">ID: {{ product.id }}</p>
                  <p class="text-sm text-gray-600">Price: ${{ product.price }}</p>
                  <p class="text-sm text-gray-600">In Stock: {{ product.quantityInStock }}</p>
                  <p class="text-sm text-gray-600">Type: {{ product.type}}</p>
                </div>
              </div>

              <div class="flex flex-col items-center">
                <button
                  class="btn btn-active w-full mb-2"
                  @click="setEditProduct(product)"
                >
                  Edit
                </button>
                <label
                  :for="`modal_${product.id}`"
                  class="btn bg-red-500 w-full"
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
                  <button
                    class="btn btn-error"
                    @click="removeProduct(product.id)"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ListModel>
    </div>
  </div>
</template>

