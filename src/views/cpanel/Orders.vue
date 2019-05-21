<template>
  <div>

    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="state" class="font-weight-bold">{{wordEng.selectState}}</label>
        <select class="form-control width-reset ml-3" name="state" id="state" @change="changeState"
                v-model="stateOrderSelected">
          <option v-for="item in statesOrder" :key="item">{{ item }}</option>
        </select>
      </div>
    </div>
    <hr>
    <div v-if="orders && orders === 'loading'">
      <h3>{{wordEng.loading}}</h3>
    </div>
    <div v-else-if="orders && orders !== 'empty'">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="mb-2">List of orders</h3>
      </div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col" width="10px">Nº</th>
          <th scope="col">User</th>
          <th scope="col">Date</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(order, index) of orders" :key="order.order_id">
          <th scope="col">{{++index}}</th>
          <td>{{order.email}}</td>
          <td>{{formaDate(order.order_inserted_at)}}</td>
          <td>
            <button class="btn btn-sm btn-primary" @click.prevent="openModal(order)">
              {{wordEng.show}}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="orders && orders === 'empty'">
      <h3>{{wordEng.noData}}</h3>
    </div>
    <div v-else-if="orders && orders === 'error'">
      <h3>{{wordEng.error}}</h3>
    </div>

    <vue-modaltor :visible="open" @hide="hideModal">
      <template slot="close-icon">
        <CloseImageSVG/>
      </template>
      <div v-if="order && order === 'loading'">
        <h3>{{wordEng.loading}}</h3>
      </div>
      <div v-else-if="order && order !== 'empty' && order.products && order.products.length">
        <div class="d-flex justify-content-between align-items-center mt-5">
          <h3>Detail of the order Nº {{order.order_id}} - {{order.order_status}}</h3>
        </div>
        <hr>
        <form class="d-flex align-items-center mt-3" @submit.prevent="editStatusOrder">
          <div class="form-group mb-0">
            <label for="status">{{wordEng.selectState}}</label>
            <select class="form-control width-reset ml-3 mr-3" name="status" id="status" required
                    v-model="selectedStatus">
              <option v-if="order.order_status !== 'Pending'" value="Pending">Pending</option>
              <option v-if="order.order_status !== 'Sending'" value="Sending">Sending</option>
              <option v-if="order.order_status !== 'Cancelled'" value="Cancelled">Cancel</option>
            </select>
          </div>
          <button class="btn btn-sm btn-primary" type="submit" :disabled="!!submitForm">Change status</button>
        </form>
        <hr>
        <div class="mt-4">
          <h5>Data of client</h5>
          <table class="table table-custom mt-3 mb-4">
            <tbody>
            <tr>
              <td scope="col" width="250px">Name of user</td>
              <td>{{order.email}}</td>
            </tr>
            <tr>
              <td scope="col" width="250px">Name of client</td>
              <td>{{order.first_name}} {{order.last_name}}</td>
            </tr>
            <tr>
              <td scope="col">Address</td>
              <td>{{order.address}}</td>
            </tr>
            <tr>
              <td scope="col">Phone</td>
              <td>{{order.phone}}</td>
            </tr>
            </tbody>
          </table>
          <h5>Data of product</h5>
          <table class="table table-custom mt-3 mb-4 text-center">
            <tbody>
            <tr>
              <th scope="col" width="10px">Nº</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
            <tr v-for="(item, index) of order.products" :key="item.cart_product_id">
              <td>{{++index}}</td>
              <td>{{item.name}}</td>
              <td>{{item.regular_price}}</td>
              <td>{{item.cart_quantity}}</td>
              <td>{{item.cart_quantity * item.regular_price}}</td>
            </tr>
            <tr>
              <th scope="col" width="10px"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">{{getTotalPrice}}</th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="order && order === 'empty'">
        <h3>{{wordEng.noData}}</h3>
      </div>

      <div v-else-if="order && order === 'error'">
        <h3>{{wordEng.error}}</h3>
      </div>
    </vue-modaltor>

  </div>
</template>

<script>
  import CloseImageSVG from "../../components/CloseImageSVG"
  import {handleError, listState, wordEng} from "../../utils/util"
  import {successMessage} from "../../utils/handle-message"
  import {apiOrders, getAxios} from "../../utils/endpoints"

  export default {
    name: "Orders",
    metaInfo: {
      title: `Gardens of America cPanel`,
      titleTemplate: (title) => {
        return `${title} | Orders`
      }
    },
    components: {CloseImageSVG},
    data() {
      return {
        submitForm: false,
        statesOrder: listState,
        stateOrderSelected: listState[0],
        selectedStatus: '',
        open: false,
        wordEng: wordEng,
      }
    },
    computed: {
      orders() {
        return this.$store.getters.getOrders
      },
      order() {
        return this.$store.getters.getCartUserOrder
      },
      getTotalPrice() {
        let totalPrice = 0
        this.order.products.forEach((value) => {
          totalPrice = (parseInt(value.regular_price) * parseInt(value.cart_quantity)) + totalPrice
        })
        return totalPrice
      },
    },
    created() {
      this.$store.dispatch('getOrders', this.stateOrderSelected)
    },
    methods: {
      changeState() {
        this.$store.dispatch('getOrders', this.stateOrderSelected)
      },
      successRequest(title) {
        successMessage(this.$swal, title)
        this.$store.dispatch('getOrders', this.stateOrderSelected)
        this.hideModal()
      },
      editStatusOrder() {
        this.submitForm = true
        this.order.id = this.order.order_id
        this.order.status = this.selectedStatus
        console.log(JSON.stringify(this.order))
        getAxios(apiOrders.all, 'PUT', this.order)
          .then(() => {
            this.submitForm = false
            if (this.selectedStatus === 'Cancelado') {
              this.successRequest('The order was canceled successfully')
            } else {
              this.successRequest("Updated")
            }
          })
          .catch(err => {
            this.submitForm = false
            handleError(this.$swal, err)
          })
      },
      openModal(order) {
        this.open = true
        console.log(this.stateOrderSelected)
        this.$store.dispatch('getCartUserOrder', `?userId=${order.user_id}&cartId=${order.cart_id}&status=${this.stateOrderSelected}`)
      },
      hideModal() {
        this.$store.commit('SET_CART_USER_ORDERS', [])
        this.open = false
      },
      formaDate(today) {
        return new Date(today).toLocaleDateString("es-ES")
      }
    },
  }
</script>

<style scoped lang="scss">
  .table-transaction img {
    width: 100%;
  }
</style>
