import axios from 'axios'
import config from "./../config/config";
import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';

export default {
  state: {
    payment: {},
  },
  mutations: {
    SET_PAYMENT(state, payment) {
      state.payment = payment
    },
  },
  getters: {
    getPayment: (state) => {
      return state.payment
    },
  },
  actions: {
    getPayment({commit}, idorder) {
      commit('SET_PAYMENT', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/payment/getID/${idorder}`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_PAYMENT', 'empty')
          } else
            commit('SET_PAYMENT', res.data.data)
        })
        .catch(err => {
          commit('SET_PAYMENT', 'empty')
          handleError(swal, err)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
}
