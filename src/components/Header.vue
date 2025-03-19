<script setup>
import { getItems } from "@/libs/fetchUtils";
import { computed, onMounted, ref, watchEffect } from "vue";
const props = defineProps({
  navBar: {
    validator(value) {
      return ["show", "hide"].includes(value);
    },
    default: "show",
  },
  userId: {
    type: Number,
    required: true,
  },
});
const searchText = ref("");
const products = ref([]);
const productName = ref([]);

const searchMatch = computed(() => {
  return productName.value.filter((p) => {
    if (
      p.charAt(0).toLowerCase() === searchText.value.charAt(0).toLowerCase()
    ) {
      return p.toLowerCase().includes(searchText.value.toLowerCase());
    }
  });
});

const carts = ref([]);
const itemCountInCart = computed(() => {
  let count = 0;
  for (const cart of carts.value) {
    let cartId = Number(cart.id);
    if (props.userId === cartId) {
      cart.products.forEach((p) => {
        count += p.amount;
      });
    }
  }
   return count;
});
onMounted(async () => {
  try {
    const item = await getItems(`${import.meta.env.VITE_APP_URL}/carts`);
    const product = await getItems(`${import.meta.env.VITE_APP_URL}/products`);
    carts.value = Array.isArray(item) ? item : [item];
    products.value = Array.isArray(product) ? product : [product];
    for (const product of products.value) {
      productName.value.push(product.productName);
    }
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div
    :class="
      navBar === 'show'
        ? 'navbar shadow-sm bg-gradient-to-r from-sky-700 to-indigo-700 w-full flex items-center'
        : 'navbar bg-none w-full flex items-center'
    "
  >
    <div class="pl-6" v-show="navBar === 'show'">
      <slot name="logo" class="btn btn-ghost text-xl">Logo</slot>
    </div>
    <!-- search bar -->
    <div class="flex-1 flex justify-center">
      <input
        type="text"
        placeholder="Search"
        class="input input-bordered w-[560px] rounded-full relative"
        :class="
          navBar === 'show'
            ? 'max-sm:w-32 max-sm:h-9 max-lg:w-96 max-md:w-60'
            : 'max-sm:w-72 max-sm:h-9 max-md:w-72 max-lg:w-96 '
        "
        v-model="searchText"
      />
      <div
        v-show="searchText.length"
        class="absolute top-14 w-[530px] bg-white text-black"
        :class="
          navBar === 'show'
            ? 'w-[530px] max-sm:w-28 max-lg:w-[360px]'
            : 'max-sm:w-64 max-lg:w-[360px]'
        "
      >
        <ul>
          <li
            v-for="matchText in searchMatch"
            :key="matchText"
            class="hover:bg-gray-200 pt-1 pb-1 pl-3"
          >
            <a href=""
              ><p>{{ matchText }}</p></a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-none flex items-center">
      <!-- cart -->
      <div
        class="dropdown dropdown-end mr-3 max-2xl:mr-5 max-sm:mr-1"
        v-show="navBar === 'show'"
      >
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="badge badge-sm indicator-item">{{
              itemCountInCart
            }}</span>
          </div>
        </div>
      </div>
      <!-- profile -->
      <div class="dropdown dropdown-end mr-5" v-show="navBar === 'show'">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle avatar max-sm:-mr-5 max-sm:ml-2"
        >
          <div class="w-10 rounded-full">
            <img
              alt="image"
              src="https://static.vecteezy.com/system/resources/previews/020/765/399/original/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-36 p-2 shadow"
        >
          <li><a> Profile </a></li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
