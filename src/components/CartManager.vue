<script setup>
import CartList from "./CartView.vue";
import { ref } from "vue";

const showRemoveButton = ref(false);
const props = defineProps({
    userId:{
        type:Number,
        required:true
    }
});
const editCart = () => {
  showRemoveButton.value = !showRemoveButton.value;
};

</script>

<template>
  <CartList
    @edit-cart="editCart"
    :showRemoveButton="showRemoveButton"
    :userId="props.userId"
  />
</template>

<style scoped></style>
