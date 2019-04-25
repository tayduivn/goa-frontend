<template>
  <div>

    <div v-if="users && users === 'loading'">
      <h3>Cargando datos...</h3>
    </div>
    <div v-else-if="users && users !== 'empty'">
      <h3 class="mb-2">Lista de clientes</h3>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Correo</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) of users" :key="user.id_usuario">
          <th scope="col">{{++index}}</th>
          <td>{{user.email}}</td>
          <td width="50px">
            <button class="btn btn-sm btn-primary" @click="openModal(user)">
              Mostrar
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="users && users === 'empty'">
      <h3>No hay datos registrados</h3>
    </div>
    <div v-else-if="users && users === 'error'">
      <h3>Error recuperando datos</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <h3>{{user.name}}</h3>
      <table class="table table-custom mt-3">
        <tbody>
        <tr>
          <td scope="col" width="160px">Correo</td>
          <td>{{user.email}}</td>
        </tr>
        <tr>
          <td scope="col">Dirección</td>
          <td>{{user.street}}</td>
        </tr>
        <tr>
          <td scope="col">Teléfono</td>
          <td>{{user.phone}}</td>
        </tr>
        <tr>
          <td scope="col">Fecha de creación</td>
          <td>{{formaDate(user.date_created)}}</td>
        </tr>
        <tr>
          <td scope="col">Mensajes</td>
          <td>
            <form @submit.prevent="saveData(user)">
              <div class="form-group">
                <label for="message" class="mb-3">Detalles</label>
                <textarea class="form-control" id="message" cols="50" rows="3"
                          v-model="notification.message"></textarea>
              </div>
              <div class="form-group">
                <label>Imagen (opcional)</label>
                <input id="image-message" type="file" class="form-control" accept="image/*" @change="subirImagen">
                <p class="m-0 p-0 text-left">
                  <small>Subir una imagen.</small>
                </p>
              </div>
              <div class="text-right">
                <button type="submit" class="btn-sm btn-primary">Guardar</button>
              </div>
            </form>
          </td>
        </tr>
        <tr>
          <td scope="col">Mensajes</td>
          <td>
            <router-link tag="button" class="btn btn-sm btn-primary" :to="`client/message/${user.iduser}`">
              Mostrar todos
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </vue-modaltor>

  </div>
</template>

<script>
  import {modelUser} from "../../services/model/model-user"
  import CloseImageSVG from "../../components/CloseImageSVG"
  import store from './../../store/store'
  import {successMessage} from "../../utils/handle-message"
  import {modelMessageNotification} from "../../services/model/model-message-notification"
  import {handleError} from "../../utils/util"
  import axios from "axios"
  import config from "../../config/config"
  import io from 'socket.io-client'

  export default {
    name: "Client",
    metaInfo: {
      title: 'TSL cPanel',
      titleTemplate: (title) => {
        return `${title} | Clientes`
      }
    },
    components: {CloseImageSVG},
    data() {
      return {
        user: modelUser,
        notification: modelMessageNotification,
        formData: null,
        open: false,
        socket: io(config.socket_url),
      }
    },
    computed: {
      users() {
        return this.$store.getters.getClients
      }
    },
    created() {
      this.formData = new FormData()
      store.dispatch('getClients')
    },
    methods: {
      subirImagen(event) {
        let files = event.target.files
        this.formData.delete('image')
        if (files.length) {
          for (let image of files) {
            this.formData.append('image', image, image.name)
          }
        }
      },
      formDataSend() {
        this.formData.delete('message')
        this.formData.append('message', this.notification.message)
        this.formData.delete('user_iduser')
        this.formData.append('user_iduser', this.notification.user_iduser)
      },
      saveData(user) {
        this.notification.user_iduser = user.iduser
        this.formDataSend()
        axios({
          method: 'POST',
          url: `${config.api_url}/api/messagenotification/register`,
          headers: {
            Authorization: localStorage.token
          },
          data: this.formData
        })
          .then(() => {
            this.$store.dispatch('getNotificationsStatusRead', {iduser: user.iduser, status: 2})
              .then((res) => {
                successMessage(this.$swal, "Creado")
                this.socket.emit('notification', {count: res, user_iduser: user.iduser})
                this.hideModal()
              })
              .catch(err => {
                handleError(this.$swal, err)
              })
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      openModal(user) {
        this.open = true
        this.user = user
      },
      hideModal() {
        this.open = false
        this.user = modelUser.reset()
        this.notification = modelMessageNotification.reset()
        const file = document.getElementById("image-message");
        file.value = file.defaultValue;
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      }
    },
  }
</script>

<style scoped>
</style>
