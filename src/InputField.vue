<script setup>
defineProps({
    input_type:{
        validator(value){
            if(value === "text"){
                return "text"
            }else if(value === "password"){
                return "password"
            }
        }
    }
})
</script>

<template>
    <div class=" w-full flex flex-col justify-around">
        <lable class="">
            <slot name="lable">

            </slot>
        </lable>
        <input :type="input_type" class=" border h-10 text-xl w-full pl-2 pb-3 pt-2">
    </div>
</template>

<style scoped>

</style>