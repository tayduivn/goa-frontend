<template>
  <div>

    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="state" class="font-weight-bold">Selecciona un estado</label>
        <select class="form-control width-reset ml-3" name="state" id="state" v-model="stateOrderSelected">
          <option v-for="item in statesOrder" :key="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="text-right">
        <button class="btn btn-sm btn-primary" @click.prevent="changeState">
          Mostrar
        </button>
      </div>
    </div>
    <hr>
    <div v-if="orders && orders === 'loading'">
      <h3>Cargando datos...</h3>
    </div>
    <div v-else-if="orders && orders !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">Lista de ordenes </h3>
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
      <h3>No hay datos registrados</h3>
    </div>
    <div v-else-if="orders && orders === 'error'">
      <h3>Error recuperando datos</h3>
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
  import {handleError, listState} from "../../utils/util"
  import {confirmMessage, successMessage} from "../../utils/handle-message"
  import {apiOrders, getAxios} from "../../utils/endpoints"

  export default {
    name: "Orders",
    metaInfo: {
      title: 'TSL cPanel',
      titleTemplate: (title) => {
        return `${title} | Ordenes`
      }
    },
    components: {CloseImageSVG},
    data() {
      return {
        statesOrder: listState,
        stateOrderSelected: listState[0],
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
      this.$store.dispatch('getOrders', this.stateOrderSelected)
    },
    methods: {
      changeState() {
        this.$store.dispatch('getOrders', this.stateOrderSelected)
      },
      successRequest(title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getOrders', this.stateOrderSelected)
        this.hideModal()
      },
      editStatusOrder(state, title = "Desea Actualizar el status") {
        confirmMessage(this.$swal, title)
          .then(res => {
            if (res) {
              this.order.status = state
              getAxios(apiOrders.all, 'PUT', this.order)
                .then(() => {
                  if (state === 'Cancelado') {
                    this.successRequest("Creado", 'Orden cancelada correctamente')
                  } else {
                    this.successRequest("Creado", "Registrado")
                  }
                })
                .catch(err => {
                  handleError(this.$swal, err)
                })
            }
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
      }
    },
  }
</script>

<style scoped lang="scss">
  .table-transaction img {
    width: 100%;
  }
</style>
