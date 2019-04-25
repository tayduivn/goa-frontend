import axios from 'axios'
import config from "./../config/config";
import {handleError} from "../utils/util"
import swal from "vue-sweetalert2";

export default {
  state: {
    orders: [],
    statusOrders: [],
    activeOrders: [],
  },
  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders
    },
    SET_STATUS_ORDER(state, statusOrders) {
      state.statusOrders = statusOrders
    },
    SET_ACTIVE_ORDER(state, activeOrders) {
      state.activeOrders = activeOrders
    },
  },
  getters: {
    getOrders: (state) => {
      return state.orders
    },
    getStatusOrder: (state) => {
      return state.statusOrders
    },
    getActiveOrder: (state) => {
      return state.activeOrders
    },
  },
  actions: {
    getOrders({commit}) {
      commit('SET_ORDERS', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/order/getAll`,
        headers: {
          Authorization: localStorage.token
        },
      })
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
    getStatusOrder({commit}, status) {
      commit('SET_STATUS_ORDER', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/order/getStatus/${status}`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_STATUS_ORDER', 'empty')
          } else
            commit('SET_STATUS_ORDER', res.data.data)
        })
        .catch(err => {
          commit('SET_STATUS_ORDER', 'empty')
          handleError(swal, err)
        })
    },
    getActiveOrder({commit}, active) {
      return new Promise((resolve) => {
        axios({
          method: 'GET',
          url: `${config.api_url}/api/order/getActive/${active}`,
          headers: {
            Authorization: localStorage.token
          },
        })
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
