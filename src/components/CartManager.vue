<script setup>
import CartView from "./CartView.vue";
import { ref } from "vue";

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


</script>

<template>
  <router-link :to="{ name: 'Home' }">
    <button class="text-xl p-4 cursor-pointer" @click="back">Back</button>
  </router-link>
  <CartView
    @edit-cart="editCart"
    :showRemoveButton="showRemoveButton"
    :userId="props.userId"
    page="cart"
  >
    <template #button>
      <router-link :to="{ name: 'Payment' }">
        <button class="btn btn-active btn-primary max-sm:w-16" @click="payment">
          Purchase
        </button>
      </router-link>
    </template>
  </CartView>
</template>

<style scoped></style>
