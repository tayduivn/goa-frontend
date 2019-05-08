<template>
  <div class="order">
    <div class="order-order">
      <div class="status-order mb-5">
        <button v-for="item in listState" :key="item" :class="{active: (stateOrder === item)}"
                @click="changeStatus(item)">
          {{ item }}
        </button>
      </div>
      <div v-if="orders && orders === 'loading'">
        <h3>Cargando datos...</h3>
      </div>
      <div v-else-if="orders && orders !== 'empty' && orders !== 'loading'">
        <div class="d-flex justify-order-between mb-3">
          <h5 class="mb-2">Listado de ordenes</h5>
        </div>

        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col" width="10px">Nº</th>
            <th scope="col">Usuario</th>
            <th scope="col">Fecha</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(order, index) of orders" :key="order.order_id">
            <th scope="col">{{++index}}</th>
            <td>{{order.email}}</td>
            <td>{{formaDate(order.order_inserted_at)}}</td>
            <td>
              <button class="btn btn-sm btn-primary" @click.prevent="openModal(order)">
                Mostrar
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="orders && orders === 'empty'">
        <div class="order-message-empty text-center">
          <h3>Actualmente no tiene envíos en este estado</h3>
          <router-link to="products" tag="button">Comience un nuevo envío</router-link>
        </div>
      </div>
      <div v-else-if="orders && orders === 'error'">
        <h3>Error recuperando datos</h3>
      </div>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <div v-if="order && order === 'loading'">
        <h3>Loading...</h3>
      </div>

      <div v-else-if="order && order !== 'empty' && order.products && order.products.length">
        <div class="d-flex justify-content-between align-items-center mt-5">
          <h3>Detail of the order Nº {{order.id}} - {{order.status}}</h3>
        </div>
        <hr>
        <div class="mt-4">
          <h5>Data of client</h5>
          <table class="table table-custom mt-3 mb-4">
            <tbody>
            <tr>
              <td scope="col" width="250px">Name of user</td>
              <td>{{order.email}}</td>
            </tr>
            <tr>
              <td scope="col" width="250px">Name of client</td>
              <td>{{order.first_name}} {{order.last_name}}</td>
            </tr>
            <tr>
              <td scope="col">Address</td>
              <td>{{order.address}}</td>
            </tr>
            <tr>
              <td scope="col">Phone</td>
              <td>{{order.phone}}</td>
            </tr>
            </tbody>
          </table>
          <h5>Data of product</h5>
          <table class="table table-custom mt-3 mb-4 text-center">
            <tbody>
            <tr>
              <th scope="col" width="10px">Nº</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
            <tr v-for="(item, index) of order.products" :key="item.cart_product_id">
              <td>{{++index}}</td>
              <td>{{item.name}}</td>
              <td>{{item.regular_price}}</td>
              <td>{{item.cart_quantity}}</td>
              <td>{{item.cart_quantity * item.regular_price}}</td>
            </tr>
            <tr>
              <th scope="col" width="10px"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">{{getTotalPrice}}</th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="order && order === 'empty'">
        <h3>No data</h3>
      </div>

      <div v-else-if="order && order === 'error'">
        <h3>Error recuperando datos</h3>
      </div>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"
  import axios from 'axios'
  import {handleError, listState, updateOrderOptions} from "../../utils/util"
  import {successMessage} from "../../utils/handle-message"
  import {modelOrder} from "../../services/model/model-orders"

  export default {
    name: "order-client",
    components: {CloseImageSVG},
    metaInfo: {
      title: 'TSL',
      titleTemplate: (title) => {
        return `${title} | Mis solicitudes`
      }
    },
    data() {
      return {
        formData: null,
        listState: listState,
        stateOrder: listState[0],
        open: false,
      }
    },
    computed: {
      orders() {
        return this.$store.getters.getOrders
      },
      order() {
        return this.$store.getters.getCartUserOrder
      },
      getTotalPrice() {
        let totalPrice = 0
        this.order.products.forEach((value) => {
          totalPrice = (parseInt(value.regular_price) * parseInt(value.cart_quantity)) + totalPrice
        })
        return totalPrice
      },
    },
    created() {
      this.$store.dispatch('getOrders', this.stateOrder)
      this.formData = new FormData()
    },
    methods: {
      changeStatus(state) {
        this.stateOrder = state
        this.$store.dispatch('getOrders', this.stateOrder)
      },
      successRequest(title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getStatusContent', this.stateOrder)
        this.order = modelOrder.reset()
        this.hideModal()
      },
      editStatusOrder(title = "Registrado", state) {
        this.order.status = state
        console.log(JSON.stringify(this.order))
        axios(updateOrderOptions(this.order))
          .then(() => {
            this.successRequest("Creado", title)
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      openModal(order) {
        this.open = true
        this.$store.dispatch('getCartUserOrder', `?userId=${order.user_id}&cartId=${order.cart_id}&status=${this.stateOrder}`)
      },
      hideModal() {
        this.$store.commit('SET_CART_USER_ORDERS', [])
        this.open = false
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      },
    },
  }
</script>

<style scoped lang="scss">
  .order {
    padding: 20px 50px 50px;

    .order-order {
      max-width: 1024px;
      margin: 0 auto;

      .table-order {
        background-color: white;
      }

      .status-order {
        border-bottom: 1px solid #CCC;

        button {
          background: transparent;
          border: none;
          font-size: .9rem;
          font-weight: 600;
          outline: none;
          padding: 10px 15px;
          text-transform: uppercase;
        }

        .active {
          border-bottom: 5px solid #74a0c7;
        }
      }
    }
  }
</style>
