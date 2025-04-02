<script setup>
import { ref, computed, onMounted } from "vue";
import { getItemById, editItem } from "@/libs/fetchUtils";
import ListCartItem from "./ListCartItem.vue";
import { useCarts } from "@/stores/Carts";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const myCart = useCarts();
const { initCart, updateProductInCart} = myCart;
const { carts,calculateTotalPrice  } = storeToRefs(myCart);
const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});
const users = ref([]);

const userAddress = computed(() => {
  let address;
  users.value.find((u) => {
    if (u.id === props.userId) {
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
    const emptyCart = await editItem(
      `${import.meta.env.VITE_APP_URL}/carts`,
      cartId,
      {
        products: [],
      }
    );
    updateProductInCart(cartId, emptyCart);
    isCustomerBuyProducts.value = true;
  } catch (error) {
    console.log(error);
  }
};
const profileSetting = () => {
  router.push({ name: "Profile", params: { userId: props.userId } });
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

      <div class="w-full flex flex-col justify-center items-center pl-4">
        <div class="flex w-[900px] mt-5 max-sm:w-72 max-lg:w-[650px]">
          <p class="font-bold text-xl max-sm:text-base">Address</p>
        </div>
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <div
          class="shadow-2xl rounded-2xl w-[900px] h-[120px] p-5 max-sm:p-2 flex justify-between mt-4 max-sm:w-72 max-sm:h-[99px] max-lg:w-[650px] relative"
        >
          <h1 class="p-5">{{ userAddress }}</h1>

          <p
            class="cursor-pointer p-2 pr-4 underline text-blue-300"
            @click="profileSetting"
          >
            edit
          </p>
        </div>
      </div>
      <div class="w-full flex flex-col justify-center items-center pl-4">
        <div class="flex w-[900px] mt-5 max-sm:w-72 max-lg:w-[650px]">
          <p class="font-bold text-xl max-sm:text-base">Order details</p>
        </div>
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <ListCartItem :userId="props.userId" page="payment" :carts="carts" />
      </div>
      <div class="flex w-full justify-center">
        <div
          class="mb-5 max-sm:w-[300px] max-lg:w-[650px] max-xl:w-[900px] max-2xl:w-[900px] flex justify-end items-end mt-6 max-sm:mr-4 max-lg:m max-md:mr-20 max-[2561px]:w-[900px]"
        >
        <p class="font-bold text-xl max-sm:text-base mr-2">Total : {{ calculateTotalPrice.toLocaleString() }} ฿</p>
      </div>
      </div>
      <div class="w-full flex flex-col justify-center items-center pl-4">
        <div class="flex w-[900px] mt-5 max-sm:w-72 max-lg:w-[650px]">
          <p class="font-bold text-xl max-sm:text-base">Payment</p>
        </div>
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <div
          class="shadow-2xl rounded-2xl w-[900px] h-[120px] p-5 max-sm:p-2 flex justify-between mt-4 max-sm:w-72 max-sm:h-[99px] max-lg:w-[650px] relative"
        >
          <h1 class="p-2">Payment method</h1>
        </div>
      </div>
      <div class="flex w-full justify-center">
        <div
          class="mb-5 max-sm:w-[300px] max-lg:w-[650px] max-xl:w-[900px] max-2xl:w-[900px] flex justify-end items-end mt-6 max-sm:mr-4 max-lg:m max-md:mr-20 max-[2561px]:w-[900px]"
        >
          <button
            class="btn btn-active btn-primary max-sm:w-16 mb-5"
            @click="buyProducts"
          >
            Order
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
