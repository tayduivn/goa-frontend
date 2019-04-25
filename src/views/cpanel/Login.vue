<template>
  <div class="wrapper dark-header">
    <section class="login-inner">
      <div class="login-middle">
        <div class="login-details">
          <form>
            <div class="login-head d-flex justify-content-center align-items-center">
              <h2>cPanel</h2>
              <img src="./../../assets/logo.png" alt="tsl logo">
            </div>
            <hr class="mb-3">
            <label class="mt-3">
              <input type="text" placeholder="Email" v-model="user.email"/>
            </label>
            <label>
              <input type="password" placeholder="Password" v-model="user.password"/>
            </label>
            <div class="d-flex justify-content-between">
              <label class="width-reset"><input type="checkbox" v-model="isRemember"/><span>Recordarme</span></label>
              <span><router-link to="cpanel/forgot">¿Olvidó su contraseña?</router-link></span>
            </div>
            <hr>
            <div class="btn-sub text-center mt-4 mb-2">
              <button type="submit" class="pink-btn" @click.prevent="postLogin">Iniciar sesión</button>
            </div>
          </form>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import {modelUserLogin} from "../../services/model/model-user"
  import {handleError} from "../../utils/util"
  import {infoMessage} from "../../utils/handle-message"

  export default {
    name: 'cpanelLogin',
    metaInfo: {
      title: 'TSL cPanel',
      titleTemplate: '%s | Iniciar Sesión'
    },
    data() {
      return {
        user: modelUserLogin,
        isRemember: false
      }
    },
    created() {
      if (localStorage.getItem("email") !== null) {
        this.user.email = localStorage.getItem("email")
      }
      if (localStorage.getItem("password") !== null) {
        this.user.password = localStorage.getItem("password")
      }
    },
    methods: {
      postLogin() {
        this.user.type = "Administrador"
        console.log(JSON.stringify(this.user))
        this.$store.dispatch('login', this.user)
          .then((res) => {
            if (typeof res === "string") {
              infoMessage(this.$swal, null, res)
            } else {
              if (this.isRemember) {
                localStorage.setItem("email", this.user.email)
                localStorage.setItem("password", this.user.password)
              }
              this.$router.push('/cpanel/admin')
            }
            console.clear()
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      }
    },
  }
</script>

<style scoped>
  .login-head {
    height: 50px;
    margin-bottom: 6%;
  }

  .login-head img {
    height: 100%;
  }

  .wrapper::after {
    clear: both;
  }

  .wrapper::before, .wrapper::after {
    content: " ";
    display: table;
  }

  *::after, *::before {
    box-sizing: border-box;
  }

  .dark-header {
    background: #f2f0f1 none repeat scroll 0 0;
  }

  .wrapper {
    min-height: 100%;
    overflow: hidden;
    position: relative;
  }

  a, a:hover {
    text-decoration: none;
    color: #E2615C;
    transition: all 0.2s ease-in-out 0s;
    -webkit-transition: all 0.2s ease-in-out 0s;
  }

  input,
  button {
    transition: all 0.2s ease-in-out 0s;
    -webkit-transition: all 0.2s ease-in-out 0s;
  }

  .btn-grps .pink-btn:hover {
    background: #fff none repeat scroll 0 0 !important;
    color: #303030 !important;
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

  .btn-grps .pink-btn {
    display: inline-block;
    height: 51px;
    line-height: 51px;
    margin-left: 17px;
  }

  /* Login Page */
  .dark-header {
    background: #f2f0f1;
  }

  .dark-header header {
    background: #303030;
    position: absolute;
    width: 100%;
  }

  .btn-grps .pink-btn {
    height: 51px;
    display: inline-block;
    line-height: 51px;
    margin-left: 17px;
  }

  .btn-grps .pink-btn:hover {
    background: #fff !important;
    color: #303030 !important;
  }

  .login-middle {
    vertical-align: middle;
    display: table-cell;
    height: 100vh;
  }

  .login-details label {
    width: 100%;
    margin-bottom: 20px;
  }

  input:focus, input:hover {
    outline: none;
  }

  .login-details input[type="text"], .login-details input[type="password"] {
    width: 100%;
    padding-left: 10px;
    background: #f4f4f4;
    height: 40px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-weight: 600;
  }

  .login-details h2 {
    margin: 0;
    padding: 0 30px;
  }

  .login-details span {
    margin-left: 15px;
    vertical-align: top;
    font-weight: 400;
    font-size: 14px;
  }

  .btn-sub span a, .btn-sub span a:hover {
    color: #000;
    font-size: 15px;
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

  .login-details {
    max-width: 666px;
    margin: 0 auto;
    background: #fff;
    padding: 35px;
    border-radius: 7px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  }

  .login-inner {
    height: 100%;
    display: table;
    width: 100%;
  }

  .btn-sub span {
    margin-left: 25px;
  }

  @media (max-width: 767px) {
    /*KK*/
    .login-middle {
      display: block;
      height: auto;
      padding: 15px;
    }

    .dark-header header {
      position: relative;
    }

    .btn-grps .pink-btn {
      height: 35px;
      line-height: 35px;
      max-width: 200px;
      display: block;
      text-align: center;
      margin: 0px auto 13px
    }

    .btn-sub span {
      text-align: left;
      display: block;
      margin-left: 0;
      margin-top: 15px;
    }
  }

</style>
