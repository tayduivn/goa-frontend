<template>
  <div class="profile">
    <div class="profile-content">
      <div v-if="users && users === 'loading'">
        <h3>{{wordEng.loading}}</h3>
      </div>
      <div class="row mb-4" v-if="levelUser === 'Transportista'">
        <div v-if="transportService && transportService === 'loading'">
          <h3>{{wordEng.loading}}</h3>
        </div>
        <form v-else-if="transportService && transportService !== 'empty'" class="col-md-12">
          <h3>Información como transportista</h3>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name_service" class="mt-3 mb-3">Nombre de su servicio</label>
                <input class="form-control" id="name_service" type="text" v-model="transportService.name_service"
                       required>
              </div>
              <div class="form-group">
                <label for="size" class="mt-3 mb-3">Descripción del tamaño de envío (Cm x Cm)</label>
                <input class="form-control" id="size" type="text" v-model="transportService.size" required>
              </div>
              <div class="form-group">
                <label for="distance" class="mt-3 mb-3">Distancia (Km) o área (Localidad a Localidad)</label>
                <input class="form-control" id="distance" type="text" v-model="transportService.distance" required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="weight" class="mt-3 mb-3">Peso máximo (Kg)</label>
                <input class="form-control" id="weight" type="number" v-model="transportService.weight"
                       required>
              </div>
              <div class="form-group">
                <label for="prom_price" class="mt-3 mb-3">Descripción del precio promedio</label>
                <input class="form-control" id="prom_price" type="text" v-model="transportService.prom_price" required>
              </div>
            </div>
          </div>
          <div class="text-right">
            <button type="submit" class="btn-sm btn-primary" @click.prevent="editTransportService">
              Guardar
            </button>
          </div>
        </form>
        <div v-else-if="transportService && transportService === 'empty'">
          <div class="d-flex justify-content-between mb-3">
            <h3>{{wordEng.noData}}</h3>
          </div>
        </div>
        <div v-else-if="transportService && transportService === 'error'">
          <h3>{{wordEng.error}}</h3>
        </div>
      </div>
      <div v-if="users !== 'empty'" class="row">
        <form @submit.prevent="editData" class="col-md-6 col-sm-12">
          <h3>Información de perfil</h3>
          <div class="form-group">
            <label for="name" class="mt-3 mb-3">Nombre de Usuario</label>
            <input class="form-control" id="name" type="text" v-model="users.name" disabled required>
          </div>
          <div class="form-group">
            <label for="person_name" class="mt-3 mb-3">Nombre</label>
            <input class="form-control" id="person_name" type="text" v-model="users.person_name" required>
          </div>
          <div class="form-group">
            <label for="person_last_name" class="mt-3 mb-3">Apellido</label>
            <input class="form-control" id="person_last_name" type="text" v-model="users.person_last_name" required>
          </div>
          <div class="form-group">
            <label for="email" class="mt-3 mb-3">Correo</label>
            <input class="form-control" id="email" type="email" v-model="users.email" v-if="users.iduser !== ''"
                   required>
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
        <form @submit.prevent="editPass" class="col-md-6 col-sm-12">
          <h3>Actualizar Password</h3>
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
        <hr class="col-md-12 mt-4 mb-4 p-0">
        <form @submit.prevent="editPass" class="col-md-12">
          <div class="text-right">
            <button type="submit" class="btn-sm btn-danger" @click.prevent="deleteData">
              Eliminar cuenta
            </button>
          </div>
        </form>
      </div>
      <div v-else-if="users && users === 'empty'">
        <div class="d-flex justify-content-between mb-3">
          <h3>{{wordEng.noData}}</h3>
        </div>
      </div>
      <div v-else-if="users && users === 'error'">
        <h3>{{wordEng.error}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from "../../config/config";
  import {handleError} from "../../utils/util"
  import {confirmMessage, infoMessage, successMessage} from "../../utils/handle-message"

  export default {
    name: "profileUser",
    metaInfo: {
      title: 'TSL',
      titleTemplate: (title) => {
        return `${title} | Mi perfil`
      }
    },
    data() {
      return {
        passwordModel: "",
        oldPassword: "",
        newPassword: "",
      }
    },
    computed: {
      users() {
        return this.$store.getters.getProfile
      },
      levelUser() {
        return this.$store.getters.getLevelUser
      },
      transportService() {
        if (this.levelUser !== 'Transportista') return
        return this.$store.getters.getTransportService
      }
    },
    created() {
      this.$store.dispatch('getProfile', JSON.parse(localStorage.getItem('user')).iduser)
      if (this.levelUser === 'Transportista') {
        this.$store.dispatch('getTransportService', JSON.parse(localStorage.getItem('user')).idtransport)
      }
    },
    methods: {
      successRequest(title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getProfile')
        console.clear()
      },
      editTransportService() {
        confirmMessage(this.$swal, 'Desea actualizar los datos', '')
          .then(res => {
            if (res) {
              axios({
                method: 'PUT',
                url: `${config.api_url}/api/transportservice/update`,
                headers: {
                  Authorization: localStorage.token
                },
                data: this.transportService
              })
                .then(() => {
                  this.successRequest("Creado", "Datos actualizados")
                })
                .catch(err => {
                  handleError(this.$swal, err)
                })
            }
          })
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
                  this.successRequest("Creado", "Password Actualizado")
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
      },
    },
  }
</script>

<style scoped lang="scss">
  .profile {
    background-color: white;
    padding: 50px;

    .profile-content {
      max-width: 1024px;
      margin: 0 auto;
    }

    form {
      h3 {
        background-color: #cce9f8;
        font-size: 1.2rem;
        padding: 10px 10px;
      }
    }
  }
</style>
