<template>
  <div>

    <div v-if="users && users === 'loading'">
      <h3>{{wordEng.loading}}</h3>
    </div>
    <div v-else-if="users && users !== 'empty'">
      <h3 class="mb-2">List of clients</h3>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Email</th>
          <th scope="col">Date</th>
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
              {{wordEng.show}}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="users && users === 'empty'">
      <h3>{{wordEng.noData}}</h3>
    </div>
    <div v-else-if="users && users === 'error'">
      <h3>{{wordEng.error}}</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <h3>{{user.first_name}} {{user.last_name}}</h3>
      <table class="table table-custom mt-3">
        <tbody>
        <tr>
          <td scope="col" width="160px">Email</td>
          <td>{{user.email}}</td>
        </tr>
        <tr>
          <td scope="col">Address</td>
          <td>{{user.address}}</td>
        </tr>
        <tr>
          <td scope="col">City</td>
          <td>{{user.city}}</td>
        </tr>
        <tr>
          <td scope="col">State</td>
          <td>{{user.state}}</td>
        </tr>
        <tr>
          <td scope="col">Country</td>
          <td>{{user.country}}</td>
        </tr>
        <tr>
          <td scope="col">Country Code</td>
          <td>{{user.country_code}}</td>
        </tr>
        <tr>
          <td scope="col">Postal code</td>
          <td>{{user.postal_code}}</td>
        </tr>
        <tr>
          <td scope="col">Phone</td>
          <td>{{user.phone}}</td>
        </tr>
        <tr>
          <td scope="col">Date of creation</td>
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
  import {wordEng} from "../../utils/util"

  export default {
    name: "Client",
    metaInfo: {
      title: 'Gardens of America cPanel',
      titleTemplate: (title) => {
        return `${title} | Clients`
      }
    },
    components: {CloseImageSVG},
    data() {
      return {
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
      store.dispatch('getUsers', '?type=Client')
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
