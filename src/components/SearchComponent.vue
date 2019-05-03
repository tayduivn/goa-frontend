<template>
  <div class="search-product">
    <div class="search-content">
      <form @submit.prevent="searchProduct">
        <label for="search-product">Search the Store</label>
        <input type="search" id="search-product">
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SearchComponent',
    methods: {
      searchProduct() {
        this.$parent.searchProduct()
      }
    }
  }
</script>
