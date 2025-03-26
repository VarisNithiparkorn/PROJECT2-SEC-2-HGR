import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed } from "vue";

export const useCarts = defineStore("carts", () => {
  const carts = ref([]);

  const initCart = (cart,userId) => {
    carts.value.filter(c =>{
      if(c.id === userId){
      c.push(cart)
    }   
    })
     

  };
  const calculateTotalPrice = computed(() => {
    return carts.value.reduce((price, cart) => {
      return (
        price +
        cart.products.reduce((total, p) => {
          return total + p.price * p.amount;
        }, 0)
      );
    }, 0);
  });

  const updateProductInCart = (cartId, updatedProduct) => {
    const updatedIndex = carts.value.findIndex((c) => c.id === cartId);
    carts.value.splice(updatedIndex, 1, updatedProduct);
  };

  return { initCart, updateProductInCart, carts, calculateTotalPrice };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCarts, import.meta.hot));
}
