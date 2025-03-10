<script setup>
import {ref} from 'vue'
const emit = defineEmits(['login', 'recieveUserData'])
const props = defineProps({
    user:{
        type:Object,
        require:true
    }
})

const userInfo = ref({})

function buttonClick() {
    const user = {...userInfo.value}
    console.log(user)
    emit('login',user)
}

</script>

<template>
    <div class="max-[2561px]: w-[50%] max-[1441px]:w-[70%] flex flex-col items-center justify-around">
        <div class=" w-full flex flex-col justify-around" v-for="(field,index) in Object.keys(user)" :key="index" >
            <lable class="">
                <slot name="fieldName">
                    {{field}}
                </slot>
            </lable>
        <input class=" border h-10 text-xl w-full pl-2 pb-1.5 pt-2 max-[1981px]:h-[30px] max-[1981px]:text-xs" @input="$emit('recieveUserData')" :id="field">
        </div>
        <slot name="option">

        </slot>
        <div class=" flex flex-col justify-center items-center w-50%">
            <button class=" w-full border pt-1 pb-0.5 pl-2 pr-2 h-full " @click="buttonClick()">
                Login
            </button>
        </div> 
    </div>
</template>

<style scoped>

</style>