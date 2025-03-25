<script setup>

import { onMounted } from 'vue';
import ListModel from './ListModel.vue';
import { ref } from 'vue';

</script>
<template>
    <div class=" w-screen h-screen flex-col">
        <div class=" w-[100%] h-[20%] border">

        </div>
        <div class=" w-full h-[50%] border">
            <ListModel :items="userInfo">

            </ListModel> >
        </div>
    </div>
</template>
<style scoped>
</style>