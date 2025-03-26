<script setup>
import { ref, computed, onMounted } from "vue";
import { getItemById, editItem } from "@/libs/fetchUtils";
import ListCartItem from "./ListCartItem.vue";
import { useCarts } from "@/stores/Carts";
import { storeToRefs } from "pinia";

const myCart = useCarts();
const { initCart, updateProductInCart } = myCart;
const { carts } = storeToRefs(myCart);
const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});
const users = ref([]);

const userAddress = computed(() => {
  let address;
  users.value.find((u) => {
    if (Number(u.id) === props.userId) {
      address = u.address;
    }
  });
  return address;
});

const isCustomerBuyProducts = ref(false);
const buyProducts = async () => {
  try {
    const cart = carts.value.find((c) => c.id);
    const cartId = cart.id;
    const emptyCart = await editItem(`${import.meta.env.VITE_APP_URL}/carts`, cartId, {
      products: [],
    });
    updateProductInCart(cartId,emptyCart)
    isCustomerBuyProducts.value = true;
  } catch (error) {
    console.log(error);
  }
};
onMounted(async () => {
  try {
    const items = await getItemById(
      `${import.meta.env.VITE_APP_URL}/carts`,
      props.userId
    );
    initCart(items);
    const user = await getItemById(
      `${import.meta.env.VITE_APP_URL}/users`,
      props.userId
    );
    users.value.push(user);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div>
    <div v-if="!isCustomerBuyProducts">
      <router-link :to="{ name: 'Cart' }">
        <button class="text-xl p-4 cursor-pointer" @click="back">Back</button>
      </router-link>
      <div class="w-full flex flex-col justify-center items-center">
        <div
          class="flex border-2 w-[900px] h-[100px] mt-8 max-sm:w-72 max-sm:h-[99px] max-lg:w-[650px]"
        >
          <h1 class="p-5">{{ userAddress }}</h1>
        </div>
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <ListCartItem :userId="props.userId" page="payment" :carts="carts" />
      </div>

      <div class="w-full flex flex-col justify-center items-center">
        <div
          class="flex border-2 w-[900px] h-[100px] mt-5 max-sm:w-72 max-sm:h-[99px] max-lg:w-[650px]"
        >
          <h1 class="p-2">Payment method</h1>
        </div>
      </div>
      <div class="flex w-full justify-center">
        <div
          class="max-sm:w-[300px] max-lg:w-[650px] max-xl:w-[900px] max-2xl:w-[900px] flex justify-end items-end mt-5 max-sm:mr-4 max-lg:m max-md:mr-20"
        >
          <button
            class="btn btn-active btn-primary max-sm:w-16"
            @click="buyProducts"
          >
            Buy
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="isCustomerBuyProducts"
      class="w-full h-[500px] flex justify-center items-center"
    >
      <div class="flex flex-col justify-center items-center">
        <h1 class="font-bold text-green-500 text-3xl">Order completed</h1>
        <router-link :to="{ name: 'Home' }">
          <button class="btn btn-soft mt-20" @click="!isCustomerBuyProducts">
            Back To Homepage
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
