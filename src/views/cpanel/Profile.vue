<template>
  <div>

    <div v-if="users && users === 'loading'">
      <h3>{{wordEng.loading}}</h3>
    </div>
    <div v-else-if="users && users !== 'empty'">
      <h3>Information of the profile</h3>
      <form @submit.prevent="editData">
        <div class="form-group">
          <label for="email" class="mt-3 mb-3">Email</label>
          <input class="form-control" id="email" type="email" v-model="users.email" v-if="users.iduser !== ''" disabled>
        </div>
        <div class="form-group">
          <label for="phone" class="mt-3 mb-3">Phone</label>
          <input class="form-control" id="phone" type="text" v-model="users.phone" required>
        </div>
        <div class="text-right">
          <button type="submit" class="btn-sm btn-primary" :disabled="!!submitForm">{{wordEng.save}}</button>
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
          <label for="new-password" class="mt-3 mb-3">New Password</label>
          <input class="form-control" id="new-password" type="password" v-model="newPassword" required>
        </div>
        <div class="text-right">
          <button type="submit" class="btn-sm btn-primary" :disabled="!!submitForm">{{wordEng.save}}</button>
        </div>
      </form>
      <hr class="mt-4 mb-4">
      <div class="text-right">
        <button type="submit" class="btn-sm btn-danger" @click.prevent="deleteData" :disabled="!!submitForm">
          Delete account
        </button>
      </div>
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
</template>

<script>
  import {handleError, wordEng} from "../../utils/util"
  import {confirmMessage, infoMessage, successMessage} from "../../utils/handle-message"
  import {apiUsers, getAxios} from "../../utils/endpoints"

  export default {
    name: "profileAdmin",
    metaInfo: {
      title: `Gardens of America cPanel`,
      titleTemplate: (title) => {
        return `${title} | My profile`
      }
    },
    data() {
      return {
        submitForm: false,
        passwordModel: "",
        oldPassword: "",
        newPassword: "",
        wordEng: wordEng,
      }
    },
    computed: {
      users() {
        return this.$store.getters.getUsers[0]
      }
    },
    created() {
      this.$store.dispatch('getUsers', `?id=${JSON.parse(localStorage.getItem('user')).id}`)
    },
    methods: {
      successRequest(title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getUsers', `?id=${JSON.parse(localStorage.getItem('user')).id}`)
      },
      editData() {
        this.submitForm = true
        confirmMessage(this.$swal, this.wordEng.youWant, '')
          .then(res => {
            if (res) {
              getAxios(apiUsers.all, 'PUT', this.users)
                .then(() => {
                  this.submitForm = false
                  this.successRequest(this.wordEng.profileUpdated)
                })
                .catch(err => {
                  this.submitForm = false
                  handleError(this.$swal, err)
                })
            } else {
              this.submitForm = false
            }
          })
      },
      editPass() {
        this.submitForm = true
        this.users.password = this.oldPassword
        this.users.newPassword = this.newPassword
        console.log(JSON.stringify(this.users))
        confirmMessage(this.$swal, this.wordEng.youWant, '')
          .then(res => {
            if (res) {
              getAxios(apiUsers.password, 'PUT', this.users)
                .then(() => {
                  this.submitForm = false
                  this.successRequest(this.wordEng.profileUpdated)
                  this.oldPassword = ''
                  this.newPassword = ''
                })
                .catch(err => {
                  this.submitForm = false
                  handleError(this.$swal, err)
                })
            } else {
              this.submitForm = false
            }
          })
      },
      deleteData() {
        confirmMessage(this.$swal, this.wordEng.youWantDelete)
          .then(res => {
            if (res) {
              getAxios(apiUsers.all, 'DELETE', {id: JSON.parse(localStorage.getItem('user')).id})
                .then(() => {
                  infoMessage(this.$swal, null, this.wordEng.profileDelete)
                  this.$store.dispatch('logout')
                    .then(() => {
                      this.$router.push('/cpanel/login')
                    })
                })
                .catch(err => {
                  handleError(this.$swal, err)
                })
            } else {
              this.submitForm = false
            }
          })
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      }
    },
  }
</script>
