<script setup>
import ListModel from "./ListModel.vue";
const emit = defineEmits([
  "removeCartItem",
  "increaseAmount",
  "decreaseAmount",
]);

const props = defineProps({
  page: {
    type: String,
    required: true,
    validator(value) {
      return ["cart", "payment"].includes(value);
    },
    default: "cart",
  },
  carts: {
    type: Array,
    required: true,
    validator(value) {
      return Array.isArray(value);
    },
  },
  showRemoveButton: {
    type: Boolean,
    validator(value) {
      return [true, false].includes(value);
    },
    default: false,
  },
});
</script>

<template>
  <div>  
    <ListModel class="flex flex-col w-full items-center" :items="carts">
      <template #item="{ item: cart }">
        <div
          class=" shadow-2xl rounded-2xl w-[900px] h-[150px] p-5 max-sm:p-2 flex justify-between mt-4 max-sm:w-72 max-sm:h-[99px] max-lg:w-[650px] relative"
          v-for="product in cart.products"
          :key="product.id"
        >
          <div class="w-1/2 flex">
            <img
              :src="`/ProductImages/${product.id}.jpg`"
              class="w-28 h-28 max-sm:w-14 max-sm:h-14 rounded-2xl"
            />
            <div class="ml-2">
              <h1 class="mt-2 text-[20px] max-sm:text-[9px] max-sm:text-nowrap pl-3 font-bold max-[769px]:text-[15px] max-[769px]:text-nowrap">{{ product.productName }}</h1>
              <h1 class="mt-2 text-[12px] text-gray-500 italic max-sm:text-[4px] pl-3 pb-3 max-[769px]:text-[10px]">{{ product.description }}</h1>
              <h1 class="mt-2 max-sm:text-[10px] pl-3">In Stock: {{ product.quantityInStock}}</h1>
            </div>
          </div>
          <div class="w-1/2 flex flex-col items-end mr-5">
            <div class="mt-2 max-sm:mt-1">
              <div class="flex justify-end mb-3">
                <p class="max-sm:text-[12px] mt-1 font-bold text-lg">
                  {{ (product.price * product.amount).toLocaleString() }} ฿
                </p>
              </div>
              <div class="flex justify-end items-end mt-10">
                <button
                  v-show="props.page === 'cart'"
                  :class="'cursor-pointer bg-red-500 w-4 text-center rounded-md text-white font-bold max-sm:w-5 max-sm:h-5 flex justify-center items-center'"
                  @click="$emit('decreaseAmount', product.id, cart.id)"
                  :disabled="product.amount <= 1"
                >
                  -
                </button>
                <h2 class="pl-2 pr-1 text-sm font-bold max-sm:text-[12px]">x {{ product.amount }}</h2>
                <button
                  v-show="props.page === 'cart'"
                  class="cursor-pointer bg-gradient-to-r from-sky-700 to-indigo-700 w-4 text-center text-white rounded-md max-sm:w-5 max-sm:h-5 flex justify-center items-center"
                  @click="$emit('increaseAmount', product.id, cart.id)"
                  :disabled="product.amount >= product.quantityInStock"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div
            class="flex items-center bg-red-500 cursor-pointer rounded-md max-sm:w-7 justify-center "
            v-if="showRemoveButton"
          >
            <label
              :for="`remove_modal_${cart.id}_${product.id}`"
              class="p-4 cursor-pointer text-white font-bold"
            >
              X
            </label>
          </div>
          <input
            type="checkbox"
            :id="`remove_modal_${cart.id}_${product.id}`"
            class="modal-toggle"
          />
          <div class="modal" role="dialog">
            <div class="modal-box">
              <h3 class="font-bold text-lg">Confirm Removal</h3>
              <p class="py-4">
                Are you sure you want to remove {{ product.productName }} from
                the cart?
              </p>
              <div class="modal-action">
                <button
                  class="btn btn-active btn-error"
                  @click="$emit('removeCartItem', product.id, cart.id)"
                >
                  Confirm
                </button>
                <label
                  :for="`remove_modal_${cart.id}_${product.id}`"
                  class="btn"
                  >Cancel</label
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </ListModel>
  </div>
</template>
