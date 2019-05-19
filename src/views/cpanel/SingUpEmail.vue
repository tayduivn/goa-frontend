<template>
  <div>

    <div v-if="emails && emails === 'loading'">
      <h3>{{wordEng.loading}}</h3>
    </div>
    <div v-else-if="emails && emails !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">List of Emails</h3>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Email</th>
          <th scope="col">Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(email, index) of emails" :key="email.id">
          <th scope="col">{{++index}}</th>
          <td>{{email.email}}</td>
          <td>{{formaDate(email.inserted_at)}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="emails && emails === 'empty'">
      <h3>{{wordEng.noData}}</h3>
    </div>
    <div v-else-if="emails && emails === 'error'">
      <h3>{{wordEng.error}}</h3>
    </div>

  </div>
</template>

<script>
  import {wordEng} from "../../utils/util"

  export default {
    name: "emails",
    metaInfo: {
      title: 'Gardens of America cPanel',
      titleTemplate: (title) => {
        return `${title} | Emails`
      }
    },
    data() {
      return {
        wordEng: wordEng,
      }
    },
    computed: {
      emails() {
        return this.$store.getters.getEmails
      }
    },
    created() {
      this.$store.dispatch('getEmails')
    },
    methods: {
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
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
