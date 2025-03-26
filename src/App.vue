<script setup>
import { RouterView } from 'vue-router';
import { onUpdated, ref } from 'vue';

import Homepage from './components/Homepage.vue';
import CreateOrAuthAccount from './components/CreateOrAuthAccount.vue';
const currentUser = ref({}) 
const currentAccount = ref({})
function setAccount(loginAcc) {
    currentAccount.value = loginAcc
    emit('successAuth',currentAccount.value)
  }
</script>

<template>
  <!-- <Homepage :userId="currentUser.id"/> -->
  <router-view :userId="currentUser.id"></router-view>
   
</template>