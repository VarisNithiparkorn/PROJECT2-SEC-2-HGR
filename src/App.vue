<script setup>
import { RouterLink } from 'vue-router';
import { RouterView } from 'vue-router';
import { onUpdated, ref } from 'vue';
import UserAccountManger from './components/UserAccountManger.vue';
import Homepage from './components/Homepage.vue';
const currentUser = ref({}) 
function getAccount(user){
  currentUser.value = user
}

</script>

<template>
  <!-- <router-view :userId="1"></router-view> -->
   <UserAccountManger @success-auth="getAccount"></UserAccountManger>
   <Homepage :user-id="currentUser.id"></Homepage>
   
</template>