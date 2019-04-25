<template>
  <div>

    <div v-if="users && users === 'loading'">
      <h3>Cargando datos...</h3>
    </div>
    <div v-else-if="users && users !== 'empty'">
      <h3>Información de perfil</h3>
      <form @submit.prevent="editData">
        <div class="form-group">
          <label for="name" class="mt-3 mb-3">Nombre</label>
          <input class="form-control" id="name" type="email" v-model="users.name" disabled required>
        </div>
        <div class="form-group">
          <label for="email" class="mt-3 mb-3">Email</label>
          <input class="form-control" id="email" type="email" v-model="users.email" v-if="users.iduser !== ''" required>
        </div>
        <div class="form-group">
          <label for="street" class="mt-3 mb-3">Dirección</label>
          <input class="form-control" id="street" type="text" v-model="users.street" required>
        </div>
        <div class="form-group">
          <label for="phone" class="mt-3 mb-3">Teléfono</label>
          <input class="form-control" id="phone" type="text" v-model="users.phone" required>
        </div>
        <div class="text-right">
          <button type="submit" class="btn-sm btn-primary">Guardar</button>
        </div>
      </form>
      <hr>
      <h3>Password</h3>
      <form @submit.prevent="editPass">
        <div class="form-group">
          <label for="password" class="mt-3 mb-3">Actual Password</label>
          <input class="form-control" id="password" type="password" v-model="oldPassword" required>
        </div>
        <div class="form-group">
          <label for="new-password" class="mt-3 mb-3">Nuevo Password</label>
          <input class="form-control" id="new-password" type="password" v-model="newPassword" required>
        </div>
        <div class="text-right">
          <button type="submit" class="btn-sm btn-primary">Guardar</button>
        </div>
      </form>
      <hr class="mt-4 mb-4">
      <div class="text-right">
        <button type="submit" class="btn-sm btn-danger" @click.prevent="deleteData">
          Eliminar cuenta
        </button>
      </div>
    </div>
    <div v-else-if="users && users === 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3>No hay datos registrados</h3>
      </div>
    </div>
    <div v-else-if="users && users === 'error'">
      <h3>Error recuperando datos</h3>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import config from "./../../config/config";
  import {handleError} from "../../utils/util"
  import {confirmMessage, infoMessage, successMessage} from "../../utils/handle-message"

  export default {
    name: "profileAdmin",
    metaInfo: {
      title: 'TSL cPanel',
      titleTemplate: (title) => {
        return `${title} | Mi perfil`
      }
    },
    data() {
      return {
        passwordModel: "",
        oldPassword: "",
        newPassword: ""
      }
    },
    computed: {
      users() {
        return  this.$store.getters.getProfile
      }
    },
    created() {
      this.$store.dispatch('getProfile', JSON.parse(localStorage.getItem('user')).iduser)
    },
    methods: {
      successRequest (title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getProfile')
        console.clear()
      },
      editData() {
        confirmMessage(this.$swal, 'Desea actualizar los datos', '')
          .then(res => {
            if (res) {
              axios({
                method: 'PUT',
                url: `${config.api_url}/api/user/update`,
                headers: {
                  Authorization: localStorage.token
                },
                data: this.users
              })
                .then(() => {
                  this.successRequest("Creado", "Perfil Actualizado")
                })
                .catch(err => {
                  handleError(this.$swal, err)
                })
            }
          })
      },
      editPass() {
        this.users.password = this.oldPassword
        this.users.newPassword = this.newPassword
        console.log(JSON.stringify(this.users))
        confirmMessage(this.$swal, 'Desea actualizar los datos', '')
          .then(res => {
            if (res) {
              axios({
                method: 'PUT',
                url: `${config.api_url}/api/user/updatePassword`,
                headers: {
                  Authorization: localStorage.token
                },
                data: this.users
              })
                .then(() => {
                  this.successRequest("Creado", "Perfil Actualizado")
                  this.oldPassword = ''
                  this.newPassword = ''
                })
                .catch(err => {
                  handleError(this.$swal, err)
                })
            }
          })
      },
      deleteData() {
        confirmMessage(this.$swal, 'Desea eliminar su cuenta')
          .then(res => {
            if (res) {
              const iduser = JSON.parse(localStorage.getItem('user')).iduser
              axios({
                method: 'DELETE',
                url: `${config.api_url}/api/user/delete`,
                headers: {
                  Authorization: localStorage.token
                },
                data: {iduser}
              })
                .then(() => {
                  infoMessage(this.$swal, null, "Cuenta eliminada")
                  this.$store.dispatch('logout')
                    .then(() => {
                      this.$router.push('/')
                    })
                })
                .catch(err => {
                  handleError(this.$swal, err)
                })
            }
          })
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      }
    },
  }
</script>
