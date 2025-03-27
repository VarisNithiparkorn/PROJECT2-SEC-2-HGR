<script setup>
import Header from "./Header.vue";
import ProductSection from "./productSection.vue";
import { computed, onMounted, ref } from "vue";
import { getItems } from "@/libs/fetchUtils";
import { useCarts } from "@/stores/Carts";
import { useProducts } from "@/stores/Products";
import { storeToRefs } from "pinia";

const myCarts = useCarts();
const myProducts = useProducts();
const { carts } = storeToRefs(myCarts);
const { products } = storeToRefs(myProducts);
const emit = defineEmits(["login"]);
const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

const cartItemCount = ref(0);

const calculateCartTotal = () => {
  let totalCount = 0;
  carts.value.forEach((cart) => {
    if (cart.id === props.userId) {
      cart.products.forEach((product) => {
        totalCount += parseInt(product.amount || 0);
      });
    }
  });
  cartItemCount.value = totalCount;
};

const cartUpdated = async () => {
  try {
    const items = await getItems(`${import.meta.env.VITE_APP_URL}/carts`);
    carts.value = Array.isArray(items) ? items : [items];
    calculateCartTotal();
  } catch (error) {
    console.error(error);
  }
};

const searchQuery = ref("");

const filteredProducts = computed(() => {
  if (!products.value) return [];
  const search = (
    Array.isArray(searchQuery.value) ? searchQuery.value : [searchQuery.value]
  ).map((text) => String(text).toLowerCase());

  return products.value.filter((product) => {
    const matchSearch =
      !search.length ||
      search.some((text) => product.productName.toLowerCase().includes(text));
    return matchSearch;
  });
});

const searchProduct = (searchValue) => {
  searchQuery.value = searchValue;
};

onMounted(async () => {
  try {
    const getCarts = await getItems(`${import.meta.env.VITE_APP_URL}/carts`);
    carts.value = Array.isArray(getCarts) ? getCarts : [getCarts];

    calculateCartTotal();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <Header
    :userId="props.userId"
    :cartItemCount="cartItemCount"
    @searchProduct="searchProduct"
  />
  <ProductSection
    :searchProduct="filteredProducts"
    :userId="props.userId"
    @cartUpdated="cartUpdated"
  />
</template>
