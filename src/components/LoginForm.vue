<script setup>
import InputField from './InputField.vue';
import { ref } from 'vue';
const user ={username:null, password:null}
const requireUserInfo = Object.keys(user)
function assignUser() {
    const userDataName = event.target.id
    const userDataValue =  event.target.value
    if(requireUserInfo.includes(userDataName)){
        user[userDataName] = userDataValue
        console.log(event.target.id +": " + typeof(event.target.value))
    }
}
function hasUser() {
  console.log(user)
}
</script>
 
<template>
    <div>
      <div class=" flex items-center justify-center w-screen h-screen max-[425px]:items-start">
        <div class=" max-[2561px]:max-w-[1980px] max-[2561px]:max-h-[1020px] max-[2561px]:flex-row max-[1981px]:max-w-[1441px] max-[1981px]:max-h-[610px] max-[1441px]:max-w-[1020px] max-[1441px]:max-h-[600px] max-[1025px]:max-w-[800px] max-[1025px]:max-h-[400px] max-[426px]:flex-wrap max-[426px]:max-h-screen flex  w-full h-full border p-4">
          <div class=" w-full border p-4 flex flex-col justify-center items-center h-full max-[426px]:hidden">
            <div class=" flex flex-col w-11/12 h-11/12 border">
              <h1 class=" max-[2561px]:text-8xl max-[1441px]:text-6xl max-[769px]:text-4xl">
                Looking<br>
                Something New
              </h1>
            </div>
          </div>
          <div class=" w-full border p-4 flex flex-col justify-center items-center">
            <div class=" max-[426px]:h-[50%] max-[321px]:h-[30%] flex flex-col w-[70%] h-[80%]  border items-center justify-around max-[769px]:p-8">
              <div class=" h-[180px] w-[180px] max-[1981px]:w-[120px] max-[1981px]:h-[120px] max-[1025px]:w-[80px] max-[1025px]:h-[80px] ">
                <img class=" w-full h-full " src="/src/assets/user.icon.png">
              </div>
                <InputField :user="user" @login="hasUser()" @recieveUserData="assignUser(event)">
                  <template v-slot:fieldName>
 
                  </template>
                  <template #option>
                    <p class=" underline">
                      forget password?
                    </p>
                  </template>
                </InputField>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
 
<style scoped>
 
</style>