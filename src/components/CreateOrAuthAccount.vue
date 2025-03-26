<script setup>
import InputForm from './InputForm.vue';
import { addItem, getItemByFieldName, getItemById} from '@/libs/fetchUtils';
import { ref, defineProps , defineEmits} from 'vue';
const url = import.meta.env.VITE_APP_URL
const props = defineProps({
    hasUser:{
        type:Boolean,
        default:true
    }
})
const erroeMsg = ref('')
const emit = defineEmits((['login']))
const isLogin = ref(props.hasUser)
const serviceEnd = ref(false)
//loged in user
const loginUser = ref({})
//input from user
const userInput = ref({})
//get in put from InputForm
function getUserInput(user) {
    userInput.value = {...user}
}
//encrypt password of user
function encryptPassword(){
    let encpytedPassWord = ''
    for (let index = 0; index < userInput.value.password.length; index++) {
         if(userInput.value.password[index] === userInput.value.password[index].toUpperCase()){
             encpytedPassWord = encpytedPassWord + userInput.value.password[index].toLowerCase()
         }else if(userInput.value.password[index] === userInput.value.password[index].toLowerCase()){
             encpytedPassWord = encpytedPassWord + userInput.value.password[index].toUpperCase()
         }
    }
    if(encpytedPassWord !== null && encpytedPassWord !== undefined && encpytedPassWord.length !== 0){
            console.log(encpytedPassWord)
         }
}
//authorize user
async function register() {
    if (isLogin.value) {
        const account = await hasAccount()
        if(account === null){
            console.log('cannot login') 
            erroeMsg.value = 'Incorrect username or password'
        }else{
            console.log('login')
            loginUser.value = account
            const cart = await getItemById(url+"/carts", loginUser.value.id)
            if(cart === null || cart === undefined){
              cart = await addItem(url+'/carts', {products:[],id:loginUser.value.id})
            }
            console.log(cart)
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
        const addedAccount = await addItem(url+'/users',newAccount)
    }
    complete()
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
  emit('login',loginUser.value)

   serviceEnd.value = true
   loginUser.value = {}
   userInput.value = {}
   serviceEnd.value = false
}
</script>

<template>
    <div>
      <div class=" flex items-center justify-center w-screen h-screen max-[425px]:items-start">
        <div class=" max-[2561px]:max-w-[1980px] max-[2561px]:max-h-[1020px] max-[2561px]:flex-row max-[1981px]:max-w-[1441px] max-[1981px]:max-h-[610px] max-[1441px]:max-w-[1020px] max-[1441px]:max-h-[600px] max-[1025px]:max-w-[800px] max-[1025px]:max-h-[400px] max-[426px]:flex-wrap max-[426px]:max-h-screen max-[426px]:border-none flex  w-full h-full border p-4 rounded-4xl ">
          <div class="w-full  p-4 flex flex-col justify-center items-center h-full max-[426px]:hidden">
            <div class=" flex flex-col w-11/12 h-11/12">
              <h1 class=" max-[2561px]:text-6xl max-[1441px]:text-4xl max-[769px]:text-2xl">
                {{ isLogin ? "WELCOME BACK!!": 'Create your account '}}
              </h1>
              <h1 class=" max-[2561px]:text-6xl max-[1441px]:text-4xl max-[769px]:text-2xl">
                {{ isLogin ? "Let's start shopping now": 'to get more dicount now!' }}
              </h1>
              
            </div>
          </div>
          <div  class="max-[426px]:border-none w-full border flex flex-col justify-center items-center rounded-4xl">
            <div class=" max-[426px]:h-[70%] max-[426px]:border max-[426px]:rounded-4xl flex flex-col w-[70%] h-[80%] items-center justify-around max-[769px]:p-8">
              <div v-show="isLogin" class=" h-[180px] w-[180px] max-[1981px]:w-[100px] max-[1981px]:h-[100px]  max-[321px]:h-[60px] max-[321px]:w-[60px] ">
                <img class=" w-full h-full " src="/src/assets/user.icon.png">
              </div>
                <InputForm :serviceEnd="serviceEnd" :inputField=" isLogin ? {username:null,password:null}:{firstName:null, lastName:null, username:null, password:null, email:null}" @assginData="getUserInput">
                  <template #requireNotation>
                    <span v-show="!isLogin" class=" text-red-500">
                      *
                    </span>
                  </template>
                  <template #option>
                    <p v-show="isLogin" class="max-[1981px]:text-xs underline">
                      forget password?
                    </p>
                  </template>
                  <template #errorMessage>
                    <span class=" max-[1981px]:text-xs text-red-500">
                      {{ erroeMsg }}
                    </span>
                  </template>
                  <template v-slot:button>
                    <button class="max-[1981px]:text-[16px] rounded-xl w-full border pt-1 pb-0.5 pl-2 pr-2 h-full bg-sky-600 mt-2 hover:bg-sky-700" @click=register>
                      {{ isLogin ? 'login':'signup' }}
                    </button>
                  </template>
                  <template v-slot:option2>
                    <p @click="changeForm" class=" text-center mt-2">
                      <span class="max-[1981px]:text-xs mr-2">{{ isLogin ? 'new user?': 'have an account?'}} </span>
                      <span class="max-[1981px]:text-xs underline">{{ isLogin ? 'signup': 'login' }}</span>
                    </p>
                  </template>
                </InputForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<style scoped>

</style>