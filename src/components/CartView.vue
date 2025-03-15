<script setup>
import { computed, onMounted, ref } from "vue";
import CartItem from "./CartItem.vue";
import { editItem, getItemById, updateItem } from "@/libs/fetchUtils";
const emit = defineEmits(["editCart"]);
const props = defineProps({
  userId: {
    type: Number,
    required: true,
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
    const status = await editItem(
      `${import.meta.env.VITE_APP_URL}/carts`,
      cid,
      { products: updatedProductInCart }
    );

    if (status === 200) {
      itemInCart.value = itemInCart.value.map((c) => {
        if (c.id === cid) {
          return { ...c, products: updatedProductInCart };
        }
        return c;
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const increaseAmount = async (pid, cid) => {
  try {
    const cart = itemInCart.value.find((c) => c.id === cid);

    const updatedProduct = cart.products.map((p) => {
      if (p.id === pid) {
        return { ...p, amount: p.amount + 1 };
      }
      return p;
    });

    const updateProductAmountStatus = await updateItem(
      `${import.meta.env.VITE_APP_URL}/carts`,
      cid,
      {
        products: updatedProduct,
      }
    );
    if (updateProductAmountStatus === 200) {
      itemInCart.value = itemInCart.value.map((c) =>
        c.id === cid ? { ...c, products: updatedProduct } : c
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const decreaseAmount = async (pid, cid) => {
  const cart = itemInCart.value.find((c) => c.id === cid);

  const updatedProduct = cart.products.map((p) => {
    if (p.id === pid) {
      return {
        ...p,
        amount: p.amount <= 1 ? removeCartItem(pid, cid) : p.amount - 1,
      };
    }
    return p;
  });

  try {
    const updateProductAmountStatus = await updateItem(
      `${import.meta.env.VITE_APP_URL}/carts`,
      cid,
      {
        products: updatedProduct,
      }
    );

    if (updateProductAmountStatus === 200) {
      itemInCart.value = itemInCart.value.map((c) => {
        if (c.id === cid) {
          return { ...c, products: updatedProduct };
        }
        return c;
      });
    }
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
    itemInCart.value = Array.isArray(items) ? items : [items];
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <button class="text-xl p-4 cursor-pointer">Back</button>
  <div v-if="isCartEmpty" class="w-full h-full flex justify-center">
    <h1 class="text-xl text-red-500 mt-20">Cart is empty.</h1>
  </div>
  <div
    class="flex flex-col mb-7 w-full justify-center items-center"
    v-show="!isCartEmpty"
  >
    <CartItem
      :carts="itemInCart"
      :showRemoveButton="showRemoveButton"
      :amount="amount"
      @decrease-amount="decreaseAmount"
      @increase-amount="increaseAmount"
      @remove-cart-item="removeCartItem"
    />
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
        <button class="btn btn-soft mr-3" @click="$emit('editCart')">
          Edit
        </button>
        <button class="btn btn-active btn-primary max-sm:w-16">Purchase</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
