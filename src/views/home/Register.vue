<template>
  <div class="register">
    <div class="card mt-5 mb-5 register-content">
      <h2 class="mb-4 p-4">Únete a TSL</h2>
      <h4 class="pr-4 pl-4 pb-4">Elige entre...</h4>
      <div class="row register-user-type">
        <button @click="activeClient(true)" class="col-md-6" :class="{active: isClient}">
          Cliente
        </button>
        <button @click="activeClient(false)" class="col-md-6" :class="{active: isTransport}">
          Transportista
        </button>
      </div>
      <form v-if="isClient || isTransport" @submit.prevent="send()" class="p-4">
        <div v-if="isTransport" class="form-group">
          <label for="name_truck">Alias como transportista</label>
          <input v-model="userTransport.name_truck" type="text" class="form-control" id="name_truck" required>
        </div>
        <div class="form-group">
          <label for="person_name">Nombre</label>
          <input v-model="user.person_name" type="text" class="form-control" id="person_name" required>
        </div>
        <div class="form-group">
          <label for="person_last_name">Apellido</label>
          <input v-model="user.person_last_name" type="text" class="form-control" id="person_last_name" required>
        </div>
        <div class="form-group">
          <label for="name">Nombre de usuario</label>
          <input v-model="user.name" type="text" class="form-control" id="name" required>
        </div>
        <div class="form-group">
          <label for="phone">Número de teléfono</label>
          <input v-model="user.phone" type="tel" name="phone" class="form-control" id="phone" required>
        </div>
        <div class="form-group">
          <label for="direction">Dirección</label>
          <input v-model="user.street" type="text" name="street" class="form-control" id="direction" required>
        </div>
        <div class="form-group">
          <label for="email">Correo</label>
          <input v-model="user.email" type="email" name="email" class="form-control" id="email" required>
        </div>
        <div class="form-group">
          <label for="password1">Contraseña</label>
          <input v-model="user.password" type="password" class="form-control" id="password1"
                 required pattern=".{6,}"
                 onchange="this.setCustomValidity(this.validity.patternMismatch ? 'Mínimo de 6 caracteres' : '');
                   if(this.checkValidity()) form.password_two.pattern = this.value;">
          <small class="form-text text-muted">Nunca compartas tu contraseña con nadie.</small>
        </div>
        <div class="form-group">
          <label for="password_two">Ingrese de nuevo la Contraseña</label>
          <input type="password" class="form-control" id="password_two"
                 required pattern="^\S{6,}$"
                 onchange="this.setCustomValidity(this.validity.patternMismatch ? 'La contraseña no es igual' : '');">
        </div>
        <button type="submit" class="btn btn-primary">Unete</button>
        <p class="mt-5 register-politics">Al oprimir Únete a TSL, usted acepta los términos y condiciones del
          <a href="/#">Acuerdo de usuario de TSL</a> & <a href="/#">Política de Privacidad</a>.
        </p>
      </form>
    </div>
  </div>
</template>

<script>
  import {successMessage} from "../../utils/handle-message"
  import {handleError} from "../../utils/util"
  import config from "../../config/config"
  import axios from "axios"
  import {modelTransportService} from "../../services/model/model-transport-service"

  export default {
    name: 'register',
    metaInfo: {
      title: 'TSL',
      titleTemplate: (title) => {
        return `${title} | Registrar`
      }
    },
    data: function () {
      return {
        isTransport: false,
        isClient: false,
        user: {
          name: '',
          person_name: '',
          person_last_name: '',
          password: '',
          phone: '',
          street: '',
          email: '',
          type: ''
        },
        userTransport: {
          user_iduser: '',
          name_truck: '',
        },
        serviceTransport: modelTransportService
      }
    },
    methods: {
      activeClient(isClient) {
        this.isClient = isClient
        this.isTransport = !isClient
      },
      registerServiceTransport() {
        this.serviceTransport.name_service = "Sin nombre"
        this.serviceTransport.distance = "0"
        this.serviceTransport.prom_price = "0"
        this.serviceTransport.weight = "0"
        this.serviceTransport.size = "0"
        axios({
          method: 'POST',
          url: `${config.api_url}/api/public/transportservice/register`,
          data: this.serviceTransport
        })
          .then(() => {
            successMessage(this.$swal, null, "Registrado")
            this.$router.push('profile')
          })
          .catch(err => {
            handleError(this.$swal, err, "Error registrando datos para el transportista")
          })
      },
      registerTransport() {
        axios({
          method: 'POST',
          url: `${config.api_url}/api/public/transport/register`,
          data: this.userTransport
        })
          .then(res => {
            this.serviceTransport.transport_idtransport = res.data.data.idTransport
            this.registerServiceTransport()
          })
          .catch(err => {
            handleError(this.$swal, err, "Error registrando datos para el transportista")
          })
      },
      send() {
        this.user.type = this.isClient ? "Cliente" : "Transportista"
        console.log(JSON.stringify(this.user))
        axios({
          method: 'POST',
          url: `${config.api_url}/api/public/user/register`,
          data: this.user
        })
          .then((res) => {
            if (this.isTransport) {
              this.userTransport.user_iduser = res.data.data.idUser
              this.registerTransport()
            } else {
              successMessage(this.$swal, null, "Registrado")
              this.$router.push('ship')
            }
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .register-content {
    max-width: 700px;
    margin: 0 auto;

    h2 {
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 15px !important;
    }

    .register-user-type {
      margin: 0;

      button {
        border: 1px solid #ececec;
        background-color: #fcfcfc;
        outline: none;
        font-size: 1.4rem;
        padding: 30px;
      }

      button:hover {
        background-color: #f2f2f2;
      }

      button.active {
        background-color: #e3e3e3;
      }
    }

    .register-politics {
      line-height: 2rem;

      a {
        color: #3d7ab1;
      }
    }
  }
</style>
