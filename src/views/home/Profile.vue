<template>
  <div class="profile">
    <div class="profile-content">
      <div v-if="users && users === 'loading'">
        <h3>{{wordEng.loading}}</h3>
      </div>
      <div v-if="users !== 'empty'" class="row">
        <form @submit.prevent="editData" class="col-md-6 col-sm-12">
          <h3>Information of the profile</h3>
          <div class="form-group">
            <label for="name" class="mt-3 mb-3">Name of user</label>
            <input class="form-control" id="name" type="text" v-model="users.name" disabled required>
          </div>
          <div class="form-group">
            <label for="person_name" class="mt-3 mb-3">Name</label>
            <input class="form-control" id="person_name" type="text" v-model="users.person_name" required>
          </div>
          <div class="form-group">
            <label for="person_last_name" class="mt-3 mb-3">LastName</label>
            <input class="form-control" id="person_last_name" type="text" v-model="users.person_last_name" required>
          </div>
          <div class="form-group">
            <label for="email" class="mt-3 mb-3">Email</label>
            <input class="form-control" id="email" type="email" v-model="users.email" v-if="users.iduser !== ''"
                   required>
          </div>
          <div class="form-group">
            <label for="street" class="mt-3 mb-3">Address</label>
            <input class="form-control" id="street" type="text" v-model="users.street" required>
          </div>
          <div class="form-group">
            <label for="phone" class="mt-3 mb-3">Phone</label>
            <input class="form-control" id="phone" type="text" v-model="users.phone" required>
          </div>
          <div class="text-right">
            <button type="submit" class="btn-sm btn-primary">{{wordEng.save}}</button>
          </div>
        </form>
        <form @submit.prevent="editPass" class="col-md-6 col-sm-12">
          <h3>Update Password</h3>
          <div class="form-group">
            <label for="password" class="mt-3 mb-3">Actual Password</label>
            <input class="form-control" id="password" type="password" v-model="oldPassword" required>
          </div>
          <div class="form-group">
            <label for="new-password" class="mt-3 mb-3">New Password</label>
            <input class="form-control" id="new-password" type="password" v-model="newPassword" required>
          </div>
          <div class="text-right">
            <button type="submit" class="btn-sm btn-primary">{{wordEng.save}}</button>
          </div>
        </form>
        <hr class="col-md-12 mt-4 mb-4 p-0">
        <form @submit.prevent="editPass" class="col-md-12">
          <div class="text-right">
            <button type="submit" class="btn-sm btn-danger" @click.prevent="deleteData">
              {{wordEng.profileDelete}}
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
  import {handleError, wordEng} from "../../utils/util"
  import {confirmMessage, infoMessage, successMessage} from "../../utils/handle-message"

  export default {
    name: "profileUser",
    metaInfo: {
      title: 'Gardens of America',
      titleTemplate: (title) => {
        return `${title} | My profile`
      }
    },
    data() {
      return {
        passwordModel: "",
        oldPassword: "",
        newPassword: "",
        wordEng: wordEng,
      }
    },
    computed: {
      users() {
        return this.$store.getters.getProfile
      },
      levelUser() {
        return this.$store.getters.getLevelUser
      },
    },
    created() {
      this.$store.dispatch('getProfile', JSON.parse(localStorage.getItem('user')).iduser)
    },
    methods: {
      successRequest(title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getProfile')
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
                  this.successRequest(this.wordEng.profileUpdated)
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
                  this.successRequest(this.wordEng.profileUpdated)
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
        confirmMessage(this.$swal, this.wordEng.profileDelete)
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
