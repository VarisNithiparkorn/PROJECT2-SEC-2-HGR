import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useProducts = defineStore("products", () => {
  const products= ref([]);

  const initProduct = (product) => {
    products.value = product
  };

  return { initProduct,products };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProducts, import.meta.hot));
}
