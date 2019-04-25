<template>
  <div>

    <div v-if="users && users === 'loading'">
      <h3>Cargando datos...</h3>
    </div>
    <div v-else-if="users && users !== 'empty'">
      <h3 class="mb-2">Lista de clientes</h3>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Correo</th>
          <th scope="col">Fecha</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) of users" :key="user.id">
          <th scope="col">{{++index}}</th>
          <td>{{user.email}}</td>
          <td>{{formaDate(user.user_inserted_at)}}</td>
          <td width="50px">
            <button class="btn btn-sm btn-primary" @click="openModal(user)">
              Mostrar
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="users && users === 'empty'">
      <h3>No hay datos registrados</h3>
    </div>
    <div v-else-if="users && users === 'error'">
      <h3>Error recuperando datos</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <h3>{{user.first_name}} {{user.last_name}}</h3>
      <table class="table table-custom mt-3">
        <tbody>
        <tr>
          <td scope="col" width="160px">Correo</td>
          <td>{{user.email}}</td>
        </tr>
        <tr>
          <td scope="col">Dirección</td>
          <td>{{user.address}}</td>
        </tr>
        <tr>
          <td scope="col">Teléfono</td>
          <td>{{user.phone}}</td>
        </tr>
        <tr>
          <td scope="col">Mensaje</td>
          <td v-if="user.message === null">Sin mensaje</td>
          <td v-else>{{user.message}}</td>
        </tr>
        <tr>
          <td scope="col">Fecha de creación</td>
          <td>{{formaDate(user.user_inserted_at)}}</td>
        </tr>
        </tbody>
      </table>
    </vue-modaltor>

  </div>
</template>

<script>
  import {modelUser} from "../../services/model/model-user"
  import CloseImageSVG from "../../components/CloseImageSVG"
  import store from './../../store/store'

  export default {
    name: "Client",
    metaInfo: {
      title: 'TSL cPanel',
      titleTemplate: (title) => {
        return `${title} | Clientes`
      }
    },
    components: {CloseImageSVG},
    data() {
      return {
        user: modelUser,
        open: false,
      }
    },
    computed: {
      users() {
        return this.$store.getters.getUsers
      }
    },
    created() {
      store.dispatch('getUsers', '?type=Cliente')
    },
    methods: {
      openModal(user) {
        this.open = true
        this.user = user
      },
      hideModal() {
        this.open = false
        this.user = modelUser.reset()
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      }
    },
  }
</script>

<style scoped>
</style>
