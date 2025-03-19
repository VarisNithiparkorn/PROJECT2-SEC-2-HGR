<script setup>
import { ref } from "vue";

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
    type: Object,
    required: true,
    validator(value) {
      return typeof value === "object";
    },
  },
  showRemoveButton: {
    type: Boolean,
    validator(value) {
      return [true, false].includes(value);
    },
    default: false,
  },
  amount: {
    type: Object,
    required: true,
    validator(value) {
      return typeof value === "object";
    },
  },
});

const popUpConfirmDelete = ref(null);

const showPopUpConfirmDelete = (cartId, productId) => {
  popUpConfirmDelete.value = { cartId, productId };
};

const hidePopUpConfirmDelete = () => {
  popUpConfirmDelete.value = null;
};
</script>

<template>
  <div>
    <div>
      <div
        class="flex flex-col w-full items-center"
        v-for="cart in carts"
        :key="cart.id"
      >
        <div
          class="border-2 w-[900px] flex justify-between mt-4 max-sm:w-72 max-sm:h-[99px] max-lg:w-[650px] relative"
          v-for="product in cart.products"
          :key="product.id"
        >
          <div class="w-1/2">
            <img
              :src="`../../ProductImages/product${product.id}.jpg`"
              class="w-28 h-28 max-sm:w-24 max-sm:h-24"
              alt=""
            />
          </div>
          <div class="w-1/2 flex flex-col items-end mr-5">
            <h1 class="mt-2 max-sm:text-sm">{{ product.productName }}</h1>
            <div class="mt-5 flex">
              <button
                v-show="props.page === 'cart' && popUpConfirmDelete === null "
                class="cursor-pointer bg-red-500 w-4 text-center"
                @click="$emit('decreaseAmount', product.id, cart.id)"
                :disabled="product.amount <= 1"
              >
                -
              </button>
              <h2 class="pl-2 pr-1 text-sm">x {{ amount[product.id] }}</h2>
              <button
                v-show="props.page === 'cart' && popUpConfirmDelete === null"
                class="cursor-pointer bg-blue-500 w-4 text-center"
                @click="$emit('increaseAmount', product.id, cart.id)"
                :disabled="product.amount >= product.quantityInStock"
              >
                +
              </button>
            </div>
            <p class="max-sm:text-sm mt-1">{{ product.price * product.amount }} ฿</p>
          </div>
          <div
            class="flex items-center bg-red-500 cursor-pointer"
            v-if="showRemoveButton"
          >
            <button
              class="p-4 cursor-pointer"
              @click="showPopUpConfirmDelete(cart.id, product.id)"
            >
              X
            </button>
          </div>
          <div
            class="absolute w-72 h-48 p-12 bg-gray-200 flex flex-col justify-center items-center rounded-2xl top-0 left-1/2 transform -translate-x-1/2 z-10"
            v-if="
              popUpConfirmDelete &&
              popUpConfirmDelete.cartId === cart.id &&
              popUpConfirmDelete.productId === product.id
            "
          >
            <p class="text-black">
              Remove {{ product.productName }} from the cart?
            </p>
            <div class="text-black flex gap-2 mt-10">
              <button class="btn btn-active" @click="hidePopUpConfirmDelete">
                Cancel
              </button>
              <button
                class="btn btn-active btn-error"
                @click="$emit('removeCartItem', product.id, cart.id)"
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

<style scoped></style>
