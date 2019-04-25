<template>
  <div class="ship">
    <div v-if="categories && categories === 'loading'" class="card text-center mt-3 mb-3">
      <h3>Cargando datos...</h3>
    </div>
    <div class="ship-content" v-else-if="categories && categories !== 'empty'">
      <h3>Nuevo envío</h3>
      <div class="ship-sub-content">
        <div class="row">
          <router-link :to="`detail-ship/${category.idcategory}/object`" class="col-md-3 text-center ship-item"
                       v-for="category in this.categories" :key="category.idcategory">
            <img :src="category.image" :alt="category.nabla">
            <h6>{{category.name}}</h6>
            <p>{{category.description}}</p>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else-if="categories && categories === 'empty'" class="card text-center mt-3 mb-3">
      <h3>No hay datos registrados</h3>
    </div>
    <div v-else-if="categories && categories === 'error'" class="card text-center mt-3 mb-3">
      <h3>Error recuperando datos</h3>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Products',
    computed: {
      categories() {
        return this.$store.getters.getCategories
      }
    },
    created() {
      this.$store.dispatch('getCategories')
    },
  }
</script>

<style scoped lang="scss">
  .ship {
    max-width: 1024px;
    margin: 0 auto;

    h3 {
      background-color: white;
      padding: 20px 20px 30px;
    }

    .ship-sub-content {
      border-bottom: 1px solid #efefef;
      border-top: 1px solid #efefef;
      width: 100%;

      .row {
        .ship-item {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 30px 20px 20px;

          h6 {
            margin: 8% 0 4%;
            text-transform: uppercase;
          }

          p {
            line-height: 1.2rem;
          }

          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>
