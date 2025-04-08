<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref , onUnmounted} from 'vue';
const emits = defineEmits(['confirm'])
const props = defineProps({
    enable:{
        type:Boolean
    },
    label:{
        type:String,
        require:true
    },
    value:{
        type:String
    },
    errorMsg:{
        type:String,
    },
    inputType:{
        type:String,
        require:false
    }
})
const fieldValue = ref(null)
let oldField = ''
onBeforeUpdate(()=>{
    if(fieldValue.value === null || fieldValue.value === oldField){
        fieldValue.value = props.value
        oldField = fieldValue.value
    }
    if(fieldValue.value !== null && !props.enable){
        fieldValue.value = null
    }
})
function confirmData(){
    emits('confirm',fieldValue.value)
    fieldValue.value = null
}
</script>

<template>
    <div v-show="enable" class="absolute bg-white top-1/2 left-1/2 max-[2561px]:w-[30%] max-[769px]:w-[70%] h-[360px rounded-xl p-6 shadow-2xl transform -translate-x-1/2 -translate-y-1/2">
    <slot name="back">

    </slot>
    <slot name="head">

    </slot>
    <h1 class=" text-black font-bold text-xl mb-4">
        {{ label }}
    </h1>
    <input :type="inputType" v-model="fieldValue "
           class="border w-full p-3 mt-2 rounded-md focus:outline-none text-black focus:ring-4 focus:ring-white shadow-sm border-blue-500">
    <p class="text-red-500 text-sm mt-2">
        {{ errorMsg }}
    </p>
    <slot name="confirmPass">

    </slot>
    <button @click="confirmData" 
            class="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700">
        Save
    </button>
    </div>
</template> 