<script setup>
import { RouterView } from 'vue-router';
import { onUpdated, ref } from 'vue';
const currentUser = ref({})
import AdminPage from './components/AdminPage.vue';
function getUser(user) {
  currentUser.value = user
}

</script>

<template>
  <!-- <AdminPage aid="727c"/> -->
    <router-view @login="getUser" :userId="currentUser.id">
    </router-view>
</template>