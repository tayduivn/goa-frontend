import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';
import {apiPayments, getAxios} from "../utils/endpoints"

export default {
  state: {
    payments: [],
  },
  mutations: {
    SET_PAYMENTS(state, payments) {
      state.payments = payments
    },
  },
  getters: {
    getPayments: (state) => {
      return state.payments
    },
  },
  actions: {
    getPayments({commit}) {
      commit('SET_PAYMENTS', 'loading')
      getAxios(apiPayments.all, 'GET')
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_PAYMENTS', 'empty')
          } else
            commit('SET_PAYMENTS', res.data.data[0])
        })
        .catch(err => {
          commit('SET_PAYMENTS', 'empty')
          handleError(swal, err)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
}
