import {handleError} from "../utils/util"
import swal from "vue-sweetalert2";
import {apiCarts, getAxios} from "../utils/endpoints"

export default {
  state: {
    carts: [],
    cart: [],
  },
  mutations: {
    SET_CARTS(state, carts) {
      state.carts = carts
    },
    SET_CART(state, cart) {
      state.cart = cart
    },
  },
  getters: {
    getCarts: (state) => {
      return state.carts
    },
    getCartsByUser: (state) => {
      return state.cart
    },
  },
  actions: {
    getCarts({commit}) {
      commit('SET_CARTS', 'loading')
      getAxios(`${apiCarts.all}?showByUser=true`, 'GET')
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_CARTS', 'empty')
          } else
            commit('SET_CARTS', res.data.data)
        })
        .catch(err => {
          commit('SET_CARTS', 'empty')
          handleError(swal, err)
        })
    },
    getCartsByUser({commit}, query = '') {
      return new Promise((resolve, reject) => {
        commit('SET_CART', 'loading')
        getAxios(`${apiCarts.all}${query}`, 'GET')
          .then(res => {
            if (res.data.data.length === 0) {
              commit('SET_CART', 'empty')
              resolve(res.data.data)
            } else {
              commit('SET_CART', res.data.data[0])
              resolve(res.data.data[0])
            }
          })
          .catch(err => {
            commit('SET_CART', 'empty')
            handleError(swal, err)
            reject(err)
          })
      })
    },
  }
}
