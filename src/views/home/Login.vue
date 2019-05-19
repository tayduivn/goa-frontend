<template>
  <div class="login">
    <div class="login-content mt-5 mb-5 card p-4">
      <form @submit.prevent="send()">
        <h2>LOG IN</h2>
        <hr>
        <h5 class="mt-4 mb-4">¿You not have account?
          <router-link to="/register">JOIN</router-link>
        </h5>
        <div class="form-group">
          <label for="name">Email</label>
          <input v-model="user.email" type="text" class="form-control" id="name">
        </div>
        <div class="form-group">
          <label for="pass">Password</label>
          <input v-model="user.password" type="password" class="form-control" id="pass">
        </div>
        <div class="d-flex justify-content-between align-items-center mt-4 mb-4">
          <label class="width-reset mb-0">
            <input class="mr-2" type="checkbox" v-model="isRemember"/><span>Remember me</span>
          </label>
          <h5>
            <router-link to="/forgot">¿Forget your password?</router-link>
          </h5>
        </div>
        <hr>
        <div class="text-center mt-4 mb-2">
          <button type="submit" :disabled="!!submitForm">Log in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  import {handleError, wordEng} from "../../utils/util"
  import {infoMessage} from "../../utils/handle-message"

  export default {
    name: 'login',
    metaInfo: {
      title: 'Gardens of America',
      titleTemplate: (title) => {
        return `${title} | Log in`
      }
    },
    data: function () {
      return {
        user: {
          email: '',
          password: ''
        },
        isRemember: false,
        wordEng: wordEng,
        submitForm: false,
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
      send() {
        this.submitForm = true
        this.user.type = "Cliente"
        this.$store.dispatch('login', this.user)
          .then((res) => {
            if (typeof res === "string") {
              this.submitForm = false
              infoMessage(this.$swal, null, res)
            } else {
              if (this.isRemember) {
                localStorage.setItem("email", this.user.email)
                localStorage.setItem("password", this.user.password)
              }
              const id = res.data.data.user.id
              this.$store.dispatch('getCartStatus', `?userId=${id}&status=current`)
                .then((res) => {
                  localStorage.setItem('cartId', res.cart_id)
                  this.$router.push('home')
                })
                .catch(err => {
                  this.submitForm = false
                  handleError(this.$swal, err)
                })
            }
          })
          .catch(err => {
            this.submitForm = false
            handleError(this.$swal, err)
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-content {
    max-width: 700px;
    margin: 0 auto;

    button {
      background-color: #00b437;
      border: none;
      color: white;
      padding: 10px 80px;
    }

    form h5 a {
      color: dodgerblue;
    }
  }
</style>
