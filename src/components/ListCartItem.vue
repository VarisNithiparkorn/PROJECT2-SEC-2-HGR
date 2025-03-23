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
          class="border-2 w-[900px] flex justify-between mt-4 max-sm:w-72 max-sm:h-[99px] max-lg:w-[650px] relative"
          v-for="product in cart.products"
          :key="product.id"
        >
          <div class="w-1/2">
            <img
              :src="`/ProductImages/product${product.id}.jpg`"
              class="w-28 h-28 max-sm:w-24 max-sm:h-24"
            />
          </div>
          <div class="w-1/2 flex flex-col items-end mr-5">
            <h1 class="mt-2 max-sm:text-sm">{{ product.productName }}</h1>
            <div class="mt-5 flex">
              <button
                v-show="props.page === 'cart' && !popUpConfirmDelete"
                class="cursor-pointer bg-red-500 w-4 text-center"
                @click="$emit('decreaseAmount', product.id, cart.id)"
                :disabled="product.amount <= 1"
              >
                -
              </button>
              <h2 class="pl-2 pr-1 text-sm">x {{ product.amount }}</h2>
              <button
                v-show="props.page === 'cart' && !popUpConfirmDelete"
                class="cursor-pointer bg-blue-500 w-4 text-center"
                @click="$emit('increaseAmount', product.id, cart.id)"
                :disabled="product.amount >= product.quantityInStock"
              >
                +
              </button>
            </div>
            <p class="max-sm:text-sm mt-1">
              {{ product.price * product.amount }} ฿
            </p>
          </div>
          <div
            class="flex items-center bg-red-500 cursor-pointer"
            v-if="showRemoveButton"
          >
            <label
              :for="`remove_modal_${cart.id}_${product.id}`"
              class="p-4 cursor-pointer"
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
