<script setup>
import CartView from "./CartView.vue";
import { ref } from "vue";
import Payment from "./Payment.vue";

const showRemoveButton = ref(false);
const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});
const editCart = () => {
  showRemoveButton.value = !showRemoveButton.value;
};

const paymentPage = ref(false)
const payment = () =>{
  return paymentPage.value = true
}
const back = () =>{
  paymentPage.value = false
}
</script>

<template>
  <button class="text-xl p-4 cursor-pointer" @click="back">Back</button>
  <CartView
    @edit-cart="editCart"
    :showRemoveButton="showRemoveButton"
    :userId="props.userId"
    page="cart"
    v-if="!paymentPage"
  >
    <template #button>
      <button class="btn btn-active btn-primary max-sm:w-16" @click="payment">Purchase</button>
    </template>
  </CartView>
  <Payment :userId="1" v-else/>
</template>

<style scoped></style>
