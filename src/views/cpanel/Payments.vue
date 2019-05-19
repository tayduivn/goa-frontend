<template>
  <div>

    <div v-if="payments && payments === 'loading'">
      <h3>{{wordEng.loading}}</h3>
    </div>
    <div v-else-if="payments && payments !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">Payment information</h3>
      </div>
      <form @submit.prevent="editData">
        <div class="form-group">
          <label for="stripe_secret_token" class="mt-3 mb-3">Stripe Secret Token</label>
          <input class="form-control" id="stripe_secret_token" type="text" v-model="payments.stripe_secret_token"
                 required>
        </div>
        <div class="form-group">
          <label for="paypal_token" class="mt-3 mb-3">Paypal Access Token</label>
          <input class="form-control" id="paypal_token" type="text" v-model="payments.paypal_token" required>
        </div>
        <div class="text-right">
          <button type="submit" class="btn-sm btn-primary" :disabled="!!submitForm">{{wordEng.save}}</button>
        </div>
      </form>
    </div>
    <div v-else-if="payments && payments === 'empty'">
      <h3>{{wordEng.noData}}</h3>
    </div>
    <div v-else-if="payments && payments === 'error'">
      <h3>{{wordEng.error}}</h3>
    </div>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"
  import {handleError, wordEng} from "../../utils/util"
  import {successMessage} from "../../utils/handle-message"
  import {apiPayments, getAxios} from "../../utils/endpoints"
  import {modelPayment} from "../../services/model/model-payments"

  export default {
    name: "payments",
    metaInfo: {
      title: 'Gardens of America cPanel',
      titleTemplate: (title) => {
        return `${title} | Payments`
      }
    },
    components: {CloseImageSVG},
    data() {
      return {
        submitForm: false,
        payment: modelPayment,
        open: false,
        wordEng: wordEng,
      }
    },
    computed: {
      payments() {
        return this.$store.getters.getPayments
      }
    },
    created() {
      this.$store.dispatch('getPayments')
    },
    methods: {
      editData() {
        getAxios(apiPayments.all, 'PUT', this.payments)
          .then(() => {
            this.submitForm = false
            successMessage(this.$swal, this.wordEng.edited)
            this.$store.dispatch('getPayments')
          })
          .catch(err => {
            this.submitForm = false
            handleError(this.$swal, err)
          })
      },
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
