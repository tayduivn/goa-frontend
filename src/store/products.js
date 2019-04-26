import axios from "axios"
import {apiProducts} from "../utils/endpoints"
import {handleError} from "../utils/util"
import swal from "vue-sweetalert2"

export default {
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
  },
  getters: {
    getProducts: (state) => {
      return state.products
    },
  },
  actions: {
    getProducts({commit}) {
      return new Promise((resolve) => {commit('SET_PRODUCTS', 'loading')
        axios({
          method: 'GET',
          url: `${apiProducts.all}`,
          headers: {
            Authorization: localStorage.token
          },
        })
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
  }
}
