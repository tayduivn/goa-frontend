<template>
  <div class="search-product">
    <div class="search-content">
      <form @submit.prevent="searchProduct">
        <label for="search-product">Search the Store</label>
        <div class="input-search">
          <input type="text" id="search-product" v-model="nameProduct">
          <img @click.prevent="searchProduct" class="button-search"
               src="../assets/img/product-description/search_icon.png" alt="ico search">
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SearchComponent',
    data() {
      return {
        nameProduct: ''
      }
    },
    methods: {
      searchProduct() {
        if (this.nameProduct !== '')
          this.$parent.searchProduct(this.nameProduct)
      }
    }
  }
</script>

<style scoped lang="scss">
  @mixin div-adjust($width) {
    margin: 0 auto;
    max-width: $width;
  }

  @mixin div-display($width) {
    display: inline-block;
    width: $width;
  }

  $green-one: #00EE9D;
  $green-two: #01EE9D;
  $green-three: #00CCC3;

  $color-font: #646464;

  .search-product {
    background-color: $green-three;
    border-bottom: 4px solid $green-two;
    color: white;
    padding: 30px 0;
    width: 100%;

    label {
      margin: 0 2% 0 0;
    }

    .search-content {
      margin: 0 auto;
      width: 80%;

      form {
        display: flex;
        align-items: center;

        .input-search {
          position: relative;

          .button-search {
            cursor: pointer;
            right: 5px;
            position: absolute;
            top: 4px;
            width: 15px;
          }

          input {
            border-radius: 5px;
            padding: 2px 5px;
            width: 250px;
          }
        }
      }
    }
  }
</style>
