<script setup>
import { onMounted, ref } from "vue";
import ListModel from "./ListModel.vue";
import { deleteItemById, getItems } from "@/libs/fetchUtils";
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

onMounted(async () => {
  try {
    products.value = await getItems(`${import.meta.env.VITE_APP_URL}/products`);
    console.log(products.value);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div>
    <div class="p-8 flex justify-end">
      <button class="btn btn-primary">Add</button>
    </div>

    <div class="flex w-full justify-center items-center">
      <ListModel :items="products">
        <template #item="{ item: product }">
          <div class="flex justify-center items-center border-2 mb-3 max-sm:w-[300px] max-lg:w-[710px]">
            <div class="w-[450px] p-8">
              <img
                :src="`/ProductImages/product${product.id}.jpg`"
                class="w-72 h-64 max-sm:w-24 max-sm:h-24"
              />
            </div>
            <div>
              
            </div>
            <div
              class="w-[900px] h-[320px] mb-5 p-8 justify-between max-sm:w-[300px] max-sm:p-3"
            >
              <div class="flex flex-col gap-2 mb-12 max-sm:text-[15px]">
                <h1>ID : {{ product.id }},</h1>
                <h1>Name : {{ product.productName }},</h1>
                <h1>Price : {{ product.price }},</h1>
                <h1>InStock : {{ product.quantityInStock }},</h1>
                <h1>Desc : {{ product.description }},</h1>
                <h1>Type : {{ product.type }}</h1>
              </div>

              <div class="flex gap-3">
                <button class="btn btn-active max-sm:w-12 max-sm:text-[11px]">Edit</button>
                <label :for="`modal_${product.id}`" class="btn bg-red-500 max-sm:w-12 max-sm:text-[11px]"
                  >Remove</label
                >

                <input
                  type="checkbox"
                  :id="`modal_${product.id}`"
                  class="modal-toggle"
                />
                <div class="modal" role="dialog">
                  <div class="modal-box">
                    <h3 class="text-lg font-bold">Confirm Removal</h3>
                    <p class="py-4">
                      Are you sure you want to remove
                      {{ product.productName }}?
                    </p>
                    <div class="modal-action">
                      <label :for="`modal_${product.id}`" class="btn"
                        >Cancel
                      </label>
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
            </div>
          </div>
        </template>
      </ListModel>
    </div>
  </div>
</template>
