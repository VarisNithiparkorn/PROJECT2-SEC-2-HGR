<script setup>

const emit = defineEmits([
  "removeCartItem",
  "increaseAmount",
  "decreaseAmount",
]);
const props = defineProps({
  carts: {
    type: Array,
    required: true,
    validator(value) {
      return Array.isArray(value);
    }
  },
  showRemoveButton: {
    type: Boolean,
    required: true,
    validator(value) {
      return [true, false].includes(value);
    },
    default: false,
  },
  amount: {
    type: Object,
    required: true,
    validator(value) {
      return typeof value === 'object';
    }
  }
});
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
          class="border-2 w-[900px] flex justify-between mt-10 max-sm:w-72 max-sm:h-[99px] max-lg:w-[650px]"
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
                class="cursor-pointer bg-red-500 w-4 text-center"
                @click="$emit('decreaseAmount',product.id,cart.id)"
              >
                -
              </button>
              <h2 class="pl-2 pr-1 text-sm">x {{ amount[product.id] }}</h2>
              <button
                class="cursor-pointer bg-blue-500 w-4 text-center"
                @click="$emit('increaseAmount',product.id,cart.id)"
              >
                +
              </button>
            </div>

            <p class="max-sm:text-sm mt-1">{{ product.price }} ฿</p>
          </div>
          <div
            class="flex items-center bg-red-500 cursor-pointer"
            v-if="showRemoveButton"
          >
            <button
              class="p-4 cursor-pointer"
              @click="$emit('removeCartItem', product.id, cart.id)"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
