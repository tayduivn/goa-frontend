<template>
  <div class="order">
    <div class="order-order">
      <div class="status-order mb-5">
        <button :class="{active: (stateOrder === 'Esperando')}" @click="changeStatus('Esperando')">
          En proceso
        </button>
        <button :class="{active: (stateOrder === 'Deposito Esperando')}" @click="changeStatus('Deposito Esperando')">
          Esperando deposito
        </button>
        <button :class="{active: (stateOrder === 'Enviando')}" @click="changeStatus('Enviando')">
          Enviando
        </button>
        <button :class="{active: (stateOrder === 'Enviado')}" @click="changeStatus('Enviado')">
          Enviados
        </button>
        <button :class="{active: (stateOrder === 'Recibido')}" @click="changeStatus('Recibido')">
          Completado
        </button>
        <button :class="{active: (stateOrder === 'Cancelado')}" @click="changeStatus('Cancelado')">
          Mediación
        </button>
      </div>
      <div v-if="orders && orders === 'loading'">
        <h3>Cargando datos...</h3>
      </div>
      <div v-else-if="orders && orders !== 'empty'">
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
      <div class="d-flex justify-content-between align-items-center mt-5">
        <h3>Detalle de la orden Nº {{order.id}} - {{order.status}}</h3>
      </div>
      <hr>
      <div class="mt-4">
        <h5>Datos del cliente</h5>
        <table class="table table-custom mt-3 mb-4">
          <tbody>
          <tr>
            <td scope="col" width="250px">Nombre de usuario</td>
            <td>{{order.email}}</td>
          </tr>
          <tr>
            <td scope="col" width="250px">Nombre del Cliente</td>
            <td>{{order.first_name}} {{order.last_name}}</td>
          </tr>
          <tr>
            <td scope="col">Dirección</td>
            <td>{{order.address}}</td>
          </tr>
          <tr>
            <td scope="col">Teléfono</td>
            <td>{{order.phone}}</td>
          </tr>
          </tbody>
        </table>
        <h5>Datos del producto</h5>
        <table class="table table-custom mt-3 mb-4 text-center">
          <tbody>
          <tr>
            <th scope="col" width="10px">Nº</th>
            <th scope="col">Producto</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad a Comprar</th>
            <th scope="col">Total</th>
          </tr>
          <tr v-for="(item, index) of order.products" :key="item.id">
            <td>{{++index}}</td>
            <td>{{item.name}}</td>
            <td>{{item.price}}</td>
            <td>{{item.cart_quantity}}</td>
            <td>{{item.cart_quantity * item.price}}</td>
          </tr>
          </tbody>
        </table>
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
  import {modelProduct} from "../../services/model/model-product"
  import {modelTransaction} from "../../services/model/model-transaction"

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
        object: modelProduct,
        payment: modelTransaction,
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
        this.object = modelProduct.reset()
        this.payment = modelTransaction.reset()
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
        this.$store.dispatch('getCartUserOrder', {userId: order.user_id, cartId: order.cart_id})
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

      .order-message-empty {
        margin: 10% 0 5%;

        h3 {
          color: #898989;
          font-size: 1.4rem;
        }

        button {
          background-color: transparent;
          border: 4px solid #00b437;
          color: #00b437;
          padding: 10px 40px;
          margin: 5% 0 0;
        }
      }
    }
  }
</style>
