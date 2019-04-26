<template>
  <div>

    <div v-if="carts && carts === 'loading'">
      <h3>Cargando datos...</h3>
    </div>
    <div v-else-if="carts && carts !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">Lista de Imágenes</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">Crear nuevo</button>
        </div>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Fecha</th>
          <th scope="col" width="10"></th>
          <th scope="col" width="10"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(cart, index) of carts" :key="cart.idcarts">
          <th scope="col">{{++index}}</th>
          <td>{{formaDate(cart.date_created)}}</td>
          <td>
            <button class="btn btn-sm btn-success" @click.prevent="openModal(cart, false)">
              Editar
            </button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" @click.prevent="deleteData(cart.idcarts)">
              Eliminar
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="carts && carts === 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3>No hay datos registrados</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">Crear nuevo</button>
        </div>
      </div>
    </div>
    <div v-else-if="carts && carts === 'error'">
      <h3>Error recuperando datos</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <h3>Información del carrito</h3>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"

  export default {
    name: "Carts",
    components: {CloseImageSVG},
    metaInfo: {
      title: 'TSL cPanel',
      titleTemplate: (title) => {
        return `${title} | Imágenes del Home`
      }
    },
    data() {
      return {
        open: false
      }
    },
    computed: {
      carts() {
        return this.$store.getters.getCarts
      }
    },
    created() {
      this.$store.dispatch('getCarts')
    },
    methods: {
      openModal(cart) {
        this.open = true
        this.cart = cart
      },
      hideModal() {
        this.open = false
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      }
    },
  }
</script>

<style scoped>
  .cart-content {
    width: 200px;
    height: 200px;
  }

  .cart-content img {
    width: 100%;
  }
</style>
