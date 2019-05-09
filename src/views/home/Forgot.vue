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
            <router-link to="/login">{{wordEng.logIn}}</router-link>
          </h6>
          <h6>{{wordEng.notAccount}}
            <router-link to="/register">Join up</router-link>
          </h6>
        </div>
        <hr>
        <div class="btn-sub text-center mt-4 mb-2">
          <button type="submit" class="pink-btn">{{wordEng.recover}}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {handleError, wordEng} from "../../utils/util"
  import config from "../../config/config"
  import axios from "axios"
  import {successMessage} from "../../utils/handle-message"

  export default {
    name: 'cpanel-forgot',
    metaInfo: {
      title: this.wordEng.company,
      titleTemplate: (title) => {
        return `${title} | ${wordEng.recoverPass}`
      }
    },
    data: function () {
      return {
        userEmail: '',
        wordEng: wordEng,
      }
    },
    methods: {
      send() {
        axios({
          method: 'GET',
          url: `${config.api_url}/api/public/user/forgot/${this.userEmail}`,
        })
          .then(() => {
            successMessage(this.$swal, null, this.wordEng.sendMessage)
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
