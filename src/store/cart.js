import {handleError} from "../utils/util"
import swal from "vue-sweetalert2";
import {apiCarts, getAxios} from "../utils/endpoints"

export default {
  state: {
    carts: [],
  },
  mutations: {
    SET_CARTS(state, carts) {
      state.carts = carts
    },
  },
  getters: {
    getCarts: (state) => {
      return state.carts
    },
  },
  actions: {
    getCarts({commit}) {
      commit('SET_CARTS', 'loading')
      getAxios(apiCarts.all, 'GET')
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
  }
}
