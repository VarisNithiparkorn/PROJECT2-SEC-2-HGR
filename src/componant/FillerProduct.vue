<script setup>
import { ref } from 'vue';
import data from '../../data/db.json';

const found = ref('');
const obj = ref('');

const searchByName = () => {
  const name = obj.value; 
  const item = data.find((entry) => entry.name.toLowerCase() === name.toLowerCase());
  found.value = item ? item.name : 'Not found..';
};
</script>

<template>
 <div>
   Find item: <input type="text" id="name" name="name" v-model="obj">
   <button v-on:click="searchByName" class="text-red-500">Search</button>
   Show item found: {{ found }}
 </div>
</template>

<style scoped>
</style>
