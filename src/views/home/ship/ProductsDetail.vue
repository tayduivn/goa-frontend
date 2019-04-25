<template>
  <div class="ship">
    <div class="ship-content">
      <div v-if="category && category === 'loading'">
        <h3>Cargando datos...</h3>
      </div>
      <div class="row m-0" v-else-if="category && category !== 'empty'">
        <nav class="col-md-12">
          <ol v-if="currentPath === 'object'" class="cd-multi-steps text-top">
            <li class="current"><em>Objeto</em></li>
            <li><em>Datos</em></li>
            <li><em>Mensaje</em></li>
          </ol>
          <ol v-else-if="currentPath === 'order'" class="cd-multi-steps text-top">
            <li class="visited"><em>Objeto</em></li>
            <li class="current"><em>Datos</em></li>
            <li><em>Mensaje</em></li>
          </ol>
          <ol v-else-if="currentPath === 'message'" class="cd-multi-steps text-top">
            <li class="visited"><em>Objeto</em></li>
            <li class="visited"><em>Datos</em></li>
            <li class="current"><em>Mensaje</em></li>
          </ol>
        </nav>
        <div v-if="currentPath !== 'message'" class="ship-head col-md-12">
          <h3>Ingrese los datos solicitados</h3>
          <small class="form-text text-muted">Categoría {{category.name}}</small>
        </div>
        <div class="ship-sub-content col-md-12 p-4">
          <router-view/>
        </div>
      </div>
      <div v-else-if="category && category === 'empty'" class="d-flex justify-content-between mb-3">
        <h3>No hay datos registrados</h3>
      </div>
      <div v-else-if="category && category === 'error'">
        <h3>Error recuperando datos</h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductsDetail',
    data() {
      return {
        currentPath: 'object'
      }
    },
    computed: {
      category() {
        return this.$store.getters.getCategory
      },
    },
    created() {
      this.$store.dispatch('getCategory', this.$route.params.id)
    },
    methods: {
      setCurrentPath() {
        this.currentPath = window.location.pathname.split('/').pop()
      }
    },
  }
</script>

<style scoped lang="scss">
  .ship {
    background-color: white;

    .ship-content {
      margin: 0 auto;
      max-width: 1024px;

      .ship-head {
        background-color: aliceblue;
        padding: 20px 0 20px 40px;
      }

      .ship-sub-content {
        border: 2px solid #efefef;
        border-radius: 0 0 20px 20px;
        width: 100%;
      }
    }
  }
</style>
