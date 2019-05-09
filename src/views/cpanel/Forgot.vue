<template>
  <div class="forgot">
    <div class="forgot-content mt-5 mb-5 card p-4">
      <form @submit.prevent="send()">
        <h2 class="text-center">{{wordEng.recoverPass}}</h2>
        <hr>
        <div class="form-group">
          <label for="name">Email</label>
          <input v-model="userEmail" type="text" class="form-control" id="name" required>
          <small id="emailHelp" class="form-text text-muted">We will not share your mail with anyone.</small>
        </div>
        <div class="d-flex justify-content-between mt-3 mb-3">
          <h6>{{wordEng.alreadyAccount}}
            <router-link to="/cpanel">{{wordEng.logIn}}</router-link>
          </h6>
        </div>
        <hr>
        <div class="btn-sub text-center mt-4 mb-2">
          <button type="submit" class="pink-btn" :disabled="!!submitForm">{{wordEng.recover}}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {handleError, wordEng} from "../../utils/util"
  import {successMessage} from "../../utils/handle-message"
  import {apiUsers, getAxios} from "../../utils/endpoints"

  export default {
    name: 'cpanel-forgot',
    metaInfo: {
      title: 'Gardens of America cPanel',
      titleTemplate: (title) => {
        return `${title} | Recover`
      }
    },
    data: function () {
      return {
        userEmail: '',
        wordEng: wordEng,
        submitForm: false,
      }
    },
    methods: {
      send() {
        this.submitForm = true
        getAxios(apiUsers.forgot, 'POST', {email: this.userEmail})
          .then(() => {
            this.submitForm = false
            successMessage(this.$swal, null, this.wordEng.sendMessage)
            this.$router.push('/cpanel/login')
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
