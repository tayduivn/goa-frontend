<template>
  <div>

    <div v-if="categories && categories === 'loading'">
      <h3>{{wordEng.loading}}</h3>
    </div>
    <div v-else-if="categories && categories !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">List of Categories</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">{{wordEng.create}}</button>
        </div>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col" width="10"></th>
          <th scope="col" width="10"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(category, index) of categories" :key="category.id">
          <th scope="col">{{++index}}</th>
          <td>{{category.name}}</td>
          <td>{{formaDate(category.inserted_at)}}</td>
          <td>
            <button class="btn btn-sm btn-success" @click.prevent="openModal(category)">
              {{wordEng.edit}}
            </button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" @click.prevent="deleteData(category.id)" :disabled="!!submitForm">
              {{wordEng.delete}}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="categories && categories === 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3>{{wordEng.noData}}</h3>
        <div class="text-right">
          <button class="btn-sm btn-primary" @click.prevent="openModal(null)">{{wordEng.save}}</button>
        </div>
      </div>
    </div>
    <div v-else-if="categories && categories === 'error'">
      <h3>{{wordEng.error}}</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <h3>Information of the category</h3>
      <form @submit.prevent="sendData">
        <div class="form-group">
          <label for="name" class="mt-3 mb-3">Name</label>
          <input class="form-control" id="name" type="text" v-model="category.name" required>
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
  import {modelCategory} from "../../services/model/model-categories"
  import {apiCategories, getAxios} from "../../utils/endpoints"

  export default {
    name: "categories",
    metaInfo: {
      title: 'Gardens of America cPanel',
      titleTemplate: (title) => {
        return `${title} | Categories`
      }
    },
    components: {CloseImageSVG},
    data() {
      return {
        submitForm: false,
        category: modelCategory,
        open: false,
        wordEng: wordEng,
      }
    },
    computed: {
      categories() {
        return this.$store.getters.getCategories
      }
    },
    created() {
      this.$store.dispatch('getCategories')
    },
    methods: {
      sendData() {
        this.submitForm = true
        if (this.category.id === '') {
          this.saveData()
        } else {
          this.editData()
        }
      },
      successRequest(title) {
        this.submitForm = false
        successMessage(this.$swal, title)
        this.$store.dispatch('getCategories')
        this.hideModal()
      },
      saveData() {
        getAxios(apiCategories.all, 'POST', this.category)
          .then(() => {
            this.successRequest(this.wordEng.created)
          })
          .catch(err => {
            this.submitForm = false
            handleError(this.$swal, err)
          })
      },
      editData() {
        getAxios(apiCategories.all, 'PUT', this.category)
          .then(() => {
            this.successRequest(this.wordEng.edited)
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
              getAxios(apiCategories.all, 'DELETE', {id})
                .then(() => {
                  this.successRequest(this.wordEng.deleted)
                })
                .catch(err => {
                  this.submitForm = false
                  handleError(this.$swal, err)
                })
            }
          })
      },
      openModal(category) {
        this.open = true
        if (category !== null) {
          this.category = category
        }
      },
      hideModal() {
        this.open = false
        this.category = modelCategory.reset()
      },
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
