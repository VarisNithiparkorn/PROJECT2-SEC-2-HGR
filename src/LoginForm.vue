<script setup>
import InputField from './InputField.vue';
</script>

<template>
    <div>
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
                <InputField>
                  <template v-slot:lable>
                    <p>
                      username:
                    </p>
                  </template>
                </InputField>
                <InputField input_type="password">
                  <template v-slot:lable>
                    <p>
                      password:
                    </p>
                  </template>
                </InputField>
                <div>
                  <p class=" underline">
                    forget password?
                  </p>
                </div>
              </div>
              <div class=" flex flex-col justify-center items-center w-50%">
                <button class=" w-full border p-4">
                  Login
                </button>
                <div>
                  <p class=" underline">
                    signin
                  </p>
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