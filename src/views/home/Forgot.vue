<template>
  <div class="forgot">
    <div class="forgot-content mt-5 mb-5 card p-4">
      <form @submit.prevent="send()">
        <h2 class="text-center">Recuperar contraseña</h2>
        <hr>
        <div class="form-group">
          <label for="name">Correo</label>
          <input v-model="userEmail" type="text" class="form-control" id="name" required>
          <small id="emailHelp" class="form-text text-muted">Nosotros no compartiremos tu correo con nadie.</small>
        </div>
        <div class="d-flex justify-content-between mt-3 mb-3">
          <h6>¿Ya tienes una cuenta?
            <router-link to="/login">LOGIN</router-link>
          </h6>
          <h6>¿No tiene una cuenta?
            <router-link to="/register">ÚNETE</router-link>
          </h6>
        </div>
        <hr>
        <div class="text-center mt-4 mb-4">
          <button type="submit">Recuperar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {handleError} from "../../utils/util"
  import config from "../../config/config"
  import axios from "axios"
  import {successMessage} from "../../utils/handle-message"

  export default {
    name: 'forgot',
    metaInfo: {
      title: 'TSL',
      titleTemplate: (title) => {
        return `${title} | Recuperar clave`
      }
    },
    data: function () {
      return {
        userEmail: ''
      }
    },
    methods: {
      send() {
        axios({
          method: 'GET',
          url: `${config.api_url}/api/public/user/forgot/${this.userEmail}`,
        })
          .then(() => {
            successMessage(this.$swal, null, "Mensaje enviado al correo ingresado")
            this.$router.push('login')
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .forgot-content {
    max-width: 700px;
    margin: 0 auto;

    button {
      background-color: #00b437;
      border: none;
      color: white;
      padding: 10px 80px;
    }

    form h6 a {
      color: dodgerblue;
    }
  }
</style>
