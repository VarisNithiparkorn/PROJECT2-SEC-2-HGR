<script setup>
import {onBeforeUpdate, onMounted, ref,watch} from 'vue'
const emit = defineEmits(['assginData'])
// need field to create input
const props = defineProps({
    inputField:{
        type:Object,
        require:true
    },
    serviceEnd:{
        type:Boolean
    }
})


// to reset inputValue after change mode
onBeforeUpdate(()=>{
    
    data = props.inputField
})

// value from user input
let data = props.inputField

// to set type of input
function setInput(field) {
  if(field !== 'password' ){
    return 'text'
  }else if( field === 'password'){
    return 'password'
  }
}
// assign input value and send to parent component
function combineData() {
    if(event.target.id === 'password'){
        data[event.target.id] = event.target.value.trim()
    }else{
        data[event.target.id] = event.target.value.trim()
    }
    console.log(event.target.id)
    emit('assginData',data)
  }
 
</script>
 
<template>
    <div class=" max-[2561px]:max-[50%] max-[2561px]: mt-[-120px] max-[1981px]:mt-[0px] max-[1441]:w-full">
        <div v-for="(field,index) in Object.keys(data)" :key="index" >
            <label class="max-[1981px]:text-xs text-blue-500" >
                {{ field }}

            </label>
            <slot name="requireNotation">

            </slot>
        <input  :type="setInput(field)" v-model="data[field]"  class=" max-[1981px]:text-xs border w-full rounded-xl p-2 text-blue-500" @input="combineData($event)" :id="field">
        </div>
        <slot name="option">
 
        </slot>
        <div>
            <slot name="errorMessage">

            </slot>
            <slot name="button">

            </slot>
            <slot name="option2">
            </slot>
        </div>
    </div>
</template>
 
<style scoped>
 
</style>