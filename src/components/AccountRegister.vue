<script setup>
import InputForm from './InputForm.vue';
import { addItem, getItemByFieldName, getItemById, updateItem} from '@/libs/fetchUtils';
import { computed, ref} from 'vue';
import { useRouter } from 'vue-router';
import InputPopUp from './InputPopUp.vue';

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
            erroeMsg.value = 'Incorrect username or password'
        }else{ 
            if(account.role === 'user'){  
              router.push({name:'Home'})
            }
            if(account.role === 'admin'){
              router.push({name:'admin'})
            }
            loginUser.value = account
        }

    }else if(!isLogin.value){
        const newAccount = {}
        const fieldsName = Object.keys(userInput.value)
        for (let index = 0; index < fieldsName.length; index++) {
            const inputValue = userInput.value[fieldsName[index]] 
            

            if (invalidateInput(fieldsName[index],inputValue)) {
                return
            }else if(fieldsName[index] === 'email' && !inputValue.includes('@gmail.com')){
              erroeMsg.value = 'email format can not use '
                return
            }else if(await dataHasUsed(fieldsName[index])){
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

//reser password module
const head = ref('enter your email')
const passwordHelp = ref(false)
const passwordHelp2 = ref(false)
const confirmPass = ref('')
const inputType = computed(()=>{
  if(passwordHelp.value && !passwordHelp2.value){
    return 'email'
  }else if(passwordHelp.value && passwordHelp2.value){
    console.log('password')
    return 'password'
  }
})
const err = ref('')
const headMsg = ref('')
let forgotPassAcc = []
function showPopUp(){
  passwordHelp.value = true
  headMsg.value = 'Forget your password?'
}
async function checkAccount(emailorPass){
  if(passwordHelp.value && passwordHelp2.value){
    if(emailorPass !== confirmPass.value){
      err.value = 'your password not match'
      confirmPass.value = ''
      return
    }
    const usedPass = await getItemByFieldName(url+'/users','password',emailorPass)
    if(usedPass.length !== 0){
      err.value = 'password has used'
      confirmPass.value = ''
      return
    }
    forgotPassAcc[0].password = emailorPass
    const updatedUser = await updateItem(url+'/users',forgotPassAcc[0].id,forgotPassAcc[0])
    resetForm()
  }
  if(passwordHelp.value && !passwordHelp2.value){
    if(emailorPass === null || emailorPass === undefined || emailorPass.length === 0  || emailorPass === ''){
      err.value = 'please enter your email'
      return
    }
    forgotPassAcc = await getItemByFieldName(url+'/users','email',emailorPass)
    if(forgotPassAcc === null || forgotPassAcc.length === 0){
      err.value = emailorPass + ' does not register yet'
      return
    }
    head.value = 'Create your new password'
    err.value = ''
    passwordHelp2.value = true 
  }
}
function resetForm(){const head = ref('enter your email')
 passwordHelp.value = false
 passwordHelp2.value = false
 confirmPass.value = ''
   err.value = ''
 headMsg.value = ''
 forgotPassAcc.value = []
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
            <p @click="showPopUp" v-show="isLogin" class="text-sm underline cursor-pointer text-gray-500 hover:text-gray-700">
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
  <InputPopUp :enable="passwordHelp" :label="head" :error-msg="err" @confirm="checkAccount" :input-type="inputType">
    <template #back>
      <button  class=" w-[20px] h-[20px]" @click="resetForm">
        <img class=" w-full h-full" src="../assets/return.png">
      </button>
    </template>
    <template #head>
      <h1 class=" text-black font-bold text-2xl mb-4">
        {{ headMsg }}
      </h1>
    </template>
    <template v-slot:confirmPass>
      <input v-show="passwordHelp && passwordHelp2" v-model="confirmPass" type="password"
           class="border w-full p-3 mt-2 rounded-md focus:outline-none focus:ring-4 focus:ring-white shadow-sm">
    </template>
  </InputPopUp>
</div>


  </template>

<style scoped>

</style>