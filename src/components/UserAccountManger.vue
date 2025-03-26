<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import CreateOrAuthAccount from './CreateOrAuthAccount.vue';
import AccountInfo from './AccountInfo.vue';
import { onUpdated } from 'vue';

const emit = defineEmits((['successAuth']))
const currentAccount = ref({})
function setAccount(loginAcc) {
    currentAccount.value = loginAcc
    emit('successAuth',currentAccount.value)
  }
</script>
<template>
  <div>

   <CreateOrAuthAccount v-if=" JSON.stringify(currentAccount) === '{}' " :hasUser="JSON.stringify(currentAccount) === '{}'? true: false" @login="setAccount">

  </CreateOrAuthAccount>

  <AccountInfo v-if="JSON.stringify(currentAccount) !== '{}'" :userAccount="currentAccount">

  </AccountInfo>

  </div>
</template>

<style scoped>

</style>