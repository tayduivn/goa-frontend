<template>
  <div>

    <div v-if="reviews && reviews === 'loading'">
      <h3>{{wordEng.loading}}</h3>
    </div>
    <div v-else-if="reviews && reviews !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">List of Reviews</h3>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">User</th>
          <th scope="col">Date</th>
          <th scope="col" width="10"></th>
          <th scope="col" width="10"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(review, index) of reviews" :key="review.review_id">
          <th scope="col">{{++index}}</th>
          <td>{{review.email}}</td>
          <td>{{formaDate(review.review_inserted_at)}}</td>
          <td>
            <button class="btn btn-sm btn-primary" @click.prevent="openModal(review)">
              {{wordEng.show}}
            </button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" @click.prevent="deleteData(review.review_id)">
              {{wordEng.delete}}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="reviews && reviews === 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3>{{wordEng.noData}}</h3>
      </div>
    </div>
    <div v-else-if="reviews && reviews === 'error'">
      <h3>{{wordEng.error}}</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <h3>Information of the reviews</h3>
      <table class="table table-custom mt-3 mb-4">
        <tbody>
        <tr>
          <td scope="col" width="250px">User</td>
          <td>{{review.email}}</td>
        </tr>
        <tr>
          <td scope="col" width="250px">Name of product</td>
          <td>{{review.name}}</td>
        </tr>
        <tr>
          <td scope="col" width="250px">Message</td>
          <td>{{review.message}}</td>
        </tr>
        <tr>
          <td scope="col" width="250px">Starts</td>
          <td>{{review.stars}}</td>
        </tr>
        </tbody>
      </table>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"
  import {handleError, wordEng} from "../../utils/util"
  import {confirmMessage, successMessage} from "../../utils/handle-message"
  import {modelReviews} from "../../services/model/model-reviews"
  import {apiReviews, getAxios} from "../../utils/endpoints"

  export default {
    name: "Reviews",
    components: {CloseImageSVG},
    metaInfo: {
      title: `${this.wordEng.company} cPanel`,
      titleTemplate: (title) => {
        return `${title} | Reviews`
      }
    },
    data() {
      return {
        review: modelReviews,
        open: false,
        wordEng: wordEng,
      }
    },
    computed: {
      reviews() {
        return this.$store.getters.getReviews
      }
    },
    created() {
      this.$store.dispatch('getReviews')
    },
    methods: {
      deleteData(id) {
        confirmMessage(this.$swal)
          .then(res => {
            if (res) {
              getAxios(apiReviews.all, 'DELETE', {id})
                .then(() => {
                  successMessage(this.$swal, this.wordEng.deleted)
                  this.$store.dispatch('getReviews')
                  this.hideModal()
                })
                .catch(err => {
                  handleError(this.$swal, err)
                })
            }
          })
      },
      openModal(review) {
        this.open = true
        this.review = review
      },
      hideModal() {
        this.open = false
        this.review = modelReviews.reset()
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      }
    },
  }
</script>

<style scoped lang="scss">
</style>
