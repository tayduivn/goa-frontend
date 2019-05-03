import {apiProducts, getAxios} from "../utils/endpoints"
import {handleError} from "../utils/util"
import swal from "vue-sweetalert2"

export default {
  state: {
    products: [],
    product: {},
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_PRODUCT(state, product) {
      state.product = product
    },
  },
  getters: {
    getProducts: (state) => {
      return state.products
    },
    getProduct: (state) => {
      return state.product
    },
  },
  actions: {
    getProducts({commit}) {
      return new Promise((resolve) => {
        commit('SET_PRODUCTS', 'loading')
        getAxios(apiProducts.allPublic, 'GET')
          .then(res => {
            if (res.data.data.length === 0) {
              commit('SET_PRODUCTS', 'empty')
            } else {
              commit('SET_PRODUCTS', res.data.data)
              resolve()
            }
          })
          .catch(err => {
            commit('SET_PRODUCTS', 'error')
            handleError(swal, err)
          })
      })
    },
    getProduct({commit}, query) {
      return new Promise((resolve) => {
        commit('SET_PRODUCT', 'loading')
        getAxios(`${apiProducts.allPublic}${query}`, 'GET')
          .then(res => {
            if (res.data.data.length === 0) {
              commit('SET_PRODUCT', 'empty')
            } else {
              commit('SET_PRODUCT', res.data.data)
              resolve()
            }
          })
          .catch(err => {
            commit('SET_PRODUCT', 'error')
            handleError(swal, err)
          })
      })
    },
  }
}
