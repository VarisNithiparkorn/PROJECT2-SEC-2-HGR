<script setup>
import InputForm from './InputForm.vue';
import { addItem, getItemByFieldName, getItemById} from '@/libs/fetchUtils';
import { ref} from 'vue';
import { useRouter } from 'vue-router';


const url = import.meta.env.VITE_APP_URL
const router = useRouter()
const erroeMsg = ref('')
const emit = defineEmits(['login'])
const isLogin = ref(true)
const serviceEnd = ref(false)
//loged in user
const loginUser = ref({})
//input from user
const userInput = ref({})
//get in put from InputForm
function getUserInput(user) {
    userInput.value = {...user}
}

//authorize user
async function register() {
      try{
        if (isLogin.value) {
        const account = await hasAccount()
        if(account === null){
            console.log('cannot login') 
            erroeMsg.value = 'Incorrect username or password'
        }else{ 
            if(account.role === 'user'){  
              router.push({name:'Home'})
            }
            if(account.role === 'admin'){
              
            }

            console.log('login')
            loginUser.value = account
        }

    }else if(!isLogin.value){
        const newAccount = {}
        const fieldsName = Object.keys(userInput.value)
        for (let index = 0; index < fieldsName.length; index++) {
            const inputValue = userInput.value[fieldsName[index]] 
            

            if (invalidateInput(fieldsName[index],inputValue)) {
                console.log('1')
                return
            }else if(fieldsName[index] === 'email' && !inputValue.includes('@gmail')){
              erroeMsg.value = 'email format can not use '
                console.log('2')
                return
            }else if(await dataHasUsed(fieldsName[index])){
                
                console.log('3')
                return
            }
            newAccount[fieldsName[index]] = inputValue
        }
        if(JSON.stringify(newAccount) === '{}'){
            return
        }
        newAccount.role = 'user'
        newAccount.address = ''
        let newUser =  await addItem(url+'/users',newAccount)
        await addItem(url+'/carts', {products:[],id:newUser.id})
    }
    complete()
      }catch(error){

      }
}

//check if user already has account
async function hasAccount(){
    const userNameCases = await getItemByFieldName(url+'/users','username',userInput.value.username)
    const [usernameCase] = [...userNameCases]
    const emailCases = await getItemByFieldName(url+'/users','email',userInput.value.username)
    const [emailCase] = [...emailCases]
    if(usernameCase === null && usernameCase && undefined && emailCase === null  && emailCase === undefined){
    
        return null
    }else if(usernameCase !==null && usernameCase !== undefined){
        return userInput.value.password === usernameCase.password ? usernameCase : null
    }else if(emailCase !== null && emailCase !== undefined){
            return userInput.value.password === emailCase.password ? emailCase : null
    }else{
        return null
    }
}
//check if input from user can use to create new account
function invalidateInput(field,inputValue) {
    if(inputValue === null || inputValue === undefined || inputValue.length === 0  ){
        erroeMsg.value = 'enter your ' + field
        return true
    }else if(inputValue.includes(' ')){
      erroeMsg.value = 'enter your ' + field
        return true
    }else{
         return false      
    }
}

//check if data from input hasUsed by other user
async function dataHasUsed(field) {
    try {
        const user = await getItemByFieldName(url+'/users',field,userInput.value[field])
        
        if(user === undefined || user === null || JSON.stringify(user) === '{}' || user.length === 0){
            return false
        }else{
            erroeMsg.value = field + ' already in use'
            return true
        }
    } catch (error) {
        console.log('cannot find user' + inputValue + 'by' + field)
    }
}
function changeForm() {
    isLogin.value = !isLogin.value
    erroeMsg.value = ''
}
function complete() {
    emit('login', loginUser.value)
    loginUser.value = {}
   serviceEnd.value = true
   userInput.value = {}
   isLogin.value = true
   serviceEnd.value = false
}
function name(params) {
  
}
</script>

<template>
    <div class="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-500 to-purple-600">
  <div class="max-w-[1020px] max-h-[600px] flex w-full h-full border p-4 rounded-4xl shadow-2xl bg-white">
    <div class="w-full p-4 flex flex-col justify-center items-center h-full hidden sm:flex">
      <div class="flex flex-col w-11/12 h-11/12">
        <h1 class="text-4xl font-bold text-gray-800">
          {{ isLogin ? "WELCOME BACK!!" : "Create your account" }}
        </h1>
        <h1 class="text-2xl text-gray-600">
          {{ isLogin ? "Let's start shopping now" : "To get more discounts now!" }}
        </h1>
      </div>
    </div>
    
    <div class="w-full border flex flex-col justify-center items-center rounded-4xl p-6 bg-white">
      <div class="w-[70%] h-[80%] flex flex-col items-center justify-around p-8">
        <div v-show="isLogin" class="h-[120px] w-[120px]">
          <img class="w-full h-full rounded-full shadow-md" src="/src/assets/user.icon.png">
        </div>

        <InputForm :serviceEnd="serviceEnd" :inputField="isLogin ? {username:null,password:null} : {firstName:null, lastName:null, username:null, password:null, email:null}" @assginData="getUserInput">
          <template #requireNotation>
            <span v-show="!isLogin" class="text-red-500">*</span>
          </template>
          <template #option>
            <p v-show="isLogin" class="text-sm underline cursor-pointer text-gray-500 hover:text-gray-700">
              Forgot password?
            </p>
          </template>
          <template #errorMessage>
            <span class="text-sm text-red-500">{{ erroeMsg }}</span>
          </template>
          <template v-slot:button>
            <button class="text-lg font-semibold w-full border py-2 bg-sky-600 text-white rounded-xl mt-2 hover:bg-sky-700 transition-all duration-300" @click="register">
              {{ isLogin ? 'Login' : 'Sign Up' }}
            </button>
          </template>
          <template v-slot:option2>
            <p @click="changeForm" class="text-center mt-2 text-gray-600 cursor-pointer">
              <span class="text-sm mr-2">{{ isLogin ? "New user?" : "Have an account?" }} </span>
              <span class="text-sm underline text-blue-500 hover:text-blue-700">{{ isLogin ? "Sign up" : "Login" }}</span>
            </p>
          </template>
        </InputForm>
      </div>
    </div>
  </div>
</div>

  </template>

<style scoped>

</style>