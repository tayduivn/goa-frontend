import {handleError} from "../utils/util"
import swal from "vue-sweetalert2";
import {apiOrders, getAxios} from "../utils/endpoints"

export default {
  state: {
    orders: [],
    cartUserOrders: [],
    cartOrders: [],
    activeOrders: [],
  },
  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders
    },
    SET_CART_USER_ORDERS(state, cartUserOrders) {
      state.cartUserOrders = cartUserOrders
    },
    SET_USER_ORDERS(state, cartOrders) {
      state.cartOrders = cartOrders
    },
    SET_ACTIVE_ORDER(state, activeOrders) {
      state.activeOrders = activeOrders
    },
  },
  getters: {
    getOrders: (state) => {
      return state.orders
    },
    getCartUserOrder: (state) => {
      return state.cartUserOrders
    },
    getUserOrder: (state) => {
      return state.cartOrders
    },
    getActiveOrder: (state) => {
      return state.activeOrders
    },
  },
  actions: {
    getOrders({commit}, status) {
      commit('SET_ORDERS', 'loading')
      getAxios(`${apiOrders.all}?status=${status}`, 'GET')
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_ORDERS', 'empty')
          } else
            commit('SET_ORDERS', res.data.data)
        })
        .catch(err => {
          commit('SET_ORDERS', 'empty')
          handleError(swal, err)
        })
    },
    getCartUserOrder({commit}, order) {
      commit('SET_CART_USER_ORDERS', 'loading')
      getAxios(`${apiOrders.all}?userId=${order.userId}&cartId=${order.cartId}`, 'GET')
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_CART_USER_ORDERS', 'empty')
          } else {
            commit('SET_CART_USER_ORDERS', res.data.data[0])
          }
        })
        .catch(err => {
          commit('SET_CART_USER_ORDERS', 'empty')
          handleError(swal, err)
        })
    },
    getUserOrder({commit}, userId) {
      commit('SET_USER_ORDERS', 'loading')
      getAxios(`${apiOrders.all}?userId=${userId}`, 'GET')
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_USER_ORDERS', 'empty')
          } else
            commit('SET_USER_ORDERS', res.data.data)
        })
        .catch(err => {
          commit('SET_USER_ORDERS', 'empty')
          handleError(swal, err)
        })
    },
    getActiveOrder({commit}, active) {
      console.log(active)
      return new Promise((resolve) => {
        getAxios(apiOrders.all, 'GET')
          .then(res => {
            commit('SET_ACTIVE_ORDER', res.data.data.count)
            resolve(res.data.data.count)
          })
          .catch(err => {
            commit('SET_ACTIVE_ORDER', 0)
            handleError(swal, err)
            resolve(0)
          })
      })
    },
  }
}
