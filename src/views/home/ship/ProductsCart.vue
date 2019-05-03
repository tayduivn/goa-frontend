<template>
  <div class="cart">
    <SearchComponent/>
    <div class="cart-box">
      <div v-if="product && product === 'loading'">
        <h3>Cargando datos...</h3>
      </div>

      <div v-else-if="product && product !== 'empty'">
        <h2>Shopping Cart</h2>

        <div class="cart-content">
          <div class="cart-products">
            <table class="table table-custom mt-3 mb-4 text-center">
              <tbody>
              <tr>
                <th scope="col" width="10px"></th>
                <th scope="col"></th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
              </tr>
              <tr v-for="item of cart" :key="item.item_id">
                <td>{{item.product.images[0]}}</td>
                <td>{{item.name}}</td>
                <td>{{item.price}}</td>
                <td>
                  <button @click.prevent="minusQuantity">-</button>
                  <input type="number" id="quantity" :value="item.cart_quantity">
                  <button @click.prevent="moreQuantity">-</button>
                </td>
              </tr>
              </tbody>
            </table>
            <button @click.prevent="updateCart" class="button-update-cart">Update Shopping Cart</button>
          </div>
          <div class="cart-summary">
            <h3>Summary</h3>
            <div class="d-flex justify-content-between">
              <h4>Estimated Total</h4>
              <!-- Todo: total cart value -->
              <p>${{carts[0].price}}</p>
            </div>
            <p>Shipping and Tax</p>
            <div class="summary-separator"></div>
            <div class="summary">
              <router-link to="/products"> Continue Shopping</router-link>
              <button class="global-button" @click.prevent="sendCart">Checkout</button>
            </div>
          </div>
        </div>

        <div class="product-related">
          <h2>You might also like</h2>
          <div v-for="item in products" :key="item.id" class="slick-image-content">
            <img :src="item.images[0]" :alt="item.name">
            <p>{{item.name}}</p>
            <p>{{item.regular_price}}</p>
            <button class="global-button transparent">Buy Now</button>
          </div>
        </div>
      </div>

      <div v-else-if="product && product === 'empty'" class="d-flex justify-content-between mb-3">
        <h3>No hay datos registrados</h3>
      </div>
      <div v-else-if="product && product === 'error'">
        <h3>Error recuperando datos</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchComponent from "../../../components/SearchComponent"
  import {apiCarts, getAxios} from "../../../utils/endpoints"
  import {handleError} from "../../../utils/util"

  export default {
    name: "ProductCart",
    components: {SearchComponent},
    computed: {
      product() {
        return this.$store.getters.getCartsByUser
      },
    },
    created() {
      this.$store.dispatch('getCartsByUser', JSON.parse(localStorage.getItem('user')).id)
    },
    methods: {
      minusQuantity() {
      },
      moreQuantity() {
      },
      updateCart() {

      },
      sendCart() {
        getAxios(apiCarts.all, 'POST')
          .then(res => {

          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
    },
  }
</script>

<style scoped lang="scss">
  $color-message: #337670;
</style>
