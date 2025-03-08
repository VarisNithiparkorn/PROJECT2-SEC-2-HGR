<script setup>
import {ref} from 'vue'
const emit = defineEmits(['login'])
const props = defineProps({
    input_type:{
        validator(value){
            if(value === "text"){
                return "text"
            }else if(value === "password"){
                return "password"
            }
        }
    },
    userField:{
        type:Array,
        require:true
    }
})
const num = 10
const userInfo = ref({})
function assignUser() {
    const propertyName = event.target.id
    if(props.userField.includes(propertyName)){
        userInfo.value[propertyName] = event.target.value
        console.log(event.target.value)
    }
}
function buttonClick() {
    const user = {...userInfo.value}
    console.log(user)
    emit('login','hello')
}

</script>

<template>
    <div>
        <div class=" w-full flex flex-col justify-around" v-for="(field,index) in userField" :key="index" >
            <lable class="">
                <slot name="fieldName">
                    {{field}}
                </slot>
            </lable>
        <input :type="input_type" class=" border h-10 text-xl w-full pl-2 pb-3 pt-2" @input="assignUser($event)" :id="field">
        </div>
        <slot name="option">

        </slot> 
        <div class=" flex flex-col justify-center items-center w-50%">
            <button class=" w-full border p-4" @click="buttonClick()">
                Login
            </button>
        </div>
    </div>
</template>

<style scoped>

</style>