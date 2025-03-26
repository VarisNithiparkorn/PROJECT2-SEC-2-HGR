<script setup>
import { computed, onMounted, ref } from "vue";
import ListCartItem from "./ListCartItem.vue";
import { editItem, getItemById, updateItem } from "@/libs/fetchUtils";
import { useCarts } from "@/stores/Carts";
import { storeToRefs } from "pinia";
import { onUpdated } from "vue";
const myCart = useCarts();
const { initCart, updateProductInCart } = myCart;
const { carts,calculateTotalPrice } = storeToRefs(myCart);
const emit = defineEmits(["editCart"]);
const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});
const showRemoveButton = ref(false);
const editCart = () => {
  showRemoveButton.value = !showRemoveButton.value;
};

const removeCartItem = async (pid, cid) => {
  try {
    const cart = await getItemById(
      `${import.meta.env.VITE_APP_URL}/carts`,
      cid
    );
    const updatedProductInCart = cart.products.filter((p) => p.id !== pid);
    const updatedCart = await editItem(
      `${import.meta.env.VITE_APP_URL}/carts`,
      cid,
      { products: updatedProductInCart }
    );
    updateProductInCart(cid, updatedCart);
    showRemoveButton.value = false
  } catch (error) {
    console.log(error);
  }
};

const increaseAmount = async (pid, cid) => {
  try {
    const cart = carts.value.find((c) => c.id === cid);

    const updateProductAmount = cart.products.map((p) => {
      if (p.id === pid) {
        return { ...p, amount: p.amount + 1 };
      }
      return p;
    });

    const updatedProductAmount = await updateItem(
      `${import.meta.env.VITE_APP_URL}/carts`,
      cid,
      {
        products: updateProductAmount,
      }
    );
    updateProductInCart(cid, updatedProductAmount);
  } catch (error) {
    console.log(error);
  }
};

const decreaseAmount = async (pid, cid) => {
  try {
    const cart = carts.value.find((c) => c.id === cid);
    const updateProductAmount = cart.products.map((p) => {
      if (p.id === pid) {
        return {
          ...p,
          amount: p.amount > 1 ? p.amount - 1 : p.amount,
        };
      }
      return p;
    });
    const updatedProductAmount = await updateItem(
      `${import.meta.env.VITE_APP_URL}/carts`,
      cid,
      {
        products: updateProductAmount,
      }
    );

    updateProductInCart(cid, updatedProductAmount);
  } catch (error) {
    console.log(error);
  }
};
const isCartEmpty = computed(() => {
  return calculateTotalPrice.value <= 0;
});

onMounted(async () => {
  try {
    const cart = await getItemById(
      `${import.meta.env.VITE_APP_URL}/carts`,
      props.userId
    );
    initCart(cart)
  } catch (error) {
    console.log(error);
  }
});

</script>

<template>
  <router-link :to="{ name: 'Home' }">
    <button class="text-xl p-4 cursor-pointer" @click="back">Back</button>
  </router-link>
  <div v-if="isCartEmpty" class="w-full h-full flex justify-center">
    <h1 class="text-xl text-red-500 mt-20">Cart is empty.</h1>
  </div>
  <div
    class="flex flex-col mb-7 w-full justify-center items-center"
    v-show="!isCartEmpty"
  >
    <ListCartItem
      :carts="carts"
      :showRemoveButton="showRemoveButton"
      :page="props.page"
      @decrease-amount="decreaseAmount"
      @increase-amount="increaseAmount"
      @remove-cart-item="removeCartItem"
    />
    <div>
      <div
        class="w-[1190px] max-lg:w-[650px] max-2xl:w-[900px] flex justify-end mt-16 max-sm:w-[300px] max-xl:w-[900px]"
      >
        <p class="text-lg font-bold max-sm:mr-2">
          Total Price : ฿ {{ calculateTotalPrice }}
        </p>
      </div>
    </div>
    <div class="flex w-full justify-center">
      <div
        class="max-sm:w-[300px] max-lg:w-[650px] max-xl:w-[900px] max-2xl:w-[900px] flex justify-end items-end mt-5 max-sm:mr-4 max-lg:m max-md:mr-20"
      >
        <button class="btn btn-soft mr-3" @click="editCart">Edit</button>
        <router-link :to="{ name: 'Payment' }">
          <button
            class="btn btn-active btn-primary max-sm:w-16"
            @click="payment"
          >
            Purchase
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
