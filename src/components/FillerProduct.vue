<script setup>
import dataFile from '../../data/db.json';
import { ref, watch } from 'vue';
const test = ref("")
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
//test if selected
watch(test, (newValue) => {
    console.log('Selected category:', newValue);
});




</script>

<template>
<div class="w-auto h-screen bg-gradient-to-b from-blue-400 to-violet-800 p-4 ">
  <p class="text-xl text-black underline underline-offset-8 decoration-2">Filter</p>
    <div class="pt-4">
    <select class="select" v-model="test">
  <option disabled selected value="">Pick a Catagory</option>
  <option value="pc">PC</option>
  <option value="laptop">Laptop</option>
  <option value="gadgets">Gadgets</option>
</select>
</div>
<div>
  <p class="text-xl text-black pt-3 pb-3 underline underline-offset-8 decoration-2">Price selection</p>
  <div class="pb-2">
  <input type="radio" name="radio-1" class="radio radio-neutral radio-xs mr-2" id="hitolow" />
  <label class="text-black" for="hitolow">Highest to lowest</label>
  </div>
  <div class="pb-2">
  <input type="radio" name="radio-1" class="radio radio-neutral radio-xs mr-2" id="lowtohi"/>
  <label class="text-black" for="lowtohi">Lowest to highest</label>
  </div>
  <div class="pb-2">
  <input type="radio" name="radio-1" class="radio radio-neutral radio-xs mr-2" id="rate"/>
  <label class="text-black" for="rate">High rating</label><br>
  </div>
  <div class="pb-2">
  <input type="radio" name="radio-1" class="radio radio-neutral radio-xs mr-2" id="histock"/>
  <label class="text-black" for="histock">High quantity in stock</label>
  </div>
  <div class="pb-2">
  <input type="radio" name="radio-1" class="radio radio-neutral radio-xs mr-2" id="lowstock"/>
  <label class="text-black" for="lowstock">Low quantity in stock</label>
  </div>
</div>
</div>
</template>

<style scoped>

</style>