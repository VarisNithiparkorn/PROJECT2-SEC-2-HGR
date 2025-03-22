<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="max-w-4xl p-5">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <slot name="item" :item="item"></slot> 
      </li>
    </ul>
  </div>
</template>
