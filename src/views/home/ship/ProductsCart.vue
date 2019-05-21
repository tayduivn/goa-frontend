<template>
  <div class="cart">
    <SearchComponent/>
    <div class="cart-box">
      <div v-if="carts && carts === 'loading'">
        <h3>{{wordEng.loading}}</h3>
      </div>

      <div v-else-if="carts && carts !== 'empty'">
        <h2>Shopping Cart</h2>

        <div class="cart-content" v-if="quantityValue.length > 0">
          <div class="cart-products">
            <div class="cart-table">
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
        <div v-else>
          <div class="order-message-empty text-center">
            <h3>Currently you do not have added products</h3>
            <router-link to="products" tag="button">Register a new product</router-link>
          </div>
        </div>

        <div class="products-box">
          <h2>You might also like</h2>
          <div class="content-slick" v-if="productsCategories&& productsCategories.length
            && productsCategories!== 'empty' && productsCategories!== 'loading' && productsCategories!== 'error'">
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
          <h3>Choose your payment method</h3>
          <hr>
          <div v-if="!submitForm" class="payment-box">
            <div class="payment-separator"></div>
            <div class="payment-card">
              <h4>Credit cart</h4>
              <vue-stripe-checkout
                  ref="checkoutRef"
                  :image="product.image"
                  :name="product.name"
                  :description="product.description"
                  :currency="product.currency"
                  :amount="getTotalPriceCheckout"
                  :allow-remember-me="false"
                  @done="done"
                  @opened="opened"
                  @closed="closed"
                  @canceled="canceled"
              ></vue-stripe-checkout>
              <div class="d-flex justify-content-center">
                <button @click="checkout" class="stripe">Start checkout</button>
              </div>
            </div>
            <div class="payment-paypal">
              <h4>Paypal</h4>
              <div id="paypal-button"></div>
            </div>
          </div>
          <div v-else>
            <h3>Loading information...</h3>
          </div>
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
        product: {
          image: 'http://gardensofamerica.com/logo.png',
          name: 'Gardens of America',
          description: 'Credit card information',
          currency: 'USD',
          amount: 0
        },
        submitForm: false,
        open: false,
        quantityValue: [],
        cart: modelCart,
        wordEng: wordEng,
        transaction: modelTransaction.reset(),
        totalPrice: 0,
        payments: [
          {id: 1, name: 'Amazon'},
          {id: 2, name: 'Credit card'},
          {id: 3, name: 'Paypal'},
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
        return this.$store.getters.getCartStatus
      },
      productsCategories() {
        return this.$store.getters.getProductsCategories
      },
      getTotalPriceCheckout() {
        return parseInt(this.totalPrice.toString().replace(".", ""))
      }
    },
    created() {
      this.getCartProduct()
      this.getPaypal()
    },
    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },
    methods: {
      getCartProduct() {
        const id = JSON.parse(localStorage.getItem('user')).id
        this.$store.dispatch('getCartStatus', `?userId=${id}&status=current`)
          .then(res => {
            res.products.forEach((value, index) => {
              this.quantityValue[index] = {
                cart_product_id: value.cart_product_id,
                product_id: value.product_id,
                quantity: parseInt(value.cart_quantity)
              }
            })
            this.getTotalPrice()
            this.product.amount = this.totalPrice
            if (res.products.length)
              this.$store.dispatch('getProductsCategories', `?id=${res.products[0].id}&category=true&limit=15&order=RAND`)
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      async checkout() {
        this.transaction.processor = 'Credit card'
        await this.$refs.checkoutRef.open();
      },
      done({token}) {
        this.transaction.token_stripe = token
        this.saveTransaction()
      },
      opened() {
        // do stuff
      },
      closed() {
        // do stuff
      },
      canceled() {
        // do stuff
      },
      getPaypal() {
        getAxios(`${apiTransactions.all}?payment=Paypal`, 'GET')
          .then(res => {
            if (res.data.data.paypal_client !== '') {
              const paypal = require('paypal-checkout');
              const client = require('braintree-web/client');
              const paypalCheckout = require('braintree-web/paypal-checkout');

              const self = this

              const user = JSON.parse(localStorage.getItem('user'))
              paypal.Button.render({
                braintree: {client, paypalCheckout},
                client: {
                  production: res.data.data.paypal_client,
                  sandbox: res.data.data.paypal_client
                },
                env: 'sandbox', // Or 'sandbox'
                commit: true, // This will add the transaction amount to the PayPal button

                payment: (data, actions) => actions.braintree.create({
                  flow: 'checkout', // Required
                  amount: self.totalPrice, // Required
                  currency: 'USD', // Required
                }),

                onAuthorize: function (payload, actions) {
                  actions.payment.get().then(function(data) {
                    self.transaction.processor = 'Paypal'
                    self.transaction.payload_paypal = {
                      nonce: payload.nonce,
                      orderID: payload.orderID,
                      payer_info: data.payer.payer_info
                    }
                    self.saveTransaction()
                  })
                },
              }, '#paypal-button');
            } else {
              infoMessage(this.$swal, null, 'Error recover paypal info')
            }
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
        this.transaction.processor_trans_id = 1

        this.transaction.cart_id = this.carts.cart_id
        this.transaction.user_id = this.carts.user_id
        this.transaction.total = this.totalPrice
        this.transaction.subtotal = this.totalPrice

        console.log(JSON.stringify(this.transaction))
        getAxios(apiTransactions.all, 'POST', this.transaction)
          .then(() => {
            this.submitForm = false
            successMessage(this.$swal, 'Transaction success')
            const id = JSON.parse(localStorage.getItem('user')).id
            this.$store.dispatch('getCartStatus', `?userId=${id}&status=current`)
              .then((res) => {
                localStorage.setItem('cartId', res.cart_id)
                this.$router.push('order-client')
              })
              .catch(err => {
                this.submitForm = false
                handleError(this.$swal, err)
              })
          })
          .catch(err => {
            this.submitForm = false
            handleError(this.$swal, err)
          })
      },
      getTotalPrice() {
        let totalPrice = 0
        this.carts.products.forEach((value, index) => {
          totalPrice = (Number(value.regular_price).toFixed(2) * Number(this.quantityValue[index].quantity).toFixed(2)) + totalPrice
        })
        this.totalPrice = Number(totalPrice).toFixed(2)
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

  .stripe-card {
    width: 300px;
    border: 1px solid grey;
  }

  .stripe-card.complete {
    border-color: green;
  }

  .payment-box {
    display: flex;
    position: relative;
    padding: 40px 0;

    .payment-separator {
      background-color: rgba(0,0,0,.1);
      height: 75%;
      position: absolute;
      left: 50%;
      width: 1px;
    }

    .payment-paypal, .payment-card {
      align-self: center;
      display: inline-block;
      width: 50%;
    }

    .payment-paypal #paypal-button {
      display: table;
      margin: 0 auto;
    }

    .payment-paypal:before {
      content: '';
      background-color: #515151;
      height: 100%;
      width: 1px;
    }

    h4 {
      margin-bottom: 10%;
      text-align: center;
    }
  }

  button.stripe {
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    background: #32325d;
    white-space: nowrap;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 14px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.025em;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
  }

  @media screen and (min-width: 1360px) {

  }

  @media screen and (min-width: 1920px) {

  }

  @media screen and (max-width: 1024px) {

  }

  @media screen and (max-width: 700px) {
    .cart .cart-box .cart-content {
      flex-direction: column;

      .cart-products, .cart-summary {
        width: 100%;
      }

      .cart-summary {
        margin-top: 5%;
      }
    }
  }

  @media screen and (max-width: 400px) {
    table tbody tr th:first-child, table tbody tr td:first-child {
      display: none;
    }
  }
</style>
