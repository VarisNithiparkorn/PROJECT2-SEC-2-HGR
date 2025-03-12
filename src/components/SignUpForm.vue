<script setup>
import UserInput from './UserInput.vue';
const user = {firstName:null, lastName:null, username:null, password:null, email:null}
</script>
<template>
    <div>
        <div class= "w-screen h-screen flex flex-col items-center justify-center">
            <div class=" w-[30%] h-[60%] flex flex-row flex-wrap items-center justify-center border">
                <h2 class="text-4xl w-full text-center">
                Sign up
            </h2>
            <UserInput :user="user">

            </UserInput>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>