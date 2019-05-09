<template>
  <div>

    <div v-if="carts && carts === 'loading'">
      <h3>{{wordEng.loading}}</h3>
    </div>
    <div v-else-if="carts && carts !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">List of carts</h3>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">User</th>
          <th scope="col">Date</th>
          <th scope="col" width="10"></th>
          <th scope="col" width="10"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(cart, index) of carts" :key="cart.cart_id">
          <th scope="col">{{++index}}</th>
          <td>{{cart.email}}</td>
          <td>{{formaDate(cart.inserted_at)}}</td>
          <td>
            <button class="btn btn-sm btn-primary" @click.prevent="openModal(cart)">
              {{wordEng.show}}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="carts && carts === 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3>{{wordEng.noData}}</h3>
      </div>
    </div>
    <div v-else-if="carts && carts === 'error'">
      <h3>{{wordEng.error}}</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <h3>Information of cart</h3>
      <div v-if="cart && cart === 'loading'">
        <h3>{{wordEng.loading}}</h3>
      </div>
      <table v-else-if="cart && cart !== 'empty'" class="table table-custom mt-3 mb-4 text-center">
        <tbody>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity to shop</th>
          <th scope="col">Total</th>
        </tr>
        <tr v-for="(item, index) of cart" :key="item.item_id">
          <td>{{++index}}</td>
          <td>{{item.name}}</td>
          <td>{{item.price}}</td>
          <td>{{item.cart_quantity}}</td>
          <td>{{item.cart_quantity * item.price}}</td>
        </tr>
        </tbody>
      </table>
      <div v-else-if="cart && cart === 'empty'">
        <div class="d-flex justify-content-between mb-3">
          <h3>{{wordEng.noData}}</h3>
        </div>
      </div>
      <div v-else-if="cart && cart === 'error'">
        <h3>{{wordEng.error}}</h3>
      </div>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"

  export default {
    name: "Carts",
    components: {CloseImageSVG},
    metaInfo: {
      title: 'Gardens of America cPanel',
      titleTemplate: (title) => {
        return `${title} | Carts`
      }
    },
    data() {
      return {
        open: false,
      }
    },
    computed: {
      carts() {
        return this.$store.getters.getCarts
      },
      cart() {
        return this.$store.getters.getCartsByUser
      }
    },
    created() {
      this.$store.dispatch('getCarts')
    },
    methods: {
      openModal(cart) {
        this.open = true
        this.$store.dispatch('getCartsByUser', `?userId=${cart.user_id}`)
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
