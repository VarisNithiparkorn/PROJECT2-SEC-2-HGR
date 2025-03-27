<script setup>
import { RouterView } from 'vue-router';
import { onUpdated, ref } from 'vue';
const currentUser = ref({})
function getUser(user) {
  currentUser.value = user
}

</script>

<template>
  <!-- <Homepage :userId="currentUser.id"/> -->
   <router-view @login="getUser" :userId="currentUser.id">
   </router-view>
</template>