<template>
  <div class="cart">
    <SearchComponent/>
    <div class="cart-box">
      <div v-if="carts && carts === 'loading'">
        <h3>{{wordEng.loading}}</h3>
      </div>

      <div v-else-if="carts && carts !== 'empty'">
        <h2>Shopping Cart</h2>

        <div class="cart-content">
          <div class="cart-products">
            <div v-if="quantityValue.length > 0" class="cart-table">
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
                        <input type="text" :value="quantityValue[index].quantity" disabled>
                        <button @click.prevent="quantityProduct(true, index)">+</button>
                      </div>
                    </div>
                    <small v-if="product.quantity < parseInt(quantityValue[index].quantity)">
                      The maximum in store is {{product.quantity}}
                    </small>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="text-right">
                <button @click.prevent="updateCart" class="global-button button-update-cart">
                  Update Shopping Cart
                </button>
              </div>
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
              <button class="global-button green" @click.prevent="openModal">Checkout</button>
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

        <vue-modaltor :visible="open" @hide="hideModal">
          <template slot="close-icon">
            <CloseImageSVG/>
          </template>
          <h3>Method of Payment</h3>
          <hr>
          <form @submit.prevent="saveTransaction">
            <div class="form-group">
              <label for="payments">Select your method of payment</label>
              <select class="form-control width-reset ml-2" name="payments" id="payments" required
                      v-model="transaction.processor">
                <option v-for="item in payments" :key="item.id" :value="item.name">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="form-group" v-if="transaction.processor === 'Selection'">
              <label for="title" class="mt-3 mb-3">Processor</label>
              <input class="form-control" id="title" type="text" required disabled>
            </div>
            <div class="form-group" v-else>
              <label for="title-two" class="mt-3 mb-3">Processor</label>
              <input class="form-control" id="title-two" type="text" v-model="transaction.processor" required disabled>
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label for="cc_num" class="mt-3 mb-3">cc_num</label>
                <input class="form-control" id="cc_num" type="number" v-model="transaction.cc_num" required>
              </div>
              <div class="form-group col-md-6">
                <label for="cc_type" class="mt-3 mb-3">cc_type</label>
                <input class="form-control" id="cc_type" type="number" v-model="transaction.cc_type" required>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label for="start_date" class="mt-3 mb-3">Start Date</label>
                <input class="form-control" id="start_date" type="date" v-model="transaction.start_date" required>
              </div>
              <div class="form-group col-md-6">
                <label for="end_date" class="mt-3 mb-3">End Date</label>
                <input class="form-control" id="end_date" type="date" v-model="transaction.end_date" required>
              </div>
            </div>
            <div class="text-right">
              <button type="submit" class="btn-sm btn-primary" :disabled="!!submitForm">{{wordEng.save}}</button>
            </div>
          </form>
        </vue-modaltor>

      </div>

      <div v-else-if="carts && carts === 'empty'" class="d-flex justify-content-between mb-3">
        <div class="order-message-empty text-center">
          <h3>Actually you don't have products</h3>
          <router-link to="products" tag="button">Please, add a product</router-link>
        </div>
      </div>
      <div v-else-if="carts && carts === 'error'">
        <h3>{{wordEng.error}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchComponent from "../../../components/SearchComponent"
  import Slick from 'vue-slick';
  import {apiCartsProducts, apiTransactions, getAxios} from "../../../utils/endpoints"
  import {handleError, wordEng} from "../../../utils/util"
  import {infoMessage, successMessage} from "../../../utils/handle-message"
  import {modelCart} from "../../../services/model/model-cart"
  import CloseImageSVG from "../../../components/CloseImageSVG"
  import {modelTransaction} from "../../../services/model/model-transaction"

  export default {
    name: "ProductCart",
    components: {SearchComponent, Slick, CloseImageSVG},
    metaInfo: {
      title: 'Gardens of America',
      titleTemplate: (title) => {
        return `${title} | Cart`
      }
    },
    data() {
      return {
        submitForm: false,
        open: false,
        quantityValue: [],
        cart: modelCart,
        wordEng: wordEng,
        transaction: modelTransaction.reset(),
        totalPrice: 0,
        payments: [
          {id: 1, name: 'Amazon'},
          {id: 2, name: 'American Express'},
          {id: 3, name: 'Mastercard'},
          {id: 4, name: 'Paypal'},
          {id: 5, name: 'Visa'}
        ],
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
              this.quantityValue[index] = {
                cart_product_id: value.cart_product_id,
                product_id: value.product_id,
                quantity: parseInt(value.cart_quantity)
              }
            })
            this.getTotalPrice()
            this.$store.dispatch('getProductsCategories', `?id=${res.products[0].id}&category=true&limit=15&order=RAND`)
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      updateCart() {
        const data1 = {products: this.quantityValue}
        console.log(JSON.stringify(data1))
        getAxios(apiCartsProducts.all, 'PUT', data1)
          .then(() => {
            this.getCartProduct()
            successMessage(this.$swal, 'Updated')
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      saveTransaction() {
        this.submitForm = true
        /* TODO: add method of payment */
        this.transaction.processor_trans_id = 1
        this.transaction.code = 1

        this.transaction.cart_id = this.carts.cart_id
        this.transaction.user_id = this.carts.user_id
        this.transaction.total = this.totalPrice
        this.transaction.subtotal = this.totalPrice

        console.log(JSON.stringify(this.transaction))
        getAxios(apiTransactions.all, 'POST', this.transaction)
          .then(() => {
            this.submitForm = false
            successMessage(this.$swal, 'Transaction success')
            this.$router.push('order-client')
          })
          .catch(err => {
            this.submitForm = false
            handleError(this.$swal, err)
          })
      },
      getTotalPrice() {
        let totalPrice = 0
        this.carts.products.forEach((value, index) => {
          totalPrice = (parseInt(value.regular_price) * parseInt(this.quantityValue[index].quantity)) + totalPrice
        })
        this.totalPrice = totalPrice
      },
      quantityProduct(isPlus, index) {
        if (isPlus && this.carts.products[index].quantity <= parseInt(this.quantityValue[index].quantity)) {
          infoMessage(this.$swal, null, 'This is the max in the store')
          return
        }
        if (!isPlus && parseInt(this.quantityValue[index].quantity) <= 1) {
          infoMessage(this.$swal, null, '1 is the minimum')
          return
        }
        this.quantityValue[index].quantity = isPlus ? parseInt(this.quantityValue[index].quantity) + 1 : parseInt(this.quantityValue[index].quantity) - 1
        this.getTotalPrice()
      },
      openModal() {
        this.transaction = modelTransaction.reset()
        this.open = true
      },
      hideModal() {
        this.open = false
      },
    },
  }
</script>

<style scoped lang="scss">
  $color-message: #337670;

  .cart {
    .cart-box {
      max-width: 1024px;
      margin: 0 auto;
    }

    small {
      color: red;
    }
  }
</style>
