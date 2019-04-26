<template>
  <div class="order">
    <div class="order-content">
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
      <div v-if="contents && contents === 'loading'">
        <h3>Cargando datos...</h3>
      </div>
      <div v-else-if="contents && contents !== 'empty'">
        <div class="d-flex justify-content-between mb-3">
          <h5 class="mb-2">Listado de ordenes</h5>
        </div>
        <table class="table table-order">
          <thead>
          <tr>
            <th scope="col" width="10px">Nº</th>
            <th scope="col">Nombre</th>
            <th scope="col">Orden Recogida</th>
            <th scope="col">Orden Destino</th>
            <th scope="col">Status</th>
            <th scope="col">Fecha</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(order, index) of contents" :key="order.idmessage_order">
            <th scope="col">{{++index}}</th>
            <td>{{order.name_object}}</td>
            <td>{{order.origin_order}}</td>
            <td>{{order.destination_order}}</td>
            <td>{{order.status}}</td>
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
        <div class="order-message-empty text-center">
          <h3>Actualmente no tiene envíos en este estado</h3>
          <router-link to="ship" tag="button">Comience un nuevo envío</router-link>
        </div>
      </div>
      <div v-else-if="contents && contents === 'error'">
        <h3>Error recuperando datos</h3>
      </div>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <div v-if="stateOrder === 'Deposito Esperando'">
        <h5 class="mt-5 mb-4">Envíe la imagen del comprobante de deposito</h5>
        <form @submit.prevent="sendData('Desea enviar este comprobante de deposito', 'isPayment')">
          <div class="form-group">
            <label>Imagen</label>
            <input type="file" class="form-control" accept="image/*" @change="subirImagen" required>
            <p class="m-0 p-0 text-left">
              <small>Subir una imagen visible sino será cancelado.</small>
            </p>
          </div>
          <div class="text-right">
            <button class="btn-sm btn-primary">Enviar</button>
          </div>
        </form>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-5">
        <h5>Detalle de la orden Nº {{order.idorder}}</h5>
        <button v-if="order.status === 'Enviado'" class="btn-sm btn-primary"
                @click.prevent="sendData('Confirmo la llegada del envío', 'isEditStatus', 'Recibido')">
          Orden Recibida
        </button>
        <button v-if="order.status === 'Enviado'" class="btn-sm btn-danger"
                @click.prevent="sendData('No me llego el envío, dejé mensajes informando sin respuesta y procedo a mediación', 'isEditStatus', 'Cancelado')">
          Cancelar
        </button>
      </div>
      <DataOrderTable :forma-date="formaDate(order.date_created)" :object="object" :order="order"/>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"
  import axios from 'axios'
  import config from "../../config/config";
  import {handleError, listState, updateOrderOptions} from "../../utils/util"
  import {confirmMessage, successMessage} from "../../utils/handle-message"
  import {modelOrder} from "../../services/model/model-orders"
  import {modelProduct} from "../../services/model/model-product"
  import DataOrderTable from "../../components/DataOrderTable"
  import {modelPayment} from "../../services/model/model-payment"

  export default {
    name: "order-client",
    components: {DataOrderTable, CloseImageSVG},
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
        stateOrder: 'Esperando',
        order: modelOrder,
        object: modelProduct,
        payment: modelPayment,
        open: false,
      }
    },
    computed: {
      contents() {
        return this.$store.getters.getStatusContent
      }
    },
    created() {
      this.$store.dispatch('getStatusContent', this.stateOrder)
      this.formData = new FormData()
    },
    methods: {
      changeStatus(state) {
        this.stateOrder = state
        this.$store.dispatch('getStatusContent', state)
      },
      successRequest(title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getStatusContent', this.stateOrder)
        this.order = modelOrder.reset()
        this.object = modelProduct.reset()
        this.payment = modelPayment.reset()
        this.hideModal()
      },
      sendData(title, action, state = '') {
        confirmMessage(this.$swal, title)
          .then(res => {
            if (res) {
              switch (action) {
                case 'isPayment':
                  this.sendPayment()
                  break
                case 'isEditStatus':
                  this.editStatusOrder(title, "Desea Actualizar el status", state)
                  break
              }
            }
          })
      },
      sendPayment() {
        this.formData.delete('order_idorder')
        this.formData.append('order_idorder', this.order.idorder)
        axios({
          method: 'POST',
          url: `${config.api_url}/api/payment/register`,
          headers: {
            Authorization: localStorage.token
          },
          data: this.formData
        })
          .then(() => {
            this.editStatusOrder('Comprobante de pago enviado', "Desea Actualizar el status", this.listState[3])
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
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
      },
      hideModal() {
        this.open = false
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      },
      subirImagen(event) {
        let files = event.target.files
        this.formData.delete('image')
        if (files.length) {
          for (let image of files) {
            this.formData.append('image', image, image.name)
          }
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .order {
    padding: 20px 50px 50px;

    .order-content {
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
