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
    <div v-if="contents && contents === 'loading'">
      <h3>Cargando datos...</h3>
    </div>
    <div v-else-if="contents && contents !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">Lista de ordenes </h3>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Orden Destino</th>
          <th scope="col">Status</th>
          <th scope="col">Visto</th>
          <th scope="col">Fecha</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(order, index) of contents" :key="order.idmessage_order">
          <th scope="col">{{++index}}</th>
          <td>{{order.destination_order}}</td>
          <td>{{order.status}}</td>
          <td v-if="order.active_order === '1'">Si</td>
          <td v-else-if="order.active_order === '2'">No</td>
          <td>{{formaDate(order.date_created)}}</td>
          <td>
            <button class="btn btn-sm btn-primary" @click.prevent="openModal(order)">
              Mostrar
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="contents && contents === 'empty'">
      <h3>No hay datos registrados</h3>
    </div>
    <div v-else-if="contents && contents === 'error'">
      <h3>Error recuperando datos</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <div class="d-flex justify-content-between align-items-center mt-5">
        <h3>Detalle de la orden Nº {{order.idorder}} - {{order.status}}</h3>
        <router-link v-if="order.status === 'Esperando'" tag="button" class="ml-3 btn btn-sm btn-primary"
                     :to="`/cpanel/admin/transport`">
          Buscar transportista
        </router-link>
      </div>
      <div class="mt-4" v-if="order.status !== 'Cancelado'">
        <hr>
        <h5>Proceso de cancelación</h5>
        <small>Se enviará la información al correo del cliente y administrador en caso de que haya un pago y requiera
          devolución
        </small>
        <div class="mt-3">
          <div class="form-group">
            <input class="form-control" type="text" v-model="notification.message" placeholder="Deja un mensaje">
          </div>
          <div class="text-right">
            <button class="btn-sm btn-danger"
                    @click.prevent="editStatusOrder('Cancelado', 'Desea cancelar la orden')">
              Cancelar
            </button>
          </div>
        </div>
        <hr>
      </div>
      <div v-if="payment && order.status === 'Deposito Enviado'">
        <div class="d-flex justify-content-between align-items-center mt-4">
          <h5>Datos del pago</h5>
          <button class="btn-sm btn-primary" @click.prevent="editStatusOrder('Esperando Transportista')">
            Pago verificado, notificar transportista
          </button>
        </div>
        <table class="table-payment table table-custom mt-3 mb-4">
          <tbody>
          <tr>
            <td scope="col" width="250px">Image</td>
            <td><img :src="payment.image" :alt="payment.name"></td>
          </tr>
          </tbody>
        </table>
      </div>
      <DataOrderTable :forma-date="formaDate(order.date_created)" :object="object" :order="order"/>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"
  import axios from 'axios'
  import config from "./../../config/config";
  import {handleError, listState} from "../../utils/util"
  import {confirmMessage, successMessage} from "../../utils/handle-message"
  import {modelOrder} from "../../services/model/model-orders"
  import {modelObject} from "../../services/model/model-object"
  import DataOrderTable from "../../components/DataOrderTable"
  import {modelMessageNotification} from "../../services/model/model-message-notification"
  import io from 'socket.io-client'

  export default {
    name: "Orders",
    metaInfo: {
      title: 'TSL cPanel',
      titleTemplate: (title) => {
        return `${title} | Ordenes`
      }
    },
    components: {DataOrderTable, CloseImageSVG},
    data() {
      return {
        statesOrder: listState,
        stateOrderSelected: 'Todo',
        order: modelOrder,
        object: modelObject,
        notification: modelMessageNotification,
        open: false,
        idTransport: this.$route.params.id,
        socket: io(config.socket_url),
      }
    },
    computed: {
      contents() {
        return this.$store.getters.getStatusContent
      },
      payment() {
        return this.$store.getters.getPayment
      },
    },
    created() {
      this.$store.dispatch('getStatusContent', this.stateOrderSelected)
    },
    methods: {
      updateActiveOrder(idorder) {
        axios({
          method: 'PUT',
          url: `${config.api_url}/api/admin/order/updateActive`,
          headers: {
            Authorization: localStorage.token
          },
          data: {active: 1, idorder}
        })
          .then(() => {
            this.$store.dispatch('getActiveOrder', 2)
              .then(res => {
                this.socket.emit('order', {count: res})
              })
              .catch(err => {
                handleError(this.$swal, err)
              })
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      changeState() {
        this.$store.dispatch('getStatusContent', this.stateOrderSelected)
      },
      successRequest(title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getStatusContent', this.stateOrderSelected)
        this.order = modelOrder.reset()
        this.hideModal()
        console.clear()
      },
      editStatusOrder(state, title = "Desea Actualizar el status") {
        confirmMessage(this.$swal, title)
          .then(res => {
            if (res) {
              this.order.status = state
              if (state === 'Cancelado') {
                this.order.user_iduser = this.order.iduser
                this.order.emailSender = JSON.parse(localStorage.getItem('user')).email
                this.order.emailRecipient = this.order.email
                this.order.message = this.notification.message
              }
              console.log(JSON.stringify(this.order))
              axios({
                method: 'PUT',
                url: `${config.api_url}/api/admin/order/updatestatus`,
                headers: {
                  Authorization: localStorage.token
                },
                data: this.order
              })
                .then(res => {
                  if (state === 'Cancelado') {
                    this.notification = modelMessageNotification.reset()
                    if (res.data.data.isPayment) {
                      this.successRequest("Creado", 'Enviado, revise su bandeja de entrada para obtener información de la mediación')
                    } else {
                      this.successRequest("Creado", 'Orden cancelada correctamente')
                    }
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
      openModal(content) {
        this.open = true
        this.object.idobject = content.idobject
        this.object.name_object = content.name_object
        this.object.image = content.image
        this.object.height = content.height
        this.object.width = content.width
        this.object.weight = content.weight
        this.object.quantity = content.quantity
        this.object.service_idservice = content.service_idservice

        this.order.idorder = content.idorder
        this.order.origin_order = content.origin_order
        this.order.destination_order = content.destination_order
        this.order.maximum_delivery_date = content.maximum_delivery_date
        this.order.maximum_withdrawal_date = content.maximum_withdrawal_date
        this.order.message = content.message
        this.order.price = content.price
        this.order.status = content.status
        this.order.user_iduser = content.user_iduser
        this.order.date_created = content.date_created

        this.order.iduser = content.iduser
        this.order.name = content.name
        this.order.email = content.email
        this.order.street = content.street
        this.order.phone = content.phone
        this.order.person_name = content.person_name
        this.order.person_last_name = content.person_last_name
        this.order.name_truck = content.name_truck
        this.$store.dispatch('getPayment', content.idorder)

        if (content.active_order === '2') {
          this.updateActiveOrder(this.order.idorder)
          this.$store.dispatch('getStatusContent', this.stateOrderSelected)
        }
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

<style scoped lang="scss">
  .table-payment img {
    width: 100%;
  }
</style>
