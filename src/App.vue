<script setup>

import Homepage from './components/Homepage.vue';
import { RouterLink } from 'vue-router';
import { RouterView } from 'vue-router';
import UserAccountManger from './components/UserAccountManger.vue';


</script>

<template>

  <!-- <router-view :userId="1"></router-view> -->
   <UserAccountManger></UserAccountManger>
</template>