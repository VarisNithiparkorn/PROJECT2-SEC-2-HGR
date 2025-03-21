<script setup>
import { ref } from 'vue';
import CreateOrAuthAccount from './CreateOrAuthAccount.vue';
import AccountInfo from './AccountInfo.vue';
const prop = defineProps({
  currentAccount:{
    type:Object,
    default:{}
  }
})
const currentAccount = ref(prop.currentAccount)
function setAccount(loginAcc) {
    currentAccount.value = loginAcc
}
</script>
<template>
  <div>
  <CreateOrAuthAccount v-show="false" :hasUser="JSON.stringify(currentAccount) === '{}'? false: true" @login="setAccount">

  </CreateOrAuthAccount>
  <AccountInfo v-show="false">

  </AccountInfo>

  </div>
</template>

<style scoped>

</style>