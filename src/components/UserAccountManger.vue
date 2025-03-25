<script setup>
import { ref } from 'vue';
import CreateOrAuthAccount from './CreateOrAuthAccount.vue';
import AccountInfo from './AccountInfo.vue';
import { onUpdated } from 'vue';
import Header from './Header.vue';

const currentAccount = ref({})
function setAccount(loginAcc) {
    currentAccount.value = loginAcc
    console.log(currentAccount.value)
  }
</script>
<template>
  <div>
    <Header>

    </Header>
   <CreateOrAuthAccount v-if=" JSON.stringify(currentAccount) === '{}' " :hasUser="JSON.stringify(currentAccount) === '{}'? true: false" @login="setAccount">

  </CreateOrAuthAccount>

  <AccountInfo v-if="JSON.stringify(currentAccount) !== '{}'" :userAccount="currentAccount">

  </AccountInfo>

  </div>
</template>

<style scoped>

</style>