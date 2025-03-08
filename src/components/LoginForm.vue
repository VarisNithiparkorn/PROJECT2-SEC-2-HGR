<script setup>
import { ref } from 'vue';
import InputField from './components/InputField.vue';
const user ={username:null, password:null}
const requireUserInfo = Object.keys(user)
const logInUser = ref({})
function hasUser(user) {
  console.log(user)
}

</script>

<template>
    <div class=" flex flex-col justify-around h-full">
      <div class=" flex items-center justify-center w-screen h-screen">
        <div class=" max-[2561px]:max-w-[1960px] max-[2561px]:max-h-[1260px] max-[2561px]:flex-row max-[1441px]:max-w-[1040px] max-[1441px]:max-h-[610px] flex w-full h-full border p-4">
          <div class=" grow border p-4 flex flex-col justify-center items-center h-full">
            <div class=" flex flex-col w-11/12 h-11/12 border">
              <h1 class=" text-8xl">
                Looking<br>
                Something New
              </h1>
            </div>
          </div>
          <div class=" grow border p-4 flex flex-col justify-center items-center">
            <div class=" flex flex-col h-[80%] w-full border items-center justify-around">
              <div class=" max-w-[160px] max-h-160px min-w-[20px] min-h-[20px] ">
                <img class=" w-full h-full " src="/src/assets/user.icon.png">
              </div>
              <div class=" w-[50%] flex flex-col items-center">
                <InputField :userField="requireUserInfo" @login="hasUser()">
                  <template v-slot="fieldName">

                  </template>
                  <template #option>
                    <p class=" underline">
                      forget password?
                    </p>
                  </template>
                </InputField>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<style scoped>

</style>