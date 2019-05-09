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
            <h3>{{wordEng.loading}}</h3>
          </div>

          <div v-else-if="products && products !== 'empty'">
            <div v-for="product in products" :key="product.id" class="product-item text-center">
              <img :src="product.images[0].image" :alt="product.name">
              <h6>{{product.name}}</h6>
              <p>{{product.regular_price}}</p>
              <router-link :to="`products-detail/${product.id}`" tag="button"
                           class="global-button green pl-4 pr-4">
                Buy Now
              </router-link>
            </div>
          </div>

          <div v-else-if="products && products === 'empty'" class="card text-center pt-5 pb-5">
            <h3>{{wordEng.noData}}</h3>
          </div>
          <div v-else-if="products && products === 'error'" class="card text-center pt-5 pb-5">
            <h3>{{wordEng.error}}</h3>
          </div>

          <div class="pagination" v-if="pagination !== 'loading' && pagination !== 'error' && pagination.lastPage > 1">
            <h6 v-for="item in pagination.lastPage" :key="item" :class="{selected: (item === pagination.page)}"
                @click.prevent="getPageProduct(item)">
              {{ item }}
            </h6>
            <div v-if="pagination.page < pagination.lastPage" class="next"
                 @click.prevent="getPageProduct(pagination.page + 1)">
              <span>next</span>
              <img src="../../../assets/img/Store/Arrow_icon_down.png" alt="image next">
            </div>
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
  import {wordEng} from "../../../utils/util"

  export default {
    name: 'Products',
    metaInfo: {
      title: 'Gardens of America',
      titleTemplate: (title) => {
        return `${title} | Products`
      }
    },
    data() {
      return {
        checkList: [],
        checkCount: 0,
        wordEng: wordEng,
      }
    },
    computed: {
      products() {
        return this.$store.getters.getProducts
      },
      pagination() {
        return this.$store.getters.getProductsPagination
      },
      categories() {
        return this.$store.getters.getCategories
      },
    },
    created() {
      this.$store.dispatch('getCategories')
      if (this.$route.query.name) {
        this.$store.dispatch('getProducts', `?productName=${this.$route.query.name}`)
      } else {
        this.$store.dispatch('getProducts')
      }
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
        this.$store.dispatch('getProducts', query)
      },
      getPageProduct(page) {
        if (this.pagination.page !== page && this.$route.params.name !== undefined) {
          this.$store.dispatch('getProducts', `?limit=12&page=${page}`)
        } else {
          this.$store.dispatch('getProducts', `?productName=${this.$route.params.name}&limit=12&page=${page}`)
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .products {
    max-width: 1024px;
    margin: 0 auto;
  }
</style>
