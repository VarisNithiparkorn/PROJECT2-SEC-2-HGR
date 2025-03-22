<script setup>
</script>

<template>
  <!-- Full screen container -->
  <div class="flex items-center justify-center">
    <!-- Grid container -->
    <div class="w-full max-w-6xl md:grid md:grid-cols-2 flex flex-wrap justify-center p-4">
      <!-- Image section -->
      <div class="flex justify-center items-center col-1">
        <img class="w-auto h-90" src="../../public/ProductImages/product1.jpg" alt="GOOJODOQ earphones case">
      </div>
      
      <!-- Detail section -->
      <div class="col-2 flex flex-col justify-center">
        <h2 class="text-xl font-semibold mb-2 text-black">Product 1</h2>
        <p class="text-gray-600">computer desktop</p>
        <div class="flex items-center mt-2">
          <span class="text-yellow-400">★★★★★</span>
          <span class="text-gray-600 ml-2">4.8 | in stock: 5</span>
        </div>
        <div class="mt-3">
          <span class="text-gray-500">$100.00</span>
        </div>
        <div class="mt-6 flex flex-wrap max-md:justify-center">
          <button class="bg-blue-500 text-white px-4 py-2 rounded">Buy Now</button>
          <button class="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded">Add to Cart</button>
        </div>
        <div class="flex flex-col pt-5 max-md:justify-center">
          <div class="rating">
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="1 star" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="2 star" checked="checked" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="3 star" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="4 star" />
            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" aria-label="5 star" />
          </div>
          <textarea class="textarea mt-2" placeholder="Comment"></textarea>
          <button class="btn w-15 mt-2">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>