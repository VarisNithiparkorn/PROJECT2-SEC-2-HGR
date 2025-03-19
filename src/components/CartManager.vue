<script setup>
import CartView from "./CartView.vue";
import { ref } from "vue";

const showRemoveButton = ref(false);
const props = defineProps({
  userId: {
    type: Number,
    required: true,
  }
});
const editCart = () => {
  showRemoveButton.value = !showRemoveButton.value;
};
</script>

<template>
  <button class="text-xl p-4 cursor-pointer">Back</button>

  <CartView
    @edit-cart="editCart"
    :showRemoveButton="showRemoveButton"
    :userId="props.userId"
    page="cart"
  />
  
</template>

<style scoped></style>
