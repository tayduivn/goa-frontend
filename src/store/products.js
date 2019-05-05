import {apiProducts, getAxios} from "../utils/endpoints"
import {handleError} from "../utils/util"
import swal from "vue-sweetalert2"

export default {
  state: {
    products: [],
    productsLimit: [],
    productsNews: [],
    productsFavorites: [],
    product: {},
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_PRODUCT(state, product) {
      state.product = product
    },
    SET_PRODUCTS_LIMIT(state, productsLimit) {
      state.productsLimit = productsLimit
    },
    SET_PRODUCTS_NEWS(state, productsNews) {
      state.productsNews = productsNews
    },
    SET_PRODUCTS_FAVORITES(state, productsFavorites) {
      state.productsFavorites = productsFavorites
    },
  },
  getters: {
    getProducts: (state) => {
      return state.products
    },
    getProductsLimit: (state) => {
      return state.productsLimit
    },
    getProductsNews: (state) => {
      return state.productsNews
    },
    getProductsFavorites: (state) => {
      return state.productsFavorites
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
    getProductsLimit({commit}, query = '') {
      commit('SET_PRODUCTS_LIMIT', 'loading')
      getAxios(`${apiProducts.allPublic}${query}`, 'GET')
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_PRODUCTS_LIMIT', 'empty')
          } else {
            commit('SET_PRODUCTS_LIMIT', res.data.data)
          }
        })
        .catch(err => {
          commit('SET_PRODUCTS_LIMIT', 'error')
          handleError(swal, err)
        })
    },
    getProductsNews({commit}, query = '') {
      commit('SET_PRODUCTS_NEWS', 'loading')
      getAxios(`${apiProducts.allPublic}${query}`, 'GET')
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_PRODUCTS_NEWS', 'empty')
          } else {
            commit('SET_PRODUCTS_NEWS', res.data.data)
          }
        })
        .catch(err => {
          commit('SET_PRODUCTS_NEWS', 'error')
          handleError(swal, err)
        })
    },
    getProductsFavorites({commit}, query = '') {
      commit('SET_PRODUCTS_FAVORITES', 'loading')
      getAxios(`${apiProducts.allPublic}${query}`, 'GET')
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_PRODUCTS_FAVORITES', 'empty')
          } else {
            commit('SET_PRODUCTS_FAVORITES', res.data.data)
          }
        })
        .catch(err => {
          commit('SET_PRODUCTS_FAVORITES', 'error')
          handleError(swal, err)
        })
    },
    getProduct({commit}, query = '') {
      return new Promise((resolve) => {
        commit('SET_PRODUCT', 'loading')
        getAxios(`${apiProducts.allPublic}${query}`, 'GET')
          .then(res => {
            if (res.data.data.length === 0) {
              commit('SET_PRODUCT', 'empty')
            } else {
              commit('SET_PRODUCT', res.data.data[0])
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
