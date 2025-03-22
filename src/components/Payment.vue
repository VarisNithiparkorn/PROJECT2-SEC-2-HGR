<script setup>
import { ref, computed, onMounted } from "vue";
import CartView from "./CartView.vue";
import { getItemById } from "@/libs/fetchUtils";

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});
const itemInCart = ref([]);
const users = ref([]);

const userAddress = computed(() => {
  let address ;
  users.value.find((u) => {
    if(Number(u.id) === props.userId){
      address = u.address
    }
  }); 
  return address
});
onMounted(async () => {
  try {
    const items = await getItemById(
      `${import.meta.env.VITE_APP_URL}/carts`,
      props.userId
    );
    itemInCart.value.push(items);

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
    <div class="w-full flex flex-col justify-center items-center ">
      <div class="flex border-2 w-[900px] h-[100px] mt-8 max-sm:w-72 max-sm:h-[99px] max-lg:w-[650px]">
        <h1 class="p-5">{{ userAddress }}</h1>
      </div>
    </div>
    <CartView :userId="props.userId" page="payment">
      <template #payment>
        <div class="w-full flex justify-center mt-8 max-sm:w-72 max-sm:h-[99px] max-lg:w-[650px]">
          <div class="flex border-2 w-[900px] h-[100px] p-5">
            <h1 class="p-2">Payment method</h1>
          </div>
        </div>
      </template>
      <template #button>
        <button class="btn btn-active btn-primary max-sm:w-16">Buy</button>
      </template>
    </CartView>
  </div>
</template>

<style scoped></style>
