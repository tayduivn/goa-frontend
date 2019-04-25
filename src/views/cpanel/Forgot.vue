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
            <router-link to="/cpanel">LOGIN</router-link>
          </h6>
        </div>
        <hr>
        <div class="btn-sub text-center mt-4 mb-2">
          <button type="submit" class="pink-btn">Recuperar</button>
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
    name: 'cpanel-forgot',
    metaInfo: {
      title: 'TSL cPanel',
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
            this.$router.push('/cpanel')
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
    max-width: 500px;
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

    .pink-btn {
      background: #e2615c none repeat scroll 0 0;
      border: medium none;
      border-radius: 2px;
      box-shadow: 0 2px 0 #b2534f;
      color: #fff;
      font-size: 18px;
      height: 48px;
      padding: 0 35px;
    }

    .btn-sub button {
      border-bottom: 2px solid #b2534f;
      box-shadow: none;
      border-radius: 3px;
    }

    .btn-sub button:hover {
      background: #b2534f;
      border-radius: 3px;
      box-shadow: none;
    }
  }
</style>
