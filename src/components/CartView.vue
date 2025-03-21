<script setup>
import { computed, onMounted, ref } from "vue";
import ListCartItem from "./ListCartItem.vue";
import { editItem, getItemById, updateItem } from "@/libs/fetchUtils";
const emit = defineEmits(["editCart"]);
const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
  page: {
    type: String,
    required: true,
    validator(value) {
      return ["cart", "payment"].includes(value);
    },
    default: "cart",
  },
  showRemoveButton: {
    type: Boolean,
    required: true,
    validator(value) {
      return [true, false].includes(value);
    },
    default: false,
  },
});
const itemInCart = ref([]);

const totalPrice = computed(() => {
  let price = 0;
  for (const item of itemInCart.value) {
    item.products.forEach((p) => {
      price += p.price * p.amount;
    });
    return price;
  }
});

const productAmount = ref({});
const amount = computed(() => {
  for (const item of itemInCart.value) {
    item.products.forEach((p) => {
      productAmount[p.id] = p.amount;
    });
  }
  return productAmount;
});

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

    const updatedIndex = itemInCart.value.findIndex((item) => item.id === cid);
    itemInCart.value.splice(updatedIndex, 1, updatedCart);
  } catch (error) {
    console.log(error);
  }
};

const increaseAmount = async (pid, cid) => {
  try {
    const cart = itemInCart.value.find((c) => c.id === cid);

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
    const updatedIndex = itemInCart.value.findIndex((item) => item.id === cid);
    itemInCart.value.splice(updatedIndex, 1, updatedProductAmount);
  } catch (error) {
    console.log(error);
  }
};

const decreaseAmount = async (pid, cid) => {
  try {
    const cart = itemInCart.value.find((c) => c.id === cid);
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

    const updatedIndex = itemInCart.value.findIndex((item) => item.id === cid);
    itemInCart.value.splice(updatedIndex, 1, updatedProductAmount);
  } catch (error) {
    console.log(error);
  }
};
const isCartEmpty = computed(() => {
  return totalPrice.value <= 0;
});

onMounted(async () => {
  try {
    const items = await getItemById(
      `${import.meta.env.VITE_APP_URL}/carts`,
      props.userId
    );
    itemInCart.value.push(items);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div v-if="isCartEmpty" class="w-full h-full flex justify-center">
    <h1 class="text-xl text-red-500 mt-20">Cart is empty.</h1>
  </div>
  <div
    class="flex flex-col mb-7 w-full justify-center items-center"
    v-show="!isCartEmpty"
  >
    <ListCartItem
      :carts="itemInCart"
      :showRemoveButton="showRemoveButton"
      :amount="amount"
      :page="props.page"
      @decrease-amount="decreaseAmount"
      @increase-amount="increaseAmount"
      @remove-cart-item="removeCartItem"
    />
    <slot name="payment">

    </slot>
    <div>
      <div
        class="w-[1190px] max-lg:w-[650px] max-2xl:w-[900px] flex justify-end mt-16 max-sm:w-[300px] max-xl:w-[900px]"
      >
        <p class="text-lg font-bold max-sm:mr-2">
          totalPrice : ฿ {{ totalPrice }}
        </p>
      </div>
    </div>
    <div class="flex w-full justify-center">
      <div
        class="max-sm:w-[300px] max-lg:w-[650px] max-xl:w-[900px] max-2xl:w-[900px] flex justify-end items-end mt-5 max-sm:mr-4 max-lg:m max-md:mr-20"
      >
        <button
          class="btn btn-soft mr-3"
          @click="$emit('editCart')"
          v-show="props.page === 'cart'"
        >
          Edit
        </button>
        <slot name="button"> </slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
