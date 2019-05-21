<template>
  <div>

    <div v-if="users && users === 'loading'">
      <h3>{{wordEng.loading}}</h3>
    </div>
    <div v-else-if="users && users !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">List of users of panel control</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">{{wordEng.create}}</button>
        </div>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Date</th>
          <th scope="col" width="10"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) of users" :key="user.iduser">
          <th scope="col">{{++index}}</th>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{formaDate(user.inserted_at)}}</td>
          <td>
            <button v-if="checkMyUser(user)" class="btn btn-sm btn-danger" @click.prevent="deleteData(user.iduser)">
              {{wordEng.delete}}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="users && users === 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3>{{wordEng.noData}}</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">{{wordEng.create}}</button>
        </div>
      </div>
    </div>
    <div v-else-if="users && users === 'error'">
      <h3>{{wordEng.error}}</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <h3>Information of the user</h3>
      <form @submit.prevent="saveData">
        <div class="form-group">
          <label for="password" class="mt-3 mb-3">Password</label>
          <input class="form-control" id="password" type="password" v-model="user.password" required>
        </div>
        <div class="form-group">
          <label for="email" class="mt-3 mb-3">Email</label>
          <input class="form-control" id="email" type="email" v-model="user.email" :disabled="user.iduser !== ''"
                 required>
        </div>
        <div class="text-right">
          <button type="submit" class="btn-sm btn-primary">{{wordEng.save}}</button>
        </div>
      </form>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"
  import axios from 'axios'
  import config from "./../../config/config";
  import {handleError, wordEng} from "../../utils/util"
  import {confirmMessage, successMessage} from "../../utils/handle-message"
  import {modelUser} from "../../services/model/model-user"

  export default {
    name: "users",
    metaInfo: {
      title: `Gardens of America cPanel`,
      titleTemplate: (title) => {
        return `${title} | Users`
      }
    },
    components: {CloseImageSVG},
    data() {
      return {
        user: modelUser,
        open: false,
        wordEng: wordEng
      }
    },
    computed: {
      users() {
        return this.$store.getters.getUsers
      }
    },
    created() {
      this.$store.dispatch('getUsers', '?type=Administrador')
    },
    methods: {
      successRequest(title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getUsers')
        this.user = modelUser.reset()
        this.hideModal()
      },
      saveData() {
        axios({
          method: 'POST',
          url: `${config.api_url}/api/public/user/register`,
          headers: {
            Authorization: localStorage.token
          },
          data: this.user
        })
          .then(() => {
            this.successRequest(this.wordEng.created)
          })
          .catch(err => {
            handleError(this.$swal, err)
          })
      },
      deleteData(iduser) {
        confirmMessage(this.$swal)
          .then(res => {
            if (res) {
              axios({
                method: 'DELETE',
                url: `${config.api_url}/api/user/delete`,
                headers: {
                  Authorization: localStorage.token
                },
                data: {iduser}
              })
                .then(() => {
                  this.successRequest(this.wordEng.deleted)
                })
                .catch(err => {
                  handleError(this.$swal, err)
                })
            } else {
              this.submitForm = false
            }
          })
      },
      openModal(user, isCreate = true) {
        this.open = true
        if (!isCreate) {
          this.user = user
          this.user.password = ""
        }
        this.user.type = "Administrador"
      },
      hideModal() {
        this.open = false
        this.user = modelUser.reset()
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      },
      checkMyUser(user) {
        return !!(user.email !== JSON.parse(localStorage.getItem('user')).email)
      }
    },
  }
</script>

<style scoped>
  .image-content {
    width: 200px;
    height: 200px;
  }

  .image-content img {
    width: 100%;
  }
</style>
