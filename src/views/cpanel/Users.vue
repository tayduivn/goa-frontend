<template>
  <div>

    <div v-if="users && users === 'loading'">
      <h3>Cargando datos...</h3>
    </div>
    <div v-else-if="users && users !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">Lista de Usuarios del cPanel</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">Crear nuevo</button>
        </div>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Fecha</th>
          <th scope="col" width="10"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) of users" :key="user.iduser">
          <th scope="col">{{++index}}</th>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{formaDate(user.date_created)}}</td>
          <td>
            <button v-if="validateMyUser(user)" class="btn btn-sm btn-danger"
                    @click.prevent="deleteData(user.iduser)">
              Eliminar
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="users && users === 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3>No hay datos registrados</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">Crear nuevo</button>
        </div>
      </div>
    </div>
    <div v-else-if="users && users === 'error'">
      <h3>Error recuperando datos</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <h3>Información para el usuario</h3>
      <form @submit.prevent="saveData">
        <div class="form-group">
          <label for="name" class="mt-3 mb-3">Nombre</label>
          <input class="form-control" id="name" type="email" v-model="user.name" v-if="user.iduser !== ''" disabled
                 required>
          <input class="form-control" id="nameE" type="email" v-model="user.name" v-if="user.iduser === ''" required>
        </div>
        <div class="form-group">
          <label for="password" class="mt-3 mb-3">Password</label>
          <input class="form-control" id="password" type="password" v-model="user.password" required>
        </div>
        <div class="form-group">
          <label for="email" class="mt-3 mb-3">Email</label>
          <input class="form-control" id="email" type="email" v-model="user.email" v-if="user.iduser !== ''" disabled
                 required>
          <input class="form-control" id="emailE" type="email" v-model="user.email" v-if="user.iduser === ''" required>
        </div>
        <div class="form-group">
          <label for="street" class="mt-3 mb-3">Calle</label>
          <input class="form-control" id="street" type="text" v-model="user.street" required>
        </div>
        <div class="form-group">
          <label for="phone" class="mt-3 mb-3">Teléfono</label>
          <input class="form-control" id="phone" type="text" v-model="user.phone" required>
        </div>
        <div class="text-right">
          <button type="submit" class="btn-sm btn-primary">Guardar</button>
        </div>
      </form>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"
  import axios from 'axios'
  import config from "./../../config/config";
  import {handleError} from "../../utils/util"
  import {confirmMessage, successMessage} from "../../utils/handle-message"
  import {modelUser} from "../../services/model/model-user"

  export default {
    name: "users",
    metaInfo: {
      title: 'TSL cPanel',
      titleTemplate: (title) => {
        return `${title} | Usuarios`
      }
    },
    components: {CloseImageSVG},
    data() {
      return {
        user: modelUser,
        open: false
      }
    },
    computed: {
      users() {
        return this.$store.getters.getUsers
      }
    },
    created() {
      this.$store.dispatch('getUsers')
    },
    methods: {
      successRequest(title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getUsers')
        this.user = modelUser.reset()
        this.hideModal()
      },
      saveData() {
        axios({
          method: 'POST',
          url: `${config.api_url}/api/public/user/register`,
          headers: {
            Authorization: localStorage.token
          },
          data: this.user
        })
          .then(() => {
            this.successRequest("Creado", "Creado")
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      deleteData(iduser) {
        confirmMessage(this.$swal)
          .then(res => {
            if (res) {
              axios({
                method: 'DELETE',
                url: `${config.api_url}/api/user/delete`,
                headers: {
                  Authorization: localStorage.token
                },
                data: {iduser}
              })
                .then(() => {
                  this.successRequest("Creado", "Eliminado")
                })
                .catch(err => {
                  handleError(this.$swal, err)
                })
            }
          })
      },
      openModal(user, isCreate = true) {
        this.open = true
        if (!isCreate) {
          this.user = user
          this.user.password = ""
        }
        this.user.type = "Administrador"
      },
      hideModal() {
        this.open = false
        this.user = modelUser.reset()
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      },
      validateMyUser(user) {
        return !!(user.email !== JSON.parse(localStorage.getItem('user')).email)
      }
    },
  }
</script>

<style scoped>
  .image-content {
    width: 200px;
    height: 200px;
  }

  .image-content img {
    width: 100%;
  }
</style>
