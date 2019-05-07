<template>
  <div class="cart">
    <SearchComponent/>
    <div class="cart-box">
      <div v-if="carts && carts === 'loading'">
        <h3>Cargando datos...</h3>
      </div>

      <div v-else-if="carts && carts !== 'empty'">
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
              <tr v-for="(product, index) of carts.products" :key="product.id">
                <td><img :src="product.images[0].image" :alt="product.name"></td>
                <td>{{product.name}}</td>
                <td>{{product.regular_price}}</td>
                <td>
                  <div class="info-quantity">
                    <div>
                      <button @click.prevent="quantityProduct(false, index)">-</button>
                      <input type="text" :value="quantityValue[index]">
                      <button @click.prevent="quantityProduct(true, index)">+</button>
                    </div>
                  </div>
                  <small v-if="product.quantity < parseInt(quantityValue[index])">
                    The maximum in store is {{product.quantity}}
                  </small>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="text-right">
              <button @click.prevent="updateCart" class="global-button button-update-cart">Update Shopping Cart</button>
            </div>
          </div>
          <div class="cart-summary">
            <h3>Summary</h3>
            <div class="d-flex justify-content-between mt-2 mb-1">
              <h6>Estimated Total</h6>
              <p>${{totalPrice}}</p>
            </div>
            <p>Shipping and Tax</p>
            <hr class="mt-4">
            <div class="summary">
              <router-link to="/products" tag="button" class="global-button transparent">Continue Shopping</router-link>
              <button class="global-button green" @click.prevent="sendCart">Checkout</button>
            </div>
          </div>
        </div>

        <div class="products-box">
          <h2>You might also like</h2>
          <div class="content-slick" v-if="productsCategories&& productsCategories.length
            && productsCategories!== 'empty' && productsCategories!== 'loading'">
            <slick ref="slick" :options="slickOptions">
              <div v-for="item in productsCategories" :key="item.id" class="slick-product-content">
                <router-link :to="`products-detail/${item.id}`">
                  <img :src="item.images[0].image" :alt="item.name">
                  <p>{{item.name}}</p>
                  <p>{{item.regular_price}}</p>
                  <router-link :to="`products-detail/${item.id}`" tag="button"
                               class="global-button transparent pl-4 pr-4">
                    Buy Now
                  </router-link>
                </router-link>
              </div>
            </slick>
          </div>
        </div>
      </div>

      <div v-else-if="cart && cart === 'empty'" class="d-flex justify-content-between mb-3">
        <h3>No hay datos registrados</h3>
      </div>
      <div v-else-if="cart && cart === 'error'">
        <h3>Error recuperando datos</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchComponent from "../../../components/SearchComponent"
  import Slick from 'vue-slick';
  import {apiCarts, getAxios} from "../../../utils/endpoints"
  import {handleError} from "../../../utils/util"
  import {infoMessage} from "../../../utils/handle-message"
  import {modelCartProducts} from "../../../services/model/model-cart-products"

  export default {
    name: "ProductCart",
    components: {SearchComponent, Slick},
    data() {
      return {
        quantityValue: [],
        cartProduct: modelCartProducts,
        totalPrice: 0,
        slickOptions: {
          autoplay: true,
          arrows: true,
          dots: false,
          slidesToShow: 4,
          responsive: [
            {
              breakpoint: 900,
              settings: {
                arrows: false,
                dots: true,
              }
            }
          ]
        },
      }
    },
    computed: {
      carts() {
        return this.$store.getters.getCartsByUser
      },
      productsCategories() {
        return this.$store.getters.getProductsCategories
      },
    },
    created() {
      this.getCartProduct()
    },
    methods: {
      getCartProduct() {
        const id = JSON.parse(localStorage.getItem('user')).id
        this.$store.dispatch('getCartsByUser', `?userId=${id}&status=current`)
          .then(res => {
            res.products.forEach((value, index) => {
              this.quantityValue[index] = parseInt(value.cart_quantity)
            })
            this.getTotalPrice()
            this.$store.dispatch('getProductsCategories', `?id=${res.products[0].id}&category=true&limit=15&order=RAND`)
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      updateCart() {
        getAxios(apiCarts.all, 'PUT')
          .then(() => {
            this.getCartProduct()
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      sendCart() {
        getAxios(apiCarts.all, 'POST')
          .then(res => {

          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      getTotalPrice() {
        this.carts.products.forEach((value, index) => {
          this.totalPrice = this.totalPrice + (parseInt(value.regular_price) * parseInt(this.quantityValue[index]))
        })
        return this.totalPrice
      },
      quantityProduct(isPlus, index) {
        console.log(parseInt(this.quantityValue[index]))
        if (isPlus && this.carts.products[index].quantity <= parseInt(this.quantityValue[index])) {
          infoMessage(this.$swal, null, 'This is the max in the store')
          return
        }
        if (!isPlus && parseInt(this.quantityValue[index]) <= 1) {
          infoMessage(this.$swal, null, '1 is the minimum')
          return
        }
        this.quantityValue[index] = isPlus ? parseInt(this.quantityValue[index]) + 1 : parseInt(this.quantityValue[index]) - 1
      },
    },
  }
</script>

<style scoped lang="scss">
  $color-message: #337670;

  .cart {
    small {
      color: red;
    }
  }
</style>
