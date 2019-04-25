import axios from 'axios'
import config from "./../config/config";
import {handleError} from "../utils/util"
import swal from 'vue-sweetalert2';

export default {
  state: {
    messageOrders: []
  },
  mutations: {
    SET_MESSAGE_ORDERS(state, messageOrders) {
      state.messageOrders = messageOrders
    }
  },
  getters: {
    getMessageOrders: (state) => {
      return state.messageOrders
    }
  },
  actions: {
    getMessageOrders({commit}) {
      commit('SET_MESSAGE_ORDERS', 'loading')
      axios({
        method: 'GET',
        url: `${config.api_url}/api/messageorder/getAll`,
        headers: {
          Authorization: localStorage.token
        },
      })
        .then(res => {
          if (res.data.data.length === 0) {
            commit('SET_MESSAGE_ORDERS', 'empty')
          } else
            commit('SET_MESSAGE_ORDERS', res.data.data)
        })
        .catch(err => {
          commit('SET_MESSAGE_ORDERS', 'empty')
          handleError(swal, err)
        })
    },
  }
}
