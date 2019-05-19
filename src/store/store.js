import Vue from 'vue'
import Vuex from 'vuex'
import user from './users'
import categories from './categories'
import client from './clients'
import orders from './orders'
import service from './reviews'
import products from './products'
import cart from './cart'
import transaction from './transaction'
import emails from './emails'
import payments from './payments'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    categories,
    cart,
    client,
    transaction,
    orders,
    emails,
    payments,
    products,
    service
  }
})
