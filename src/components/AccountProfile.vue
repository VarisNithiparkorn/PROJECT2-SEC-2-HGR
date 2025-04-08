<script setup>
import { getItemByFieldName, getItemById, updateItem } from '@/libs/fetchUtils';
import { onBeforeUpdate, onMounted, onUnmounted, watch } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import InputPopUp from './InputPopUp.vue';
const selectedField =  ref('')
const selectedFieldValue =  ref('')
const isEdit = ref(false)
const param = useRoute()
const selectedUser = ref(null)
const usedAcc = ref(null)
const errorMsg = ref('')
onMounted( async ()=>{
    selectedUser.value = await getItemById(import.meta.env.VITE_APP_URL+'/users',param.params.userId)
})

function setField(){
    selectedField.value = event.target.id
    selectedFieldValue.value = selectedUser.value[selectedField.value]
    isEdit.value =  !isEdit.value
}

async function editAccountInfo(selectedFieldValue){
    try{
        const input = selectedFieldValue.trim()
        const usedAcc = await getItemByFieldName(import.meta.env.VITE_APP_URL+'/users',selectedField.value,input)
        if(input.length === 0 ){
            errorMsg.value = 'your ' + selectedField.value + ' can not be empty'
            return
        }
        if(usedAcc !== null && usedAcc.length !== 0 && usedAcc[0].id !== selectedUser.value.id && (selectedField.value !== 'address'&& selectedField.value !== 'email')){
            errorMsg.value =  selectedField.value +' '+ input +  ' has already used'
            return     
        }
        if(usedAcc !== null && usedAcc.length !== 0 && usedAcc[0].id === selectedUser.value.id && usedAcc[0][selectedField.value] === input){
            resetform()
            return
        }
        if((usedAcc === null || usedAcc.length === 0) && selectedField.value === 'email'){
            const isCorrectForm = input.includes('@gmail.com')
            if(!isCorrectForm){
                errorMsg.value = selectedField.value + ' is incorrect format'
                return
            }
        }
        selectedUser.value[selectedField.value] = input
        const updatedUser = await updateItem(import.meta.env.VITE_APP_URL+'/users',selectedUser.value.id,selectedUser.value)
        selectedUser.value = updatedUser
        resetform()
    }catch(error){
        console.log(error)
    }
}
function resetform() {
    errorMsg.value = ''
    isEdit.value = false
    selectedFieldValue.value = ''
    selectedField.value = ''
}
</script>
<template>
<div class="relative w-screen h-screen flex flex-col bg-gray-100">
    <!-- Profile Header -->
    <div class="flex justify-center items-center w-full h-[20%] border-b bg-white shadow-md">
        <div class="cursor-pointer border p-2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg hover:scale-105 transition-all">
            <img class="w-full h-full object-cover" src="../assets/user.icon.png">
        </div>
    </div>

    <!-- User Information Section -->
    <div class="flex justify-center bg-blue-500 w-full h-[70%]">
        <div class="w-[50%] h-full bg-white border shadow-md p-4 rounded-xl flex flex-col">
            <div class="ml-4 mt-2 space-y-3" v-for="(value, key) in selectedUser" :key="key">
                <label class="flex items-center text-gray-700 font-medium" v-if="key !== 'id' && key !== 'role' && key !== 'password'">
                    {{ key }}
                    <div class="ml-4 w-[18px] h-[18px] cursor-pointer hover:opacity-80 transition-all" @click="setField($event)">
                        <img :id="key" class="w-full h-full" src="../assets/edit_icon.svg">
                    </div>
                </label>
                <p class="text-gray-600 overflow-hidden w-[100%]" v-if="key !== 'id' && key !== 'role' && key !== 'password'">
                    {{ value }}
                </p>
            </div>
        </div>
    </div>
    <InputPopUp @confirm="editAccountInfo" :enable="isEdit" :label="selectedField" :value="selectedFieldValue" :error-msg="errorMsg">
    </InputPopUp>
    
    <!-- <div v-show="isEdit" class="absolute top-1/2 left-1/2 max-[2561px]:w-[30%] max-[769px]:w-[70%] h-[360px] bg-amber-600 rounded-xl p-6 shadow-2xl transform -translate-x-1/2 -translate-y-1/2">
    <h1 class="text-white font-bold text-xl mb-4">
        {{ selectedField }}
    </h1>
    <input v-model="selectedFieldValue" 
           class="border w-full p-3 mt-2 rounded-md focus:outline-none focus:ring-4 focus:ring-white shadow-sm">
    <p class="text-red-500 text-sm mt-2">
        {{ errorMsg }}
    </p>
    <button @click="editAccountInfo" 
            class="mt-4 w-full bg-white text-amber-600 font-semibold py-2 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-amber-500 hover:text-white">
        Save
    </button>
    </div> -->
</div>


</template>
<style scoped>
</style>