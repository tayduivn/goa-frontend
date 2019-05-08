<template>
  <div class="products">
    <div class="products-head">
      <h2>Store</h2>
    </div>

    <div class="products-box">
      <div class="products-content">
        <div class="product-filter">
          <h4>Filters <span v-if="checkCount > 0">{{checkCount}}</span></h4>
          <label v-for="(category, index) in categories" :key="category.id" class="filter-category" :for="category.id">
            <input type="checkbox" :id="category.id" v-model="checkList[index]" @change="getProductsCheck()">
            {{category.name }}
          </label>
        </div>

        <div class="products-all">
          <div v-if="products && products === 'loading'" class="card text-center mt-3 mb-3">
            <h3>Cargando datos...</h3>
          </div>

          <div v-else-if="products && products !== 'empty'">
            <div v-for="product in products" :key="product.id" class="product-item text-center">
              <router-link :to="`products-detail/${product.id}`">
                <img :src="product.images[0].image" :alt="product.name">
                <h6>{{product.name}}</h6>
                <p>{{product.regular_price}}</p>
                <router-link :to="`products-detail/${product.id}`" tag="button"
                             class="global-button green pl-4 pr-4">
                  Buy Now
                </router-link>
              </router-link>
            </div>
          </div>

          <div v-else-if="products && products === 'empty'" class="card text-center mt-3 mb-3">
            <h3>No hay datos registrados</h3>
          </div>
          <div v-else-if="products && products === 'error'" class="card text-center mt-3 mb-3">
            <h3>Error recuperando datos</h3>
          </div>

          <div class="pagination">
            <h5 v-for="item in items" :key="item" :class="{selected: (item === 1)}">{{ item }}</h5>
            <span>Next</span>
            <img src="../../../assets/img/Store/Arrow_icon_down.png" alt="image next">
          </div>
        </div>
      </div>
    </div>

    <div class="products-foot">
      <img src="../../../assets/img/Store/Garden_img.jpg" alt="store foot">
      <img src="../../../assets/img/Store/Logo_GoA_Garden_img.png" alt="store logo foot">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Products',
    data() {
      return {
        items: [1, 2, 3],
        checkList: [],
        checkCount: 0
      }
    },
    computed: {
      products() {
        return this.$store.getters.getProducts
      },
      categories() {
        return this.$store.getters.getCategories
      },
    },
    created() {
      this.$store.dispatch('getProducts')
      this.$store.dispatch('getCategories')
    },
    methods: {
      getProductsCheck() {
        this.checkCount = 0
        let query = ''
        this.categories.forEach((category, index) => {
          if (this.checkList[index]) {
            this.checkCount++
            query = `${query}${category.name},`
          }
        })
        if (query !== '') query = `?categoryName=${query.substring(0, query.length - 1)}`
        console.log(query)
        this.$store.dispatch('getProducts', query)
      }
    },
  }
</script>

<style scoped lang="scss">
  .products {
    max-width: 1024px;
    margin: 0 auto;
  }
</style>
