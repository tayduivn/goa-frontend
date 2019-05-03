<template>
  <div class="products">
    <div class="products-box">
      <div v-if="products && products === 'loading'" class="card text-center mt-3 mb-3">
        <h3>Cargando datos...</h3>
      </div>

      <div class="products-content" v-else-if="products && products !== 'empty'">
        <div class="product-filter">
          <h4>Filters {{}}</h4>
          <div v-for="category in categories" :key="category.id">
            <label :for="category.id">{{ category.name }}
              <input type="checkbox" :id="category.id" :value="category.id">
            </label>
          </div>
        </div>
        <div v-for="product in products" :key="product.id">
          <router-link :to="`products-detail/${product.id}`" class="col-md-3 text-center products-item"
                       v-for="product in this.products" :key="product.id">
            <img :src="product.image" :alt="product.nabla">
            <h6>{{product.name}}</h6>
            <p>{{product.description}}</p>
          </router-link>
        </div>
      </div>

      <div v-else-if="products && products === 'empty'" class="card text-center mt-3 mb-3">
        <h3>No hay datos registrados</h3>
      </div>
      <div v-else-if="products && products === 'error'" class="card text-center mt-3 mb-3">
        <h3>Error recuperando datos</h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Products',
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
  }
</script>

<style scoped lang="scss">
  .products {
    max-width: 1024px;
    margin: 0 auto;
  }
</style>
