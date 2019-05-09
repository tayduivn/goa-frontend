<template>
  <div>

    <div v-if="users && users === 'loading'">
      <h3>{{wordEng.loading}}</h3>
    </div>
    <div v-else-if="users && users !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">{{wordEng.listUsers}}</h3>
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
            <button v-if="checkMyUser(user)" class="btn btn-sm btn-danger" @click.prevent="deleteData(user.user_id)"
                    :disabled="!!submitForm">
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
      <h3>{{wordEng.infoUser}}</h3>
      <form @submit.prevent="saveData">
        <div class="form-group">
          <label for="email" class="mt-3 mb-3">Email</label>
          <input class="form-control" id="email" type="email" v-model="user.email" :disabled="user.id !== ''"
                 required>
        </div>
        <div class="form-group">
          <label for="password1">Password</label>
          <input v-model="user.password" type="password" class="form-control" id="password1"
                 required pattern=".{6,}"
                 onchange="this.setCustomValidity(this.validity.patternMismatch ? 'Mínimo de 6 caracteres' : '');
                   if(this.checkValidity()) form.password_two.pattern = this.value;">
          <small class="form-text text-muted">{{wordEng.sharePass}}</small>
        </div>
        <div class="form-group">
          <label for="password_two">{{wordEng.enterPass}}</label>
          <input type="password" class="form-control" id="password_two"
                 required pattern="^\S{6,}$"
                 onchange="this.setCustomValidity(this.validity.patternMismatch ? 'The password not match' : '');">
        </div>
        <div class="text-right">
          <button type="submit" class="btn-sm btn-primary" :disabled="!!submitForm">{{wordEng.save}}</button>
        </div>
      </form>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"
  import {handleError, wordEng} from "../../utils/util"
  import {confirmMessage, successMessage} from "../../utils/handle-message"
  import {modelUser} from "../../services/model/model-user"
  import {apiUsers, getAxios} from "../../utils/endpoints"

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
        submitForm: false,
        user: modelUser,
        open: false,
        wordEng: wordEng,
      }
    },
    computed: {
      users() {
        return this.$store.getters.getUsers
      }
    },
    created() {
      this.user.role_id = 1
      this.$store.dispatch('getUsers', '?type=Administrador')
    },
    methods: {
      successRequest(title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getUsers', '?type=Administrador')
        this.hideModal()
      },
      saveData() {
        this.submitForm = true
        getAxios(apiUsers.register, 'POST', this.user)
          .then(() => {
            this.submitForm = false
            this.successRequest("Creado", "Creado")
          })
          .catch(err => {
            this.submitForm = false
            handleError(this.$swal, err)
          })
      },
      deleteData(id) {
        this.submitForm = true
        confirmMessage(this.$swal)
          .then(res => {
            if (res) {
              getAxios(apiUsers.all, 'DELETE', {id})
                .then(() => {
                  this.submitForm = false
                  this.successRequest("Creado", "Eliminado")
                })
                .catch(err => {
                  this.submitForm = false
                  handleError(this.$swal, err)
                })
            }
          })
      },
      openModal(user) {
        this.open = true
        if (user !== null) {
          this.user = user
          this.user.password = ""
        }
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
