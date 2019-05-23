import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';
import {apiPayments, getAxios} from "../utils/endpoints"

export default {
  state: {
    payments: [],
    paymentsData: [],
  },
  mutations: {
    SET_PAYMENTS(state, payments) {
      state.payments = payments
    },
    SET_PAYMENTS_DATA(state, paymentsData) {
      state.paymentsData = paymentsData
    },
  },
  getters: {
    getPayments: (state) => {
      return state.payments
    },
    getPaymentsData: (state) => {
      return state.paymentsData
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
    getPaymentsData({commit}) {
      getAxios(apiPayments.all, 'GET')
        .then(res => {
          console.log(res.data.data)
          commit('SET_PAYMENTS_DATA', res.data.data[0])
        })
        .catch(err => {
          commit('SET_PAYMENTS_DATA', 'empty')
          handleError(swal, err)
        })
    },
  }
}
