import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';
import {apiTransactions, getAxios} from "../utils/endpoints"

export default {
  state: {
    transaction: {},
  },
  mutations: {
    SET_TRANSACTION(state, transaction) {
      state.transaction = transaction
    },
  },
  getters: {
    getTransaction: (state) => {
      return state.transaction
    },
  },
  actions: {
    getTransaction({commit}, idorder) {
      commit('SET_TRANSACTION', 'loading')
      console.log(idorder)
      getAxios(apiTransactions.all, 'GET')
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_TRANSACTION', 'empty')
          } else
            commit('SET_TRANSACTION', res.data.data)
        })
        .catch(err => {
          commit('SET_TRANSACTION', 'empty')
          handleError(swal, err)
        })
    },
  }
}
