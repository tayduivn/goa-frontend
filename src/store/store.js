import Vue from 'vue'
import Vuex from 'vuex'
import user from './users'
import categories from './categories'
import client from './clients'
import notifications from './notifications'
import transports from './transports'
import transportService from './transport-service'
import messageOrders from './message-orders'
import orders from './orders'
import service from './services'
import objects from './objects'
import content from './content'
import payment from './payment'
import images from './images'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    categories,
    content,
    client,
    transports,
    payment,
    images,
    transportService,
    messageOrders,
    orders,
    objects,
    notifications,
    service
  }
})
