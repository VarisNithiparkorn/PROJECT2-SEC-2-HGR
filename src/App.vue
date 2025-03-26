<script setup>
import { RouterView } from 'vue-router';
import { onUpdated, ref } from 'vue';
import UserAccountManger from './components/UserAccountManger.vue';
const currentUser = ref({}) 
function getAccount(user){
  currentUser.value = user
  console.log(currentUser.value.firstName)
}
</script>

<template>
  <UserAccountManger @success-auth="getAccount"></UserAccountManger>
  
  <router-view :userId="currentUser.id"></router-view>
   
</template>