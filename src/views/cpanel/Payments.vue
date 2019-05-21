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
          <input class="form-control mb-1" id="stripe_secret_token" type="text" v-model="payments.stripe_secret_token"
                 required>
          <small class="saved-text d-flex justify-content-between">
            <label for="prod_stripe"> production token
              <input type="checkbox" name="prod_stripe" id="prod_stripe" :checked="payments.production_stripe === '1'"
                     @change="sendProduction($event, 'stripe')">
            </label>
            <span :class="{transaction: isActiveTextOne}">Saved</span>
          </small>
        </div>
        <div class="form-group">
          <label for="paypal_token" class="mt-3 mb-3">Paypal Access Token</label>
          <input class="form-control mb-1" id="paypal_token" type="text" v-model="payments.paypal_token" required>
          <small class="saved-text d-flex justify-content-between">
            <label for="prod_paypal"> production token
              <input type="checkbox" name="prod_paypal" id="prod_paypal" :checked="payments.production_paypal === '1'"
                     @change="sendProduction($event, 'paypal')">
            </label>
            <span :class="{transaction: isActiveTextTwo}">Saved</span>
          </small>
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
  import {handleError, wordEng} from "../../utils/util"
  import {apiPayments, getAxios} from "../../utils/endpoints"
  import {modelPayment} from "../../services/model/model-payments"
  import {successMessage} from "../../utils/handle-message"

  export default {
    name: "payments",
    metaInfo: {
      title: 'Gardens of America cPanel',
      titleTemplate: (title) => {
        return `${title} | Payments`
      }
    },
    data() {
      return {
        submitForm: false,
        payment: modelPayment.reset(),
        open: false,
        wordEng: wordEng,
        isActiveTextOne: false,
        isActiveTextTwo: false,
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
        this.sendPayment()
      },
      sendProduction(event, method) {
        if (method === 'stripe') {
          this.payments.production_stripe = event.target.checked ? 1 : 0
        } else if (method === 'paypal') {
          this.payments.production_paypal = event.target.checked ? 1 : 0
        }
        this.sendPayment(method)
      },
      sendPayment(method = '') {
        getAxios(apiPayments.all, 'PUT', this.payments)
          .then(() => {
            if (method === 'stripe') {
              this.isActiveTextOne = true
              setTimeout(() => {
                this.isActiveTextOne = false
              }, 1000);
            } else if (method === 'paypal') {
              this.isActiveTextTwo = true
              setTimeout(() => {
                this.isActiveTextTwo = false
              }, 1000);
            } else {
              successMessage(this.$swal, this.wordEng.edited)
              this.$store.dispatch('getPayments')
            }
            this.submitForm = false
          })
          .catch(err => {
            this.submitForm = false
            handleError(this.$swal, err)
          })
      },
    },
  }
</script>

<style scoped lang="scss">
  .image-content {
    width: 200px;
    height: 200px;
  }

  .image-content img {
    width: 100%;
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin-right: 5px;
    margin-bottom: -2px;
    cursor: pointer;

    /* Styling checkbox */
    width: 16px;
    height: 16px;
    background-color: white;
    border: 1px solid #898989;
    border-radius: 2px;
  }

  input[type="checkbox"]:checked {
    background-color: #00CCC3;
    border: none;
  }

  .saved-text {
    span {
      color: #00EE9D;
      font-weight: bold;
      opacity: 0;
      transition: 1s;
    }

    span.transaction {
      opacity: 1;
    }
  }
</style>
